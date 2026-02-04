export default function LocationSection() {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT — Text */}
          <div>
            <span className="inline-block mb-4 rounded-full bg-highlight px-4 py-1 text-sm font-medium text-highlight-foreground">
              Our Location
            </span>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text-primary">
              Our Manufacturing Unit
            </h2>

            <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
              Our manufacturing facility is located in <strong>Tinsukia, Assam</strong>,
              strategically positioned to serve infrastructure projects across
              the region with efficient logistics and timely delivery.
            </p>

            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
              We operate with modern machinery, skilled manpower, and strict
              quality controls to ensure every product meets industry standards.
            </p>

            <p className="mt-6 text-sm text-text-muted">
              📍 Nau-Pukhri Road, Opposite Milan Pally, Jyoti Nagar,  
              Tinsukia, Assam – 786125
            </p>
          </div>

          {/* RIGHT — Map */}
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <iframe
              title="Karan Pole Industries Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.649916209136!2d95.3629524!3d27.480156299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x373f6aefdd75a249%3A0x90097cd64af90889!2sThe%20Karan%20Pole%20Industries%20(A%20unit%20of%20Sunbird%20Ventures%20LLP)!5e0!3m2!1sen!2sin!4v1770117236528!5m2!1sen!2sin"
              className="h-104 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
