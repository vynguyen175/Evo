"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';
import { formatPrice, getDiscountPercentage } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentImage = product.colors[selectedColorIndex]?.image || product.thumbnail;
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const inWishlist = isInWishlist(product.id || product._id || '');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    // Add with first available size
    const availableSize = product.sizes.find(s => s.inStock) || product.sizes[0];
    addToCart(product, product.colors[selectedColorIndex], availableSize);
    
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleColorClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id || product._id || '');
    } else {
      addToWishlist(product);
    }
  };setSelectedColorIndex(index);
    setImageError(false);
  };

  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-white mb-5">
          {!imageError ? (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
              <span className="text-neutral-400 text-sm">Image unavailable</span>
            </div>
          )}
          
          {/* Sale Badge */}
          {discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-[10px] tracking-wider uppercase">

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-300 cursor-pointer group/heart"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={inWishlist ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 transition-colors ${
                inWishlist ? 'text-red-500' : 'text-neutral-900 group-hover/heart:text-red-500'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
              {discount}% Off
            </div>
          )}

          {/* New Arrival Badge */}
          {product.newArrival && !discount && (
            <div className="absolute top-3 left-3 bg-neutral-900 text-white px-2 py-1 text-[10px] tracking-wider uppercase">
              New
            </div>
          )}
          
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`absolute bottom-5 left-5 right-5 py-3.5 text-center text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
              isAdding
                ? 'bg-neutral-900 text-white'
                : product.inStock
                ? 'bg-white/95 text-neutral-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-neutral-900 hover:text-white'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {isAdding ? 'Added ✓' : product.inStock ? 'Quick Add' : 'Out of Stock'}
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            {product.category}
          </p>
          <h3 className="font-serif text-base md:text-lg text-neutral-900 group-hover:opacity-70 transition-opacity leading-snug">
            {product.name}
          </h3>
          
          {/* Price & Stock */}
          <div className="flex items-center gap-2 pt-0.5">
            <p className="text-sm text-neutral-700">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="text-sm text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
          
          {/* Rating */}
          {product.averageRating && product.averageRating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < Math.floor(product.averageRating || 0) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-neutral-500">
                {product.averageRating.toFixed(1)} ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <span className="text-xs text-green-600">
                {product.quantity > 10 ? 'In Stock' : `Only ${product.quantity} left`}
              </span>
            ) : (
              <span className="text-xs text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 pt-2">
              {product.colors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={(e) => handleColorClick(e, index)}
                  className={`w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColorIndex === index
                      ? 'border-neutral-900 scale-110'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
