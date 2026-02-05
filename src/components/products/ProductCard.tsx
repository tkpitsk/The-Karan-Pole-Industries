import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  subCategory: string;
  unit: string;
  baseMaterial: string;
  weightPerUnit: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      
      <p className="text-xs uppercase tracking-wide text-text-muted">
        {product.subCategory}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-text-primary">
        {product.name}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-text-secondary">
        <p>
          <span className="font-medium">Unit:</span> {product.unit}
        </p>

        <p>
          <span className="font-medium">Material:</span> {product.baseMaterial}
        </p>

        {product.weightPerUnit > 0 && (
          <p>
            <span className="font-medium">Weight:</span>{" "}
            {product.weightPerUnit} per unit
          </p>
        )}
      </div>

      <Link
        href={`/contact?product=${encodeURIComponent(product.name)}`}
        className="mt-6 inline-flex items-center justify-center w-full rounded-full border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-muted transition"
      >
        Get Quote
      </Link>
    </div>
  );
}
