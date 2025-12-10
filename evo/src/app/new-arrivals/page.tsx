import { Suspense } from 'react';
import ProductsContent from '../products/ProductsContent';
import Container from '@/components/ui/Container';

export default function NewArrivalsPage() {
  return (
    <>
      <Suspense
        fallback={
          <Container>
            <div className="py-12 md:py-16 text-center">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
                New Arrivals
              </h1>
              <p className="text-neutral-600">Loading latest products...</p>
            </div>
          </Container>
        }
      >
        <ProductsContent
          title="New Arrivals"
          description="Discover our latest pieces—fresh styles and seasonal essentials just landed. First access to new collections before they're gone."
          newArrivals={true}
        />
      </Suspense>

      {/* Featured Info Section */}
      <Container>
        <div className="py-16 md:py-24 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-3">Weekly Updates</h3>
              <p className="text-neutral-600 text-sm">New pieces added every week to keep our collection fresh and current.</p>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-3">Limited Quantities</h3>
              <p className="text-neutral-600 text-sm">Most new arrivals are available in limited quantities, making each piece special.</p>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-3">Seasonal Highlights</h3>
              <p className="text-neutral-600 text-sm">Curated seasonal collections aligned with current trends and weather.</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
