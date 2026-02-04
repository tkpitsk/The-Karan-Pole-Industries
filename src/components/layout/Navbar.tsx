"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo/kpiLogo.png";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-6 inset-x-0 z-50">
        <div className="flex justify-center px-4">
          <nav
            className={`inline-flex items-center gap-4 md:gap-8 rounded-full border border-white/20
              px-3 md:pr-5 py-2 backdrop-blur-xl transition-all duration-300
              ${scrolled ? "bg-background/50 shadow-md" : "bg-background/70 shadow-md"}
            `}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src={logo}
                alt="The Karan Pole Industries"
                className="h-9 w-9 md:h-14 md:w-14"
                priority
              />
            </Link>

            {/* Links (Desktop & Tablet) */}
            <div className="hidden md:flex items-center gap-6 whitespace-nowrap">
              <Link href="#about" className="text-sm text-text-secondary hover:text-text-primary transition">
                About
              </Link>
              <Link href="#products" className="text-sm text-text-secondary hover:text-text-primary transition">
                Products
              </Link>
              <Link href="#why-kpi" className="text-sm text-text-secondary hover:text-text-primary transition">
                Why KPI
              </Link>
            </div>

            {/* CTAs (Desktop & Tablet) */}
            <div className="hidden md:flex items-center gap-3 shrink-0 whitespace-nowrap">
              <Link
                href="#quote"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-muted transition"
              >
                Get Quote
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-full border border-border p-2 text-text-primary hover:bg-muted transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-20 inset-x-0 z-40 md:hidden">
          <div className="flex justify-center px-4">
            <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-background/90 backdrop-blur-xl shadow-xl">
              <div className="divide-y divide-border">
                {[
                  { label: "About", href: "#about" },
                  { label: "Products", href: "#products" },
                  { label: "Why KPI", href: "#why-kpi" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-4 text-sm font-medium hover:bg-muted transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="p-4 flex flex-col gap-3 bg-muted/50">
                <Link
                  href="#quote"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-center hover:bg-background transition"
                >
                  Get Quote
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-brand-primary px-4 py-2 text-sm font-medium text-white text-center hover:opacity-90 transition"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
