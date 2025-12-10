"use client";

import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products?limit=8');
        const data = await res.json();
        // API returns { success, data, pagination }
        setFeaturedProducts(data.data || []);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <>
      {/* Hero Section - Full screen */}
      <div className="-mt-20 md:-mt-24">
        <Hero />
      </div>

      {/* Featured Products */}
      <Container>
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900" />
          </div>
        ) : (
          <ProductGrid
            products={featuredProducts}
            title="Curated Essentials"
            subtitle="Featured Collection"
          />
        )}

        {/* View All Link */}
        <div className="text-center pb-20 md:pb-24">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors group cursor-pointer"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </Container>

      {/* Decorative Divider */}
      <div className="bg-neutral-50 py-20 md:py-32">
        <div className="flex items-center justify-center">
          <div className="h-px flex-1 max-w-xs bg-neutral-300"></div>
          <div className="mx-6 h-3 w-3 rounded-full bg-neutral-400"></div>
          <div className="h-px flex-1 max-w-xs bg-neutral-300"></div>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className="bg-neutral-100 py-20 md:py-32 lg:py-40">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-28 items-center">
            <div className="order-2 md:order-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-5 block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-neutral-900 mb-7 leading-[1.15]">
                Effortless Style,
                <br />
                Timeless Design
              </h2>
              <p className="text-neutral-600 leading-[1.8] mb-5 text-[15px]">
                At ÉVO, we believe in the power of simplicity. Our collections are 
                thoughtfully designed with a focus on quality materials, impeccable 
                craftsmanship, and enduring style.
              </p>
              <p className="text-neutral-600 leading-[1.8] mb-10 text-[15px]">
                Each piece is created to become a lasting part of your wardrobe—
                versatile enough for everyday moments, refined enough for special 
                occasions.
              </p>
              <Link
                href="/products"
                className="btn-secondary inline-flex items-center justify-center cursor-pointer"
              >
                Explore Collection
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                  alt="Brand story image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Decorative Divider */}
      <div className="bg-neutral-50 py-20 md:py-32">
        <div className="flex items-center justify-center">
          <div className="h-px flex-1 max-w-xs bg-neutral-300"></div>
          <div className="mx-6 h-3 w-3 rounded-full bg-neutral-400"></div>
          <div className="h-px flex-1 max-w-xs bg-neutral-300"></div>
        </div>
      </div>

      {/* Shop By Gender Section */}
      <section className="py-20 md:py-32 lg:py-40">
        <Container>
          <div className="space-y-16 md:space-y-20 lg:space-y-24">
            {/* For Her */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-8 md:p-10 lg:p-12 shadow-sm">
              {/* Image Side - Right on desktop */}
              <div className="relative h-[450px] md:h-[550px] order-2 md:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80"
                  alt="For Her collection"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Text Side - Left on desktop */}
              <div className="flex flex-col justify-center px-6 md:px-10 lg:px-12 py-16 md:py-0 order-1 md:order-2">
                <Link
                  href="/products/women"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase bg-white text-neutral-900 px-6 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-300 w-fit group cursor-pointer font-medium"
                >
                  View All Women Styles
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-6 md:py-8">
              <div className="h-px flex-1 max-w-xs bg-neutral-300"></div>
              <div className="mx-6 h-3 w-3 rounded-full bg-neutral-400"></div>
              <div className="h-px flex-1 max-w-xs bg-neutral-300"></div>
            </div>

            {/* For Him */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-8 md:p-10 lg:p-12 shadow-sm">
              {/* Text Side - Left */}
              <div className="flex flex-col justify-center px-6 md:px-10 lg:px-12 py-16 md:py-0">
                <Link
                  href="/products/men"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase bg-white text-neutral-900 px-6 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-300 w-fit group cursor-pointer font-medium"
                >
                  View All Men Styles
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              {/* Image Side - Right */}
              <div className="relative h-[450px] md:h-[550px]">
                <Image
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                  alt="For Him collection"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <Container>
        <section className="py-24 md:py-36 lg:py-40">
          <div className="text-center mb-14 md:mb-20">
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-4 block">
              Browse By
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-neutral-900">
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {/* Category 1 */}
            <Link href="/products/category/tops" className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80"
                alt="Tops category"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-serif text-2xl md:text-3xl tracking-wide">
                  Tops
                </span>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/products/category/dresses" className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"
                alt="Dresses category"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-serif text-2xl md:text-3xl tracking-wide">
                  Dresses
                </span>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/products/category/outerwear" className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"
                alt="Outerwear category"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-serif text-2xl md:text-3xl tracking-wide">
                  Outerwear
                </span>
              </div>
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
