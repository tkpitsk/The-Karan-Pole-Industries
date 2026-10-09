import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchCategoryBySlug } from "@/utils/api";
import { ChevronRight, ArrowLeft, Ruler, Scale, Download, ShieldCheck, Factory } from "lucide-react";
import ProductGallery from "@/components/products/ProductGallery";
import ExpandableDescription from "@/components/products/ExpandableDescription";

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string, productSlug: string }> }) {
  const { productSlug } = await params;
  const response = await fetchProductBySlug(productSlug);
  const product = response?.product;

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | KPI Products`,
    description: product.shortDescription || product.description || `View specifications for ${product.name}`,
  };
}

// Safely parse arrays that were stringified as JSON strings
function parseStringArray(arr: any): string[] {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return [];
  try {
    if (arr.length === 1 && typeof arr[0] === 'string' && arr[0].startsWith('[')) {
      return JSON.parse(arr[0]);
    }
    return arr;
  } catch {
    return arr;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ categorySlug: string, productSlug: string }> }) {
  const { categorySlug, productSlug } = await params;

  const [response, category] = await Promise.all([
    fetchProductBySlug(productSlug),
    fetchCategoryBySlug(categorySlug)
  ]);

  const product = response?.product;
  const variants = response?.variants || [];

  if (!product || !category) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Product Not Found</h1>
          <p className="text-neutral-500 mb-8">The product you are looking for does not exist or could not be loaded.</p>
          <Link href="/products" className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90">
            Return to Catalog
          </Link>
        </div>
      </main>
    );
  }

  const features = parseStringArray(product.features);
  const applications = parseStringArray(product.applications);
  const industriesUsed = parseStringArray(product.industriesUsed);
  const standards = parseStringArray(product.standards);

  const images = product.galleryImages || [];
  const brochures = product.brochures || [];

  const descriptionText = product.longDescription || product.shortDescription || "";

  return (
    <main className="min-h-screen bg-neutral-50 pt-32 pb-24">
      <div className="container mx-auto px-4">

        {/* Breadcrumbs */}
        <div className="mb-10 flex flex-wrap items-center text-sm text-neutral-500 gap-y-2">
          <Link href="/products" className="hover:text-brand-primary transition-colors flex items-center shrink-0">
            All Categories
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 shrink-0 opacity-50" />
          <Link href={`/products/${category.slug}`} className="hover:text-brand-primary transition-colors shrink-0">
            {category.name}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </div>

        {/* Product Hero */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-12 mb-16 shadow-2xl shadow-neutral-200/50 border border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left Column: Images & Quick Specs */}
            <div className="w-full flex flex-col gap-10">
              <ProductGallery images={images} productName={product.name} />

              {/* Quick Specs moved below images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {standards.length > 0 && (
                  <div className="flex items-center p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <ShieldCheck className="h-8 w-8 text-brand-primary/70 mr-4 shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">Standard</div>
                      <div className="text-sm font-medium text-neutral-900">{standards.join(", ")}</div>
                    </div>
                  </div>
                )}
                {industriesUsed.length > 0 && (
                  <div className="flex items-center p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <Factory className="h-8 w-8 text-brand-primary/70 mr-4 shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">Industries</div>
                      <div className="text-sm font-medium text-neutral-900 line-clamp-1">{industriesUsed.join(", ")}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Info & Expandable Description */}
            <div className="flex flex-col justify-start pt-2">
              <span className="inline-block mb-6 rounded-full bg-brand-primary/10 text-brand-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider w-fit">
                {category.name}
              </span>

              <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-neutral-900 mb-6 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 pb-10 border-b border-neutral-100">
                <Link href="/#quote" className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-0.5">
                  Request a Quote
                </Link>
                {brochures.length > 0 && (
                  <a
                    href={brochures[0].url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-white border-2 border-neutral-200 px-8 py-4 text-base font-medium text-neutral-700 transition-all hover:border-brand-primary hover:text-brand-primary hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Brochure
                  </a>
                )}
              </div>

              {/* Expandable Description with Features & Applications */}
              {descriptionText && (
                <ExpandableDescription
                  description={descriptionText}
                  features={features}
                  applications={applications}
                />
              )}

            </div>
          </div>
        </div>

        {/* Bottom Full-Width Sections Layout */}
        <div className="space-y-12">

          {/* Technical Specifications (Variants) */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-3">
                Technical Specifications
              </h2>
              <p className="text-neutral-500 text-lg">Available sizes, dimensions, and weights for {product.name}.</p>
            </div>

            <div className="bg-white border border-neutral-100 rounded-[2rem] overflow-hidden shadow-xl shadow-neutral-200/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="py-5 px-8 font-semibold text-neutral-900 whitespace-nowrap">SKU / Variant</th>
                      <th className="py-5 px-8 font-semibold text-neutral-900 whitespace-nowrap">Grade / Material</th>
                      <th className="py-5 px-8 font-semibold text-neutral-900 whitespace-nowrap">Dimensions</th>
                      <th className="py-5 px-8 font-semibold text-neutral-900 whitespace-nowrap">Unit Weight</th>
                      <th className="py-5 px-8 font-semibold text-neutral-900 whitespace-nowrap">Indicative Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {variants && variants.length > 0 ? (
                      variants.map((variant: any) => {
                        let priceInfo = null;
                        if (product.baseRate && product.baseRate > 0) {
                          // The base rate in DB is per Kg (e.g., ₹64)
                          const diff = variant.pricingFactors?.difference || 0; // assume diff is also per kg
                          const ratePerKg = product.baseRate + diff;
                          const ratePerTon = ratePerKg * 1000;
                          
                          if (variant.unit === 'ton') {
                            priceInfo = { val: ratePerTon, str: 'per Ton' };
                          } else if (variant.unit === 'kg') {
                            priceInfo = { val: ratePerKg, str: 'per Kg' };
                          } else if (variant.unit === 'meter' && variant.sectionalWeight) {
                            priceInfo = { val: ratePerKg * variant.sectionalWeight, str: 'per Meter' };
                          } else if (variant.unit === 'piece' && variant.dimensions?.length && variant.sectionalWeight) {
                            priceInfo = { val: ratePerKg * variant.sectionalWeight * variant.dimensions.length, str: 'per Piece' };
                          }
                        }

                        return (
                          <tr key={variant._id} className="hover:bg-brand-primary/5 transition-colors group">
                            <td className="py-5 px-8">
                              <div className="font-bold text-neutral-900 group-hover:text-brand-primary transition-colors">{variant.variantName}</div>
                              <div className="text-xs text-neutral-500 font-mono mt-1 tracking-wider uppercase">{variant.sku}</div>
                            </td>
                            <td className="py-5 px-8 text-neutral-600 font-medium">
                              {variant.grade || variant.materialType || '-'}
                            </td>
                            <td className="py-5 px-8 text-neutral-600">
                              {(variant.dimensions?.diameter || variant.dimensions?.thickness || variant.dimensions?.width) ? (
                                <div className="flex items-center bg-neutral-50 w-fit px-3 py-1.5 rounded-lg border border-neutral-100">
                                  <Ruler className="h-4 w-4 mr-2 text-neutral-400" />
                                  <span className="text-sm font-medium">
                                    {variant.dimensions?.diameter ? `${variant.dimensions.diameter}mm ` : ''}
                                    {variant.dimensions?.thickness ? `${variant.dimensions.thickness}mm ` : ''}
                                    {variant.dimensions?.width ? `W:${variant.dimensions.width}mm ` : ''}
                                  </span>
                                </div>
                              ) : '-'}
                            </td>
                            <td className="py-5 px-8 text-neutral-600">
                              {variant.sectionalWeight ? (
                                <div className="flex items-center bg-neutral-50 w-fit px-3 py-1.5 rounded-lg border border-neutral-100">
                                  <Scale className="h-4 w-4 mr-2 text-neutral-400" />
                                  <span className="text-sm font-medium">{variant.sectionalWeight} kg/m</span>
                                </div>
                              ) : '-'}
                            </td>
                            <td className="py-5 px-8">
                              {priceInfo ? (
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-neutral-900">₹{priceInfo.val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                                  <span className="text-xs text-neutral-500">{priceInfo.str}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-neutral-400 italic">On Request</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 px-8 text-center text-neutral-400 font-medium text-lg bg-neutral-50/50">
                          No technical specifications available yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-neutral-100 shadow-xl shadow-neutral-200/40">
            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-6">
              Terms and Conditions :
            </h3>
            <ol className="list-decimal list-outside ml-4 space-y-2 text-sm text-neutral-600 font-medium">
              <li>GST @ 18% will be charged extra.</li>
              <li>Loading @ Rs 375/- per mt will be charged extra</li>
              <li>Transit Insurance will be charged extra @ Rs 40/- per ton.</li>
              <li>Transportation costs will be charged extra.</li>
              <li>Payment of 100% advance along with the order. Through bank transfer.</li>
              <li>Dispatch 1-7 working days from receipt of advance.</li>
              <li>Material is of commercial grade as per IS 2062.</li>
              <li>Mill TC can be Provided.</li>
              <li>The material would be 11-13 metres long for trailer loading and 5.5-6.5 metres long for lorry loading. [19x19 to 45x45 angle are only available in 5.5-6.5 metres]</li>
              <li>For fixed length, an additional fee of between Rs.500 and Rs.1000 per metric tonne will be charged extra, depending on the size, quantity, and availability of the material.</li>
              <li>Actual dispatch quantity may differ +/- 10%.</li>
              <li>Weight tolerance +/- 0.5% is to be allowed.</li>
              <li>Rates are subject to minimum order quantity.</li>
              <li>Rates are subject to change as per the hourly market situation</li>
              <li>Rates at the time of receipt of advance will be final.</li>
              <li>Offer is valid till the end of business hours today.</li>
              <li>Products are subject to availability.</li>
              <li>Above rates are indicative of market prices. Kindly reconfirm the prices before placing an order.</li>
            </ol>
            <div className="mt-8">
              <Link href="/#quote" className="inline-flex items-center justify-center rounded-xl border-2 border-brand-primary px-8 py-3 text-base font-bold text-brand-primary transition-all hover:bg-brand-primary hover:text-white">
                Enquiry Now
              </Link>
            </div>
          </div>

          {/* Need Custom Specifications */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-primary/90 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-3">Need Custom Specifications?</h3>
              <p className="text-white/80 leading-relaxed max-w-xl">
                We manufacture and supply custom industrial materials tailored to your specific project requirements.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-brand-primary font-bold px-8 py-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
              Contact Sales
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
