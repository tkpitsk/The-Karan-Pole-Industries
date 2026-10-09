import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoryCardProps {
  category: {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: { url: string };
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/products/${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-brand-primary/30"
    >
      {/* Image Area */}
      <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
        {category.image?.url ? (
          <img 
            src={category.image.url} 
            alt={category.name} 
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-primary/5">
            <Layers className="h-12 w-12 text-brand-primary/40 transition-transform duration-500 group-hover:scale-110" />
          </div>
        )}
        
        {/* Overlay gradient for better text contrast if we wanted text over image, but we are keeping it separate */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-serif text-2xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand-primary">
          {category.name}
        </h3>
        
        {category.description && (
          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {category.description}
          </p>
        )}
        
        {/* Explore Button */}
        <div className="mt-auto flex items-center text-sm font-semibold tracking-wide text-brand-primary">
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              Explore Collection
            </span>
            <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Explore Collection
            </span>
          </span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}
