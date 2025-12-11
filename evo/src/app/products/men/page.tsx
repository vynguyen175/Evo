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
    </>
  );
}
