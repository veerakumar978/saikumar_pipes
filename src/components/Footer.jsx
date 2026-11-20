import { ArrowRight, ArrowUp, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  businessInfo,
  formatIndianPhone,
  toTelHref,
  toWhatsAppHref,
} from '../config/business';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Product Categories', href: '#products' },
  { label: 'Our Brands', href: '#brands' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Our Store', href: '#store' },
  { label: 'Contact Us', href: '#contact' },
];

const PRODUCT_LINKS = [
  'CPVC',
  'UPVC',
  'PVC',
  'Electrical',
  'Sanitary',
  'Water Tank',
  'Casing Pipes',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumbers = businessInfo.whatsappEnabledNumbers ?? [];

  const handleSmoothScroll = (event, href) => {
    event.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#123B68] text-white border-t border-[#1D4E83]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8 sm:pt-16 sm:pb-10 lg:pt-20">
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Business Identity */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, '#home')}
              aria-label="SAAIKUMAR Valves & Cocks — Back to top"
              className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7CC4FA]"
            >
              <img
                src="/logo.png"
                alt="SAAIKUMAR Valves & Cocks"
                width={1498}
                height={436}
                loading="lazy"
                decoding="async"
                className="h-9 sm:h-10 w-auto max-w-[180px] object-contain select-none"
              />
            </a>

            <h2 className="mt-5 text-base font-bold tracking-[-0.01em] text-white">
              {businessInfo.name}
            </h2>

            <p className="mt-2.5 max-w-sm text-sm leading-[1.7] text-[#C5D8EB]">
              Your destination for a range of plumbing, piping, valve and
              sanitary product categories. Get in touch with SAAIKUMAR Valves
              &amp; Cocks for your product enquiries.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8EC5F3]">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-1.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="inline-flex min-h-[36px] items-center text-sm text-[#D7E6F5] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CC4FA] rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8EC5F3]">
              Our Products
            </h2>
            <ul className="mt-4 space-y-1.5">
              {PRODUCT_LINKS.map((category) => (
                <li key={category}>
                  <a
                    href="#products"
                    onClick={(e) => handleSmoothScroll(e, '#products')}
                    className="inline-flex min-h-[36px] items-center text-sm text-[#D7E6F5] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CC4FA] rounded"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8EC5F3]">
              Get In Touch
            </h2>

            <div className="mt-4 space-y-3.5">
              {/* Phone Numbers */}
              <div className="space-y-2">
                {businessInfo.phoneNumbers.map((num) => (
                  <a
                    key={num}
                    href={toTelHref(num)}
                    className="group flex min-h-[40px] items-center gap-2.5 text-sm font-medium text-[#E8F2FC] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CC4FA] rounded"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#8EC5F3] group-hover:bg-[#2785CE] group-hover:text-white transition-colors">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="whitespace-nowrap">
                      {formatIndianPhone(num)}
                    </span>
                  </a>
                ))}
              </div>

              {/* Confirmed WhatsApp Numbers (only when confirmed) */}
              {whatsappNumbers.length > 0 && (
                <div className="space-y-2 pt-1">
                  {whatsappNumbers.map((num) => (
                    <a
                      key={num}
                      href={toWhatsAppHref(num)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[40px] items-center gap-2.5 text-sm font-medium text-[#E8F2FC] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CC4FA] rounded"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#8EC5F3] group-hover:bg-[#2785CE] group-hover:text-white transition-colors">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="whitespace-nowrap">
                        WhatsApp: {formatIndianPhone(num)}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* Verified Address (only when confirmed) */}
              {businessInfo.address && (
                <div className="flex items-start gap-2.5 pt-1 text-sm text-[#C5D8EB]">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#8EC5F3]"
                    aria-hidden="true"
                  />
                  {businessInfo.googleMapsUrl ? (
                    <a
                      href={businessInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed hover:text-white hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-[#7CC4FA] rounded"
                      title="View SAAIKUMAR Valves & Cocks on Google Maps"
                    >
                      {businessInfo.address}
                    </a>
                  ) : (
                    <span className="leading-relaxed">{businessInfo.address}</span>
                  )}
                </div>
              )}

              {/* Confirmed Opening Hours (only when confirmed) */}
              {businessInfo.openingHours && (
                <div className="flex items-start gap-2.5 text-sm text-[#C5D8EB]">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#8EC5F3]"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">
                    {businessInfo.openingHours}
                  </span>
                </div>
              )}

              {/* Contact Us Scroll Action */}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3194DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CC4FA] transition-colors"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#B7CEE5] leading-relaxed">
            &copy; {currentYear} {businessInfo.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6">
            <span className="text-xs sm:text-sm text-[#9FBBD6]">
              Designed with care.
            </span>

            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="inline-flex min-h-[44px] sm:min-h-[38px] items-center gap-1.5 rounded-lg border border-white/18 bg-white/8 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/16 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CC4FA] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
