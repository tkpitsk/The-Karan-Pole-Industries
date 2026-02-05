"use client";

import { useEffect, useState } from "react";

type HeroMedia = {
  _id: string;
  type: "image" | "video";
  url: string;
  order: number;
};

export default function HeroSection() {
  const [media, setMedia] = useState<HeroMedia[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ================= FETCH HERO MEDIA ================= */
  useEffect(() => {
    const fetchHeroMedia = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/hero-media`
        );
        const data = await res.json();
        setMedia(data);
      } catch {
        console.error("Failed to load hero media");
      }
    };

    fetchHeroMedia();
  }, []);

  /* ================= AUTO SLIDE (ONLY IF >1) ================= */
  useEffect(() => {
    if (media.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % media.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [media.length]);

  const activeMedia = media[activeIndex];

  return (
    <section
      className="
        relative
        min-h-[70vh]
        sm:min-h-[75vh]
        lg:min-h-[80vh]
        m-3 sm:m-4
        overflow-hidden
        rounded-2xl sm:rounded-3xl
      "
    >
      {/* ================= MEDIA ================= */}
      {activeMedia?.type === "image" && (
        <div
          key={activeMedia._id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${activeMedia.url})` }}
        />
      )}

      {activeMedia?.type === "video" && (
        <video
          key={activeMedia._id}
          src={activeMedia.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto container px-4 sm:px-6">
        <div
          className="
            flex min-h-[70vh] flex-col justify-center
            pt-24 sm:pt-28 lg:pt-32
            max-w-3xl
          "
        >
          <span className="inline-block w-fit rounded-full bg-highlight px-4 py-1 text-xs sm:text-sm text-accent">
            Trusted Industrial Manufacturer
          </span>

          <h1
            className="
              mt-4 sm:mt-6
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-semibold
              leading-tight
              text-white
            "
          >
            Strengthening Infrastructure <br className="hidden sm:block" />
            with Precision Poles
          </h1>

          <p
            className="
              mt-4 sm:mt-6
              text-sm sm:text-base md:text-lg
              text-neutral-200
              max-w-xl
            "
          >
            The Karan Pole Industries manufactures high-quality electric and
            infrastructure poles built to last, engineered for safety,
            reliability, and scale.
          </p>

          {/* CTA */}
          <div
            className="
              mt-8 sm:mt-10
              flex flex-col sm:flex-row
              gap-3 sm:gap-4
              w-full sm:w-auto
            "
          >
            <button className="rounded-md bg-highlight px-6 py-3 text-accent hover:opacity-90">
              View Products
            </button>

            <button className="rounded-md border border-white/60 px-6 py-3 text-white hover:bg-white hover:text-black transition">
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* ================= DOTS ================= */}
      {media.length > 1 && (
        <div
          className="
            absolute bottom-4 sm:bottom-6
            left-1/2 z-20
            flex -translate-x-1/2 gap-2
          "
        >
          {media.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300
                ${idx === activeIndex ? "bg-white w-6" : "bg-white/40 w-2"}
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}
