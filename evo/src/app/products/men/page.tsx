import { Suspense } from 'react';
import ProductsContent from '../ProductsContent';
import Container from '@/components/ui/Container';

export default function MenProductsPage() {
  return (
    <>
      <Suspense
        fallback={
          <Container>
            <div className="py-12 md:py-16 text-center">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
                Men
              </h1>
              <p className="text-neutral-600">Loading men's products...</p>
            </div>
          </Container>
        }
      >
        <ProductsContent
          title="Men"
          description="Tailored essentials and everyday staples curated for him. Quality pieces designed for the modern man who values simplicity and style."
          forcedGender="Men"
        />
      </Suspense>

      {/* Category Highlights */}
      <Container>
        <div className="py-16 md:py-24 border-t border-neutral-200">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="/products/category/tops" className="group cursor-pointer">
              <div className="bg-neutral-100 h-64 md:h-80 mb-4 overflow-hidden flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <span className="text-neutral-500 text-lg font-light">Tops</span>
              </div>
              <h3 className="font-serif text-xl text-neutral-900 group-hover:text-neutral-600 transition-colors">Shirts & Tops</h3>
              <p className="text-sm text-neutral-600 mt-2">Timeless shirts, tees, and essential tops.</p>
            </a>
            <a href="/products/category/shoes" className="group cursor-pointer">
              <div className="bg-neutral-100 h-64 md:h-80 mb-4 overflow-hidden flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <span className="text-neutral-500 text-lg font-light">Shoes</span>
              </div>
              <h3 className="font-serif text-xl text-neutral-900 group-hover:text-neutral-600 transition-colors">Shoes</h3>
              <p className="text-sm text-neutral-600 mt-2">From casual to formal footwear essentials.</p>
            </a>
            <a href="/products/category/outerwear" className="group cursor-pointer">
              <div className="bg-neutral-100 h-64 md:h-80 mb-4 overflow-hidden flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <span className="text-neutral-500 text-lg font-light">Outerwear</span>
              </div>
              <h3 className="font-serif text-xl text-neutral-900 group-hover:text-neutral-600 transition-colors">Outerwear</h3>
              <p className="text-sm text-neutral-600 mt-2">Jackets and layering pieces for all seasons.</p>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
