"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";

type Product = {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
  unit: string;
  baseMaterial: string;
  weightPerUnit: number;
  visibleToCustomer: boolean;
  isActive: boolean;
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/public`
        );
        const data = await res.json();

        const visibleProducts = data.filter(
          (p: Product) => p.isActive && p.visibleToCustomer
        );

        setProducts(visibleProducts);
      } catch {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="mx-auto container px-4">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-block mb-4 rounded-full bg-highlight px-4 py-1 text-sm font-medium text-highlight-foreground">
            Products
          </span>

          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-primary">
            Our Product Range
          </h2>

          <p className="mt-6 text-base md:text-lg text-text-secondary">
            We manufacture and supply a range of infrastructure and electrical
            products designed for strength, durability, and long-term use.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-3xl border border-border bg-muted animate-pulse"
                />
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}
