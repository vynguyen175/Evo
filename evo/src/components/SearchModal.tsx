"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Search products via API with debouncing
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
      const data = await res.json();
      // API returns { success, data, pagination }
      setResults(data.data || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim() === '') {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      searchProducts(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchProducts]);

  const handleResultClick = () => {
    setQuery('');
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in cursor-pointer"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-xl animate-slide-down">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Input */}
          <div className="flex items-center h-20 border-b border-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-neutral-400 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 text-lg bg-transparent border-none outline-none placeholder:text-neutral-400"
            />
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Results */}
          <div className="py-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="text-center py-12">
                <p className="text-neutral-500 text-sm">
                  Start typing to search products
                </p>
                <div className="mt-6">
                  <p className="text-xs tracking-wider uppercase text-neutral-400 mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Blazer', 'Dress', 'Cashmere', 'Silk'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 text-sm border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : isSearching ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neutral-900 mx-auto mb-4" />
                <p className="text-neutral-500 text-sm">
                  Searching...
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-900 font-serif text-xl mb-2">
                  No results found
                </p>
                <p className="text-neutral-500 text-sm">
                  Try searching for something else
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs tracking-wider uppercase text-neutral-500 mb-4">
                  {results.length} {results.length === 1 ? 'Result' : 'Results'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={handleResultClick}
                      className="flex gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors group cursor-pointer"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 bg-neutral-100 overflow-hidden">
                        <Image
                          src={product.thumbnail || product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <p className="text-xs text-neutral-500 uppercase tracking-wider">
                          {product.category}
                        </p>
                        <p className="font-serif text-neutral-900 truncate group-hover:text-neutral-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm text-neutral-600 mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {results.length >= 6 && (
                  <div className="text-center mt-6">
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={handleResultClick}
                      className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      View all results
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
