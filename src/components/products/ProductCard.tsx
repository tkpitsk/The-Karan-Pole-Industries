import Link from 'next/link';
import { ArrowRight, Settings2 } from 'lucide-react';

interface ProductCardProps {
  categorySlug: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    galleryImages?: { url: string }[];
    status: string;
  };
}

export default function ProductCard({ categorySlug, product }: ProductCardProps) {
  const imageUrl = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages[0].url 
    : null;

  return (
    <Link 
      href={`/products/${categorySlug}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:border-brand-primary h-full"
    >
      <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Settings2 className="h-12 w-12 text-neutral-300 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-primary/50" />
        )}
        <div className="absolute inset-0 bg-brand-primary/0 transition-colors duration-300 group-hover:bg-brand-primary/10" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="mb-2 font-serif text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>
        
        {product.shortDescription && (
          <p className="text-sm text-neutral-600 line-clamp-2 mb-4 flex-grow">
            {product.shortDescription}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            View Details
          </span>
          <ArrowRight className="h-4 w-4 text-brand-primary transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
