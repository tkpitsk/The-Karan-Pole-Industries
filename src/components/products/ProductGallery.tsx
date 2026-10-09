"use client";

import { useState, useEffect } from "react";
import { Box } from "lucide-react";

export default function ProductGallery({ images, productName }: { images: { url: string }[], productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-neutral-100 overflow-hidden border border-neutral-100 flex items-center justify-center">
        <Box className="h-24 w-24 text-neutral-300" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square rounded-[2.5rem] bg-neutral-100 overflow-hidden shadow-xl ring-1 ring-black/5">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={`${productName} image ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${idx === currentIndex ? "border-brand-primary ring-4 ring-brand-primary/20 scale-105" : "border-transparent hover:border-neutral-300 opacity-60 hover:opacity-100"
                }`}
            >
              <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
