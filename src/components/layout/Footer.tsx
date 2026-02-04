import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/kpiLogo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Top */}
      <div className="container text-center md:text-start mx-auto px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <Image
            src={logo}
            alt="The Karan Pole Industries"
            className="h-12 w-auto"
          />
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
            The Karan Pole Industries is a trusted manufacturer of high-quality
            infrastructure and electric poles, built with precision, strength,
            and long-term reliability.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="#about"
                className="inline-block text-text-secondary hover:text-text-primary"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#why-kpi"
                className="inline-block text-text-secondary hover:text-text-primary"
              >
                Why KPI
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="inline-block text-text-secondary hover:text-text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">
            Products
          </h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li>Electric Poles</li>
            <li>Infrastructure Poles</li>
            <li>Custom Fabrication</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="leading-relaxed">
              📍 Nau-Pukhri Road, Opposite Milan Pally, Jyoti Nagar, Tinsukia,
              Assam – 786125
            </li>
            <li>
              <a href="tel:+919395766852" className="hover:text-text-primary">
                📞 +91 93957-66852
              </a>
            </li>
            <li>
              <a
                href="mailto:karanpoleindustries@gmail.com"
                className="hover:text-text-primary break-all"
              >
                ✉️ thekaranpoleindustries@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} The Karan Pole Industries. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
