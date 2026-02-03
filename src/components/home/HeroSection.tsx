import heroImage from "@/assets/images/heroImage.jpg";

export default function HeroSection() {
    return (
        <section
            className="relative min-h-[80vh] flex items-center bg-cover bg-center m-4 rounded-3xl"
            style={{
                backgroundImage: `url(${heroImage.src})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 pt-12">
                <div className="max-w-3xl">
                    <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-normal text-neutral-200">
                        Trusted Industrial Manufacturer
                    </span>

                    <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-tight text-white">
                        Strengthening Infrastructure <br />
                        with Precision Poles
                    </h1>

                    <p className="mt-6 text-lg text-neutral-200">
                        The Karan Pole Industries manufactures high-quality electric and
                        infrastructure poles built to last, engineered for safety,
                        reliability, and scale.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button className="rounded-md bg-highlight px-6 py-3 text-accent hover:opacity-90">
                            View Products
                        </button>

                        <button className="rounded-md border border-white/60 px-6 py-3 text-white hover:bg-white hover:text-black transition">
                            Get a Quote
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
