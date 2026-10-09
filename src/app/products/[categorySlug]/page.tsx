import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategoryBySlug, fetchProducts } from "@/utils/api";
import ProductCard from "@/components/products/ProductCard";
import { ChevronRight, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | KPI Products`,
    description: category.description || `Browse our range of ${category.name}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold text-text-primary mb-4">Category Not Found</h1>
          <p className="text-text-secondary mb-8">The category you are looking for does not exist or could not be loaded.</p>
          <Link href="/products" className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90">
            Return to Catalog
          </Link>
        </div>
      </main>
    );
  }
  // Fetch all products, then filter by this category
  // Ideally there's a backend endpoint for this, but if not we filter locally for now.
  const allProducts = await fetchProducts();
  const categoryProducts = allProducts.filter((p: any) => p.categoryId && p.categoryId._id === category._id);

  return (
    <main className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">

        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center text-sm text-neutral-500">
          <Link href="/products" className="hover:text-brand-primary transition-colors flex items-center">
            All Categories
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-text-primary font-medium">{category.name}</span>
        </div>

        {/* Modern Header */}
        <div className="relative mb-16 overflow-hidden rounded-[2.5rem] bg-white border border-neutral-100 shadow-2xl shadow-brand-primary/5">
          {/* Decorative ambient background elements */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />

          <div className="relative flex flex-col-reverse lg:flex-row items-center gap-10 p-8 md:p-12 lg:p-16">
            <div className="flex-1 space-y-6 text-center lg:text-left z-10">
              <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-bold tracking-wider text-brand-primary uppercase">
                Collection
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight">
                {category.name}
              </h1>
              {category.description && (
                <p className="max-w-2xl text-lg md:text-xl text-neutral-500 leading-relaxed mx-auto lg:mx-0">
                  {category.description}
                </p>
              )}
            </div>

            {category.image && category.image.url && (
              <div className="relative w-full max-w-sm lg:max-w-none lg:w-[45%] shrink-0 z-10">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-neutral-100 shadow-xl ring-1 ring-black/5 transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl">
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-semibold text-text-primary mb-6">
            Available Products ({categoryProducts.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((product: any) => (
              <ProductCard
                key={product._id}
                categorySlug={category.slug}
                product={product}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white border border-border rounded-3xl">
              <p className="text-lg text-neutral-500">No products available in this category yet.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
