import Image from "next/image";
import aboutImage from "@/assets/images/heroImage1.jpg"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted">
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT — Content */}
          <div>
            <span className="inline-block mb-4 rounded-full bg-highlight px-4 py-1 text-sm font-medium text-highlight-foreground">
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-primary leading-tight">
              Building Strong Infrastructure <br className="hidden sm:block" />
              with Engineering Precision
            </h2>

            <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
              <strong>The Karan Pole Industries (KPI)</strong> is a trusted name in
              manufacturing high-quality electric and infrastructure poles. With
              a focus on durability, safety, and engineering excellence, we serve
              infrastructure projects that demand long-term reliability.
            </p>

            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
              Our manufacturing processes follow strict quality standards,
              ensuring every product delivers strength, performance, and
              consistency at scale.
            </p>

            {/* Stats / Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <p className="text-2xl font-semibold text-accent">10+ Years</p>
                <p className="text-sm text-text-muted">Industry Experience</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-accent">100%</p>
                <p className="text-sm text-text-muted">Quality Tested</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-accent/10 -z-10 translate-x-4 translate-y-4" />
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-lg">
              <Image
                src={aboutImage}
                alt="Karan Pole Industries Manufacturing"
                width={600}
                height={450}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
