import CategoryCard from "@/components/products/CategoryCard";
import { fetchCategories } from "@/utils/api";

export const metadata = {
  title: "Product Catalog | KPI",
  description: "Browse our comprehensive range of industrial steel and construction materials.",
};

export default async function CatalogPage() {
  const categories = await fetchCategories();

  return (
    <main className="min-h-screen bg-background pt-40 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Product Catalog
          </h1>
          <p className="text-lg text-text-secondary">
            Explore our extensive selection of high-quality construction and industrial materials, engineered to meet the most demanding specifications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((category: any) => (
              <CategoryCard key={category._id} category={category} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-neutral-500">No categories found in the catalog at this time.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
