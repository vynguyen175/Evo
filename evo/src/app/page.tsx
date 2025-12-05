import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Container from '@/components/ui/Container';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Get first 8 products for featured section
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      {/* Hero Section - Full screen */}
      <div className="-mt-16 md:-mt-20">
        <Hero />
      </div>

      {/* Featured Products */}
      <Container>
        <ProductGrid
          products={featuredProducts}
          title="Curated Essentials"
          subtitle="Featured Collection"
        />

        {/* View All Link */}
        <div className="text-center pb-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-neutral-600 hover:text-neutral-900 transition-colors group"
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

      {/* Brand Story Section */}
      <section className="bg-neutral-100 py-20 md:py-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <span className="text-xs tracking-widest uppercase text-neutral-500 mb-4 block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6 leading-tight">
                Effortless Style,
                <br />
                Timeless Design
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                At ÉVO, we believe in the power of simplicity. Our collections are 
                thoughtfully designed with a focus on quality materials, impeccable 
                craftsmanship, and enduring style.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Each piece is created to become a lasting part of your wardrobe—
                versatile enough for everyday moments, refined enough for special 
                occasions.
              </p>
              <Link
                href="/products"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Explore Collection
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1485968579169-e6f79cf4b049?w=800&q=80"
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

      {/* Categories Section */}
      <Container>
        <section className="py-20 md:py-32">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs tracking-widest uppercase text-neutral-500 mb-3 block">
              Browse By
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900">
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1 */}
            <Link href="/products?category=Tops" className="group relative aspect-[3/4] overflow-hidden">
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
            <Link href="/products?category=Dresses" className="group relative aspect-[3/4] overflow-hidden">
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
            <Link href="/products?category=Jackets%20%26%20Coats" className="group relative aspect-[3/4] overflow-hidden">
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
