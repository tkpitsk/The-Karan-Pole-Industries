export default function ContactPage() {
    return (
        <main className="pt-32 pb-20 md:pt-36 md:pb-28 bg-background">
            <div className="mx-auto max-w-7xl px-4">
                {/* Content */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* LEFT — Contact Info */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="max-w-2xl">
                            <span className="inline-block mb-4 rounded-full bg-highlight px-4 py-1 text-sm font-medium text-highlight-foreground">
                                Contact Us
                            </span>

                            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-text-primary">
                                Get in Touch with Karan Pole Industries
                            </h1>

                            <p className="mt-6 text-base md:text-lg text-text-secondary">
                                Have a requirement or enquiry? Reach out to us and our team will
                                respond promptly.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Office & Manufacturing Unit
                            </h3>
                            <p className="mt-3 text-text-secondary leading-relaxed">
                                Nau-Pukhri Road, Opposite Milan Pally, <br />
                                Jyoti Nagar, Tinsukia, Assam – 786125
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Phone
                            </h3>
                            <p className="mt-3 text-text-secondary">
                                <a href="tel:+9193957-66852" className="hover:text-text-primary">
                                    +91 93957-66852
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Email
                            </h3>
                            <p className="mt-3 text-text-secondary break-all">
                                <a
                                    href="mailto:karanpoleindustries@gmail.com"
                                    className="hover:text-text-primary"
                                >
                                    karanpoleindustries@gmail.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Business Hours
                            </h3>
                            <p className="mt-3 text-text-secondary">
                                Monday – Saturday: 9:00 AM – 6:00 PM <br />
                                Sunday: Closed
                            </p>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="pt-4">
                            <a
                                href="https://wa.me/919395766852?text=Hello%20Karan%20Pole%20Industries,%20I%20would%20like%20to%20enquire%20about%20your%20products."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                            >
                                💬 Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — Contact Form */}
                    <div className="rounded-3xl border border-border bg-surface p-6 md:p-8 shadow-lg">
                        <h3 className="text-xl font-semibold text-text-primary">
                            Send an Enquiry
                        </h3>

                        <form className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Your phone number"
                                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary">
                                    Message / Requirement
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your requirement"
                                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                            >
                                Submit Enquiry
                            </button>
                        </form>
                    </div>

                </div>

                {/* MAP */}
                <div className="mt-20">
                    <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
                        <iframe
                            title="The Karan Pole Industries Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.649916209136!2d95.3629524!3d27.480156299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x373f6aefdd75a249%3A0x90097cd64af90889!2sThe%20Karan%20Pole%20Industries%20(A%20unit%20of%20Sunbird%20Ventures%20LLP)!5e0!3m2!1sen!2sin!4v1770117236528!5m2!1sen!2sin"
                            className="h-105 w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

            </div>
        </main>
    );
}
