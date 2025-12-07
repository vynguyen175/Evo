import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="py-12 md:py-16 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
              Shop All
            </h1>
            <p className="text-neutral-600">Loading products...</p>
          </div>
        </Container>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
