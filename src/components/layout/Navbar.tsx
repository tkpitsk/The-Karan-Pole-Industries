"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/kpiLogo.png";

export default function FloatingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="fixed top-8 left-1/2 z-50 -translate-x-1/2">
            <nav
                className={`flex items-center gap-14 rounded-full border border-border px-5 py-2 backdrop-blur-md shadow-md transition-all duration-300
                    ${scrolled
                        ? "bg-background/70"
                        : "bg-background/70"
                    }`}
            >
                <div className="flex gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="The Karan Pole Industries"
                            className="h-10 w-auto"
                            priority
                        />
                        <span className="sr-only">The Karan Pole Industries</span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {[
                            { label: "About", href: "#about" },
                            { label: "Products", href: "#products" },
                            { label: "Why KPI", href: "#why-kpi" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#quote"
                        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-text-primary transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    >
                        Get Quote
                    </Link>

                    <Link
                        href="#contact"
                        className="rounded-full bg-brand-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    );
}
