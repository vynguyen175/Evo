"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import ProductGrid from '@/components/ProductGrid';
import { Product, Category } from '@/types/product';
import { fetchProducts, fetchCategories } from '@/lib/api';

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
          const categoryNames = response.data.map((c: Category) => c.name);
          const uniqueCategories = [...new Set(['All', ...categoryNames.filter((name: string) => name !== 'All')])];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }
    loadCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const response = await fetchProducts({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchFromUrl || undefined,
          sort: sortBy,
          limit: 50,
          gender: effectiveGender,
          newArrivals: newArrivals,
        });

        if (response.success) {
          setProducts(response.data);
          setTotal(response.pagination.total);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [selectedCategory, sortBy, searchFromUrl, effectiveGender, newArrivals]);

  const heroTitle = searchFromUrl ? `Search: "${searchFromUrl}"` : title;
  const heroDescription = searchFromUrl
    ? `Found ${total} ${total === 1 ? 'result' : 'results'}`
    : description;

  return (
    <Container>
      {/* Page Header */}
      <div className="pt-32 md:pt-40 pb-12 md:pb-16 border-b border-neutral-200">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4 text-center">
            {heroTitle}
          </h1>
          <p className="text-neutral-600 text-center max-w-2xl px-4">
            {heroDescription}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="py-6 md:py-8 border-b border-neutral-200">
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

          {/* Sort */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <label className="text-sm text-neutral-600 whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-neutral-900 focus:outline-none py-2 px-2 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

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
