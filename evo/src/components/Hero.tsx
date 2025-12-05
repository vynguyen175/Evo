import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[650px] max-h-[950px] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative h-full flex items-center">
        <div className="max-w-xl pl-2 md:pl-4">
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-neutral-600 mb-5 md:mb-6">
            New Collection
          </span>
          <h1 className="font-serif text-[2.75rem] md:text-6xl lg:text-7xl text-neutral-900 leading-[1.1] mb-7 md:mb-8">
            Timeless
            <br />
            Elegance
          </h1>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-md tracking-wide">
            Discover our curated collection of elevated essentials. Designed for 
            those who appreciate refined simplicity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center cursor-pointer"
            >
              Shop Collection
            </Link>
            <Link
              href="/products?category=new"
              className="btn-secondary inline-flex items-center justify-center cursor-pointer"
            >
              View New Arrivals
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-5 h-5 text-neutral-400"
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
