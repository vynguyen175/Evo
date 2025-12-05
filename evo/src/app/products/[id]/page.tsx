"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/ProductGrid';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { use } from 'react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get related products from the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productImages = product.images || [product.image];
  const currentImage = productImages[selectedImageIndex];

  return (
    <Container>
      {/* Breadcrumb */}
      <nav className="py-6 border-b border-neutral-200">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li>
            <Link href="/products" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              Shop
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li className="text-neutral-900">{product.name}</li>
        </ol>
      </nav>

      {/* Product Detail */}
      <div className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              {!imageError ? (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                  <span className="text-neutral-400">Image unavailable</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-24 overflow-hidden transition-opacity ${
                      selectedImageIndex === index
                        ? 'ring-1 ring-neutral-900'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <div className="sticky top-32">
              <p className="text-xs tracking-widest uppercase text-neutral-500 mb-3">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-neutral-900 mb-8">
                {formatPrice(product.price)}
              </p>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full"
                  size="lg"
                >
                  {isAdding ? 'Added to Cart ✓' : 'Add to Cart'}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  Free shipping on orders over $200
                </p>
              </div>

              {/* Product Details */}
              <div className="mt-12 space-y-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-4 border-b border-neutral-200">
                    <span className="text-sm tracking-wider uppercase">Details</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="py-4 text-sm text-neutral-600 leading-relaxed">
                    <ul className="space-y-2">
                      <li>• Premium quality materials</li>
                      <li>• Designed for lasting wear</li>
                      <li>• Relaxed, modern fit</li>
                      <li>• Dry clean recommended</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-4 border-b border-neutral-200">
                    <span className="text-sm tracking-wider uppercase">Shipping & Returns</span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="py-4 text-sm text-neutral-600 leading-relaxed">
                    <p className="mb-3">Free standard shipping on orders over $200.</p>
                    <p>Returns accepted within 30 days of delivery. Items must be unworn with original tags attached.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200">
          <ProductGrid
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Related Products"
          />
        </section>
      )}
    </Container>
  );
}
