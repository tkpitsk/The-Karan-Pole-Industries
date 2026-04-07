"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import brandLogo from "@/assets/logo/kpiLogo.png";

type HeroMedia = {
  _id: string;
  type: "image" | "video";
  url: string;
  order: number;
};

export default function HeroSection() {
  const [media, setMedia] = useState<HeroMedia[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchHeroMedia = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero-media`);
        const data = await res.json();
        setMedia(data);
      } catch {
        console.error("Failed to load hero media");
      }
    };

    fetchHeroMedia();
  }, []);

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
        relative m-3 overflow-hidden rounded-2xl
        min-h-[72vh] sm:min-h-[78vh] lg:min-h-[84vh]
        sm:m-4 sm:rounded-3xl
      "
    >
      {/* Background media */}
      <div className="absolute inset-0">
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

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,12,15,0.82)_0%,rgba(43,22,29,0.72)_38%,rgba(0,0,0,0.30)_70%,rgba(0,0,0,0.45)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,222,94,0.14),transparent_25%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[90vw] items-center px-4 py-16 sm:min-h-[78vh] sm:px-6 sm:py-20 lg:min-h-[84vh] lg:px-8">
        <div className="max-w-3xl">
          {/* Logo kept large on purpose */}
          <div className="w-fit rounded-2xl border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-md sm:px-5 sm:py-5">
            <Image
              src={brandLogo}
              alt="The Karan Pole Industries Logo"
              width={150}
              height={50}
              priority
              className="h-auto w-37.5 sm:w-37.5"
            />
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary sm:text-sm">
            Trusted Industrial Manufacturer
          </p>

          <h1
            className="
              mt-5 max-w-2xl
              text-4xl font-semibold leading-[1.08] text-white
              sm:text-5xl lg:text-6xl
            "
          >
            Strengthening Infrastructure
            <span className="block text-white/90">with Precision Poles</span>
          </h1>

          <p
            className="
              mt-6 max-w-xl
              text-sm leading-7 text-white/78
              sm:text-base md:text-lg
            "
          >
            Karan Pole Industries manufactures high-quality electric and
            infrastructure poles built for long service life, dependable safety,
            and reliable project-scale supply.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <button
              className="
                inline-flex min-h-12 items-center justify-center
                rounded-xl bg-highlight px-6 py-3
                text-sm font-semibold text-accent
                shadow-lg transition duration-300
                hover:-translate-y-0.5 hover:opacity-95
              "
            >
              Get a Quote
            </button>

            <button
              className="
                inline-flex min-h-12 items-center justify-center
                rounded-xl border border-white/20 bg-white/8
                px-6 py-3 text-sm font-semibold text-white
                backdrop-blur-sm transition duration-300
                hover:bg-white hover:text-black
              "
            >
              View Products
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
            <span>High-strength poles</span> |
            <span>Project-ready supply</span> |
            <span>Built for durability</span>
          </div>
        </div>
      </div>

      {/* Dots */}
      {media.length > 1 && (
        <div
          className="
            absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2
            rounded-full border border-white/10 bg-black/25 px-3 py-2
            backdrop-blur-md sm:bottom-6
          "
        >
          {media.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                ? "w-7 bg-highlight"
                : "w-2 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}