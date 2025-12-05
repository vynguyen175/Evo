"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-5">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
              <span className="text-neutral-400 text-sm">Image unavailable</span>
            </div>
          )}
          
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-5 left-5 right-5 py-3.5 text-center text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
              isAdding
                ? 'bg-neutral-900 text-white'
                : 'bg-white/95 text-neutral-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            {isAdding ? 'Added ✓' : 'Quick Add'}
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            {product.category}
          </p>
          <h3 className="font-serif text-base md:text-lg text-neutral-900 group-hover:opacity-70 transition-opacity leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-700 pt-0.5">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
