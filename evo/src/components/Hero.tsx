import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Elegant fashion model in neutral tones"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative h-full flex items-center">
        <div className="max-w-xl">
          <span className="inline-block text-xs tracking-widest uppercase text-neutral-600 mb-4">
            New Collection
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-tight mb-6">
            Timeless
            <br />
            Elegance
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
            Discover our curated collection of elevated essentials. Designed for 
            those who appreciate refined simplicity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center"
            >
              Shop Collection
            </Link>
            <Link
              href="/products?category=new"
              className="btn-secondary inline-flex items-center justify-center"
            >
              View New Arrivals
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-6 h-6 text-neutral-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </section>
  );
}
