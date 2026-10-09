import Link from 'next/link';
import CategoryCard from "@/components/products/CategoryCard";
import { fetchCategories } from "@/utils/api";
import { ArrowRight } from "lucide-react";

export default async function ProductsSection() {
  const categories = await fetchCategories();

  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="mx-auto container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 rounded-full bg-highlight px-4 py-1 text-sm font-medium text-highlight-foreground">
              Products
            </span>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-primary">
              Our Product Categories
            </h2>

            <p className="mt-6 text-base md:text-lg text-text-secondary">
              We manufacture and supply a comprehensive range of industrial steel and construction materials designed for strength, durability, and performance.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <Link 
              href="/products" 
              className="inline-flex items-center font-medium text-brand-primary hover:text-brand-primary/80 transition-colors"
            >
              View Full Catalog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.slice(0, 8).map((category: any) => (
              <CategoryCard key={category._id} category={category} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-neutral-500">
              Loading categories or no categories found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
