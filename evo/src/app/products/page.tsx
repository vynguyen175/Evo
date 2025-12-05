"use client";

import { useState, useMemo } from 'react';
import Container from '@/components/ui/Container';
import ProductGrid from '@/components/ProductGrid';
import { products, categories } from '@/data/products';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? [...products] 
      : products.filter(p => p.category === selectedCategory);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <Container>
      {/* Page Header */}
      <div className="py-12 md:py-16 text-center border-b border-neutral-200">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
          Shop All
        </h1>
        <p className="text-neutral-600 max-w-xl mx-auto">
          Discover our collection of timeless essentials, designed with quality 
          and elegance in mind.
        </p>
      </div>

      {/* Filters */}
      <div className="py-6 md:py-8 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
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
          <div className="flex items-center gap-3">
            <label className="text-sm text-neutral-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-neutral-900 focus:outline-none py-1 px-2 cursor-pointer"
            >
              <option value="featured">Featured</option>
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
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <Container>
        <div className="py-12 md:py-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
            Shop All
          </h1>
          <p className="text-neutral-600">Loading products...</p>
        </div>
      </Container>
    }>
      <ProductsContent />
    </Suspense>
  );
}
