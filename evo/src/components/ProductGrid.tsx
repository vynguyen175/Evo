import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      {(title || subtitle) && (
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          {subtitle && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-4">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-neutral-900 leading-tight">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14 lg:gap-x-10 lg:gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-500 text-sm tracking-wide">No products found.</p>
        </div>
      )}
    </section>
  );
}
