import { ShieldCheck, Factory, Truck, Hammer } from "lucide-react";

export default function WhyKPISection() {
  return (
    <section id="why-kpi" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto container px-4">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-block mb-4 rounded-full bg-highlight px-4 py-1 text-sm font-medium text-highlight-foreground">
            Why KPI
          </span>

          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-primary">
            What Sets Karan Pole Industries Apart
          </h2>

          <p className="mt-6 text-base md:text-lg text-text-secondary">
            KPI is built around process discipline, quality assurance, and
            manufacturing reliability — the foundations required for
            critical infrastructure projects.
          </p>
        </div>

        {/* USP Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card */}
          <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <Factory className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              Manufacturing Expertise
            </h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Years of hands-on manufacturing experience enable us to meet the
              technical and structural demands of infrastructure projects.
            </p>
          </div>

          {/* Card */}
          <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              Quality-First Approach
            </h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Each product undergoes strict inspection and testing to ensure
              strength, durability, and compliance with industry standards.
            </p>
          </div>

          {/* Card */}
          <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <Truck className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              Reliable Delivery
            </h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Optimized production planning and logistics help us deliver
              consistently on time, even at scale.
            </p>
          </div>

          {/* Card */}
          <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <Hammer className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              Long-Term Performance
            </h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              KPI poles are engineered to withstand environmental stress and
              deliver dependable performance for decades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
