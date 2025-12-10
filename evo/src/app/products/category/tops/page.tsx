import { Suspense } from 'react';
import ProductsContent from '../../ProductsContent';
import Container from '@/components/ui/Container';

export default function TopsPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="py-12 md:py-16 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
              Tops
            </h1>
            <p className="text-neutral-600">Loading products...</p>
          </div>
        </Container>
      }
    >
      <ProductsContent
        title="Tops"
        description="From casual tees to refined blouses—versatile tops for every occasion."
        forcedCategory="Tops"
      />
    </Suspense>
  );
}
