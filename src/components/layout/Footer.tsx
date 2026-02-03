import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/kpiLogo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <Image
            src={logo}
            alt="The Karan Pole Industries"
            className="h-12 w-auto"
          />
          <p className="text-sm text-text-secondary leading-relaxed">
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
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#about" className="text-text-secondary hover:text-text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#why-kpi" className="text-text-secondary hover:text-text-primary">
                Why KPI
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-text-secondary hover:text-text-primary">
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
          <ul className="space-y-2 text-sm">
            <li className="text-text-secondary">Electric Poles</li>
            <li className="text-text-secondary">Infrastructure Poles</li>
            <li className="text-text-secondary">Custom Fabrication</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>📍 Nau-Pukhri Road, Opposite Milan Pally, Jyoti Nagar, Tinsukia, Assam - 786125</li>
            <li>📞 +91 99578-34347</li>
            <li>✉️ karanpoleindustries@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} The Karan Pole Industries. All rights reserved.
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
