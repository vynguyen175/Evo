import { Suspense } from 'react';
import ProductsContent from '../ProductsContent';
import Container from '@/components/ui/Container';

export default function WomenProductsPage() {
  return (
    <>
      <Suspense
        fallback={
          <Container>
            <div className="py-12 md:py-16 text-center">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
                Women
              </h1>
              <p className="text-neutral-600">Loading women's products...</p>
            </div>
          </Container>
        }
      >
        <ProductsContent
          title="Women"
          description="Refined silhouettes and everyday luxury crafted for her. From minimalist essentials to bold statement pieces, find pieces that define your style."
          forcedGender="Women"
        />
      </Suspense>
    </>
  );
}
