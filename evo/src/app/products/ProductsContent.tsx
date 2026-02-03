"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import ProductGrid from '@/components/ProductGrid';
import { Product, Category } from '@/types/product';
import { fetchProducts, fetchCategories } from '@/lib/api';

interface FilterState {
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

export type ProductsContentProps = {
  title?: string;
  description?: string;
  forcedGender?: 'Men' | 'Women';
  newArrivals?: boolean;
  forcedCategory?: string;
};

export default function ProductsContent({
  title = 'Shop All',
  description = 'Discover our collection of timeless essentials, designed with quality and elegance in mind.',
  forcedGender,
  newArrivals = false,
  forcedCategory,
}: ProductsContentProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  const genderFromUrl = searchParams.get('gender');

  const effectiveGender = useMemo(() => forcedGender || genderFromUrl || undefined, [forcedGender, genderFromUrl]);
  const effectiveCategory = useMemo(() => forcedCategory || categoryFromUrl || 'All', [forcedCategory, categoryFromUrl]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>(effectiveCategory);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique sizes and colors from all products
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    allProducts.forEach(product => {
      product.sizes.forEach(size => sizes.add(size.name));
    });
    return Array.from(sizes).sort();
  }, [allProducts]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    allProducts.forEach(product => {
      product.colors.forEach(color => colors.add(color.name));
    });
    return Array.from(colors).sort();
  }, [allProducts]);

  // Update selected category when effectiveCategory changes
  useEffect(() => {
    setSelectedCategory(effectiveCategory);
  }, [effectiveCategory]);

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchCategories();
        if (response.success && response.data) {
          let categoryNames = response.data.map((c: Category) => c.name);
          
          // Filter out "Dresses" for men's page
          if (effectiveGender === 'Men') {
            categoryNames = categoryNames.filter((name: string) => name !== 'Dresses');
          }
          
          const uniqueCategories = [...new Set(['All', ...categoryNames.filter((name: string) => name !== 'All')])];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }
    loadCategories();
  }, [effectiveGender]);

  // Fetch products when filters change
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const response = await fetchProducts({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchFromUrl || undefined,
          sort: sortBy,
          limit: 100,
          gender: effectiveGender,
          newArrivals: newArrivals,
        });

        if (response.success) {
          setAllProducts(response.data);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [selectedCategory, sortBy, searchFromUrl, effectiveGender, newArrivals]);

  // Apply client-side filters
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by size
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size.name))
      );
    }

    // Filter by color
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color.name))
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    setProducts(filtered);
    setTotal(filtered.length);
  }, [allProducts, filters]);

  const toggleFilter = (type: 'sizes' | 'colors', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
    });
  };

  const heroTitle = searchFromUrl ? `Search: "${searchFromUrl}"` : title;
  const heroDescription = searchFromUrl
    ? `Found ${total} ${total === 1 ? 'result' : 'results'}`
    : description;

  return (
    <Container>
      {/* Page Header */}
      <div className="pt-44 md:pt-52 pb-12 md:pb-16 border-b border-neutral-200">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 text-center">
            {heroTitle}
          </h1>
          <p className="text-neutral-600 mt-6 md:mt-8 text-center w-full">
            {heroDescription}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="pt-20 md:pt-24 pb-6 md:pb-8 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 flex-1">
            {categories.map((category, index) => (
              <button
                key={`category-${index}-${category}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort and Filter Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 text-sm tracking-wider uppercase bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="flex items-center gap-3">
              <label className="text-sm text-neutral-600 whitespace-nowrap">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-neutral-900 focus:outline-none py-2 px-2 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestSeller">Best Sellers</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="py-6 border-b border-neutral-200 bg-neutral-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Size Filter */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleFilter('sizes', size)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      filters.sizes.includes(size)
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase mb-4">Color</h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleFilter('colors', color)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      filters.colors.includes(color)
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase mb-4">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                    }))
                  }
                  className="w-full accent-neutral-900"
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    min="0"
                    max={filters.priceRange[1]}
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      setFilters(prev => ({
                        ...prev,
                        priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]],
                      }))
                    }
                    className="w-full px-3 py-2 text-sm border border-neutral-300 focus:border-neutral-900 focus:outline-none"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    min={filters.priceRange[0]}
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000],
                      }))
                    }
                    className="w-full px-3 py-2 text-sm border border-neutral-300 focus:border-neutral-900 focus:outline-none"
                    placeholder="Max"
                  />
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-neutral-600 hover:text-neutral-900 underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="py-4">
        <p className="text-sm text-neutral-500">
          {isLoading ? 'Loading...' : `${total} ${total === 1 ? 'product' : 'products'}`}
        </p>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin"></div>
          <p className="text-neutral-500 mt-4">Loading products...</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </Container>
  );
}
