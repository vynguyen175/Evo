"use client";

import { useWishlist } from '@/context/WishlistContext';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <Container>
      <div className="pt-32 md:pt-40 pb-16">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
                My Wishlist
              </h1>
              <p className="text-neutral-600">
                {wishlist.length === 0
                  ? 'Your wishlist is empty'
                  : `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved`}
              </p>
            </div>
            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="px-6 py-2.5 text-sm tracking-wider uppercase border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                Clear Wishlist
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-20 h-20 mx-auto text-neutral-300 mb-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-neutral-600 mb-8">
              Save items you love by clicking the heart icon on product cards
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3.5 bg-neutral-900 text-white text-sm tracking-wider uppercase hover:bg-neutral-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {wishlist.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
