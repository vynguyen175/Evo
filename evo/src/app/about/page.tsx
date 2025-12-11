import Container from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Container>
      <div className="py-24 md:py-32 text-center border-b border-neutral-200">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6">
          About ÉVO
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Redefining modern luxury through timeless design and conscious craftsmanship.
        </p>
      </div>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-5 block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">
              Built on the belief that less is more
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Founded with a vision to create clothing that transcends fleeting trends, 
                ÉVO emerged from a simple philosophy: quality over quantity, design over 
                decoration, and longevity over the disposable.
              </p>
              <p>
                Each piece in our collection is thoughtfully designed and meticulously crafted 
                to become a lasting part of your wardrobe. We believe in clothes that don't 
                just look good—they feel right, fit perfectly, and stand the test of time.
              </p>
              <p>
                From our sustainable sourcing practices to our commitment to ethical production, 
                every decision we make reflects our dedication to creating fashion that matters.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="About ÉVO"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
            Our Values
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto">
            The principles that guide everything we create
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-neutral-900 mb-3">Quality First</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We source the finest materials and partner with skilled artisans who share 
              our commitment to exceptional craftsmanship.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-neutral-900 mb-3">Sustainability</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              From eco-conscious fabrics to ethical production, we're dedicated to 
              minimizing our environmental footprint at every step.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-neutral-900 mb-3">Timeless Design</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We create pieces that transcend seasons and trends, designed to be worn 
              and loved for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">
          Explore Our Collection
        </h2>
        <p className="text-neutral-600 mb-10 max-w-xl mx-auto">
          Discover pieces designed to elevate your everyday—from refined essentials 
          to statement styles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products/women"
            className="btn-primary inline-flex items-center justify-center cursor-pointer"
          >
            Shop Women
          </Link>
          <Link
            href="/products/men"
            className="btn-secondary inline-flex items-center justify-center cursor-pointer"
          >
            Shop Men
          </Link>
        </div>
      </section>
    </Container>
  );
}
