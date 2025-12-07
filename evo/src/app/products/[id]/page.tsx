"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/ProductGrid';
import { Product, ProductColor, ProductSize } from '@/types/product';
import { fetchProductById, fetchProducts, formatPrice, getDiscountPercentage } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { use } from 'react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [imageError, setImageError] = useState(false);

  // Fetch product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetchProductById(resolvedParams.id);
        if (response.success && response.data) {
          setProduct(response.data);
          setSelectedColor(response.data.colors[0]);
          setSelectedSize(response.data.sizes.find(s => s.inStock) || response.data.sizes[0]);
          
          // Fetch related products
          const relatedResponse = await fetchProducts({
            category: response.data.category,
            limit: 4
          });
          if (relatedResponse.success) {
            setRelatedProducts(
              relatedResponse.data.filter(p => p.id !== response.data!.id).slice(0, 4)
            );
          }
        } else {
          setNotFoundState(true);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        setNotFoundState(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [resolvedParams.id]);

  if (notFoundState) {
    notFound();
  }

  if (isLoading || !product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin"></div>
          <p className="text-neutral-500 mt-4">Loading product...</p>
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    setIsAdding(true);
    addToCart(product, selectedColor, selectedSize);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    setImageError(false);
    // Update image to color-specific image if available
    const colorIndex = product.colors.findIndex(c => c.name === color.name);
    if (colorIndex !== -1) {
      setSelectedImageIndex(colorIndex);
    }
  };

  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const currentImage = selectedColor?.image || product.images[selectedImageIndex] || product.thumbnail;

  return (
    <Container>
      {/* Breadcrumb */}
      <nav className="py-6 border-b border-neutral-200">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
              Home
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li>
            <Link href="/products" className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
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
              {/* Sale Badge */}
              {discount && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1.5 text-xs tracking-wider uppercase">
                  {discount}% Off
                </div>
              )}
              
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
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setImageError(false);
                    }}
                    className={`relative w-20 h-24 overflow-hidden transition-opacity cursor-pointer ${
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
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <p className="text-xl text-neutral-900">
                  {formatPrice(product.price)}
                </p>
                {product.compareAtPrice && (
                  <p className="text-lg text-neutral-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                )}
                {discount && (
                  <span className="text-sm text-red-600 font-medium">
                    Save {discount}%
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-green-600">
                      {product.quantity > 10 
                        ? `In Stock (${product.quantity} available)` 
                        : `Only ${product.quantity} left in stock`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-sm text-red-500">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-neutral-900 mb-3">
                    Color: <span className="text-neutral-600">{selectedColor?.name}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorSelect(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor?.name === color.name
                            ? 'border-neutral-900 scale-110'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm text-neutral-900 mb-3">
                    Size: <span className="text-neutral-600">{selectedSize?.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => size.inStock && setSelectedSize(size)}
                        disabled={!size.inStock}
                        className={`px-4 py-2 text-sm border transition-all cursor-pointer ${
                          selectedSize?.name === size.name
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : size.inStock
                            ? 'border-neutral-300 hover:border-neutral-900'
                            : 'border-neutral-200 text-neutral-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding || !product.inStock || !selectedSize?.inStock}
                  className="w-full"
                  size="lg"
                >
                  {!product.inStock 
                    ? 'Out of Stock' 
                    : isAdding 
                    ? 'Added to Cart ✓' 
                    : 'Add to Cart'}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  Free shipping on orders over $200
                </p>
              </div>

              {/* Product Details */}
              <div className="mt-12 space-y-6">
                {product.details && product.details.length > 0 && (
                  <details className="group" open>
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
                        {product.details.map((detail, index) => (
                          <li key={index}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )}

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
