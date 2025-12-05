import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="text-center mb-14 md:mb-20">
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

      {/* Products Grid - Responsive: 2 columns mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:gap-x-8 lg:gap-y-16 stagger-animation">
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
