"use client";

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import type { CartItem } from '@/types/product';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Generate unique key for cart item based on product, color, and size
  const getCartItemKey = (item: CartItem) => {
    return `${item.product.id}-${item.selectedColor?.name || 'default'}-${item.selectedSize?.name || 'default'}`;
  };

  const handleImageError = (itemKey: string) => {
    setImageErrors(prev => ({ ...prev, [itemKey]: true }));
  };

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-24 md:py-32 text-center">
          <div className="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-16 h-16 mx-auto text-neutral-300 mb-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Discover our curated collection of timeless essentials.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center justify-center cursor-pointer">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-24 md:py-32 border-b border-neutral-200">
        <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 text-center">
          Shopping Cart
        </h1>
        <p className="text-center text-neutral-500 mt-2">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => {
                const { product, quantity, selectedColor, selectedSize } = item;
                const itemKey = getCartItemKey(item);
                
                // Get the image for the selected color if available, fallback to first image or thumbnail
                const displayImage = selectedColor?.image || product.images[0] || product.thumbnail;
                
                // Get the color hex for display
                const colorHex = selectedColor?.hex || null;

                return (
                  <div
                    key={itemKey}
                    className="flex gap-6 py-6 border-b border-neutral-200"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${product.id}`}
                      className="relative w-24 h-32 md:w-32 md:h-40 flex-shrink-0 overflow-hidden bg-neutral-100 cursor-pointer"
                    >
                      {!imageErrors[itemKey] ? (
                        <Image
                          src={displayImage}
                          alt={product.name}
                          fill
                          className="object-cover hover:opacity-80 transition-opacity"
                          sizes="128px"
                          onError={() => handleImageError(itemKey)}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-neutral-400 text-xs">No image</span>
                        </div>
                      )}
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-xs tracking-widest uppercase text-neutral-500 mb-1">
                            {product.category}
                          </p>
                          <Link
                            href={`/products/${product.id}`}
                            className="font-serif text-lg text-neutral-900 hover:opacity-70 transition-opacity cursor-pointer"
                          >
                            {product.name}
                          </Link>
                          
                          {/* Color & Size Selection */}
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                            {selectedColor && (
                              <div className="flex items-center gap-1.5">
                                {colorHex && (
                                  <span 
                                    className="w-3 h-3 rounded-full border border-neutral-300"
                                    style={{ backgroundColor: colorHex }}
                                  />
                                )}
                                <span>{selectedColor.name}</span>
                              </div>
                            )}
                            {selectedColor && selectedSize && (
                              <span className="text-neutral-300">|</span>
                            )}
                            {selectedSize && (
                              <span>Size: {selectedSize.name}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-neutral-900 font-medium whitespace-nowrap">
                            {formatPrice(product.price * quantity)}
                          </p>
                          {quantity > 1 && (
                            <p className="text-xs text-neutral-500 mt-1">
                              {formatPrice(product.price)} each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            onClick={() => updateQuantity(product.id, selectedColor?.name || '', selectedSize?.name || '', quantity - 1)}
                            className="px-3 py-2 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, selectedColor?.name || '', selectedSize?.name || '', quantity + 1)}
                            className="px-3 py-2 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id, selectedColor?.name, selectedSize?.name)}
                          className="text-sm text-neutral-500 hover:text-neutral-900 underline transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear Cart */}
            <div className="mt-6">
              <button
                onClick={clearCart}
                className="text-sm text-neutral-500 hover:text-neutral-900 underline transition-colors cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-100 p-8 sticky top-32">
              <h2 className="font-serif text-xl text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-neutral-900">
                    {totalPrice >= 200 ? 'Free' : formatPrice(15)}
                  </span>
                </div>
                {totalPrice < 200 && (
                  <p className="text-xs text-neutral-500">
                    Add {formatPrice(200 - totalPrice)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-neutral-300 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-900 font-medium">Total</span>
                  <span className="text-neutral-900 font-medium">
                    {formatPrice(totalPrice >= 200 ? totalPrice : totalPrice + 15)}
                  </span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <p className="mt-4 text-xs text-center text-neutral-500">
                Taxes calculated at checkout
              </p>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              >
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
