"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { formatPrice, getDiscountPercentage } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentImage = product.colors[selectedColorIndex]?.image || product.thumbnail;
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);

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
    setSelectedColorIndex(index);
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
