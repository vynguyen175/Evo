import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12 md:mb-16">
          {subtitle && (
            <p className="text-xs tracking-widest uppercase text-neutral-500 mb-3">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Products Grid - Responsive: 2 columns mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 stagger-animation">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-500">No products found.</p>
        </div>
      )}
    </section>
  );
}
