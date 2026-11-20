import { motion } from 'framer-motion';
import { ArrowRight, Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import {
  businessInfo,
  formatIndianPhone,
  toTelHref,
} from '../config/business';

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function OurStore() {
  const handleContactScroll = (event) => {
    event.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="store"
      aria-labelledby="store-heading"
      className="scroll-mt-20 bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Actual Store Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative isolate pb-2.5 pr-2.5 sm:pb-3.5 sm:pr-3.5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 right-0 bottom-0 sm:top-3.5 sm:left-3.5 rounded-2xl sm:rounded-3xl bg-[#DCEEFF]/60 z-0"
            />
            <div className="relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5EDF5] bg-white shadow-[0_20px_50px_-24px_rgba(18,59,104,0.18)]">
              <img
                src="/store.png"
                alt="Front view of SAAIKUMAR Valves & Cocks store"
                width={512}
                height={286}
                loading="lazy"
                decoding="async"
                className="block w-full aspect-[16/10] object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Right Column: Store Information */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some' }}
            className="lg:col-span-6"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEEFF]/75 border border-[#C6E2FC] px-3 sm:px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-[#123B68] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
                VISIT OUR STORE
              </span>
            </motion.div>

            <motion.h2
              id="store-heading"
              variants={fadeUpVariants}
              className="mt-4 text-[1.625rem] min-[375px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.35rem] font-extrabold tracking-[-0.02em] leading-[1.18] text-[#123B68]"
            >
              A Place to Explore Plumbing Essentials
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              className="mt-5 space-y-3.5 text-[0.9625rem] sm:text-base leading-[1.75] text-[#64748B]"
            >
              <p>
                Visit SAAIKUMAR Valves &amp; Cocks to enquire about our range of
                pipes, valves, fittings and sanitary product categories.
              </p>
              <p>
                Our store is a place to discuss your requirements and explore
                the products you need.
              </p>
            </motion.div>

            {/* Verified Store Details List */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-7 pt-6 border-t border-[#E5EDF5] space-y-4"
            >
              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F7FF] text-[#2785CE] border border-[#DCEEFF]">
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-bold text-[#123B68] leading-snug">
                    Visit Our Store
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#64748B]">
                    {businessInfo.address
                      ? businessInfo.address
                      : 'Contact us to confirm our store location and opening hours before visiting.'}
                  </p>
                </div>
              </div>

              {/* Opening Hours — shown only when verified */}
              {businessInfo.openingHours && (
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F7FF] text-[#2785CE] border border-[#DCEEFF]">
                    <Clock className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[0.9375rem] font-bold text-[#123B68] leading-snug">
                      Opening Hours
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#64748B]">
                      {businessInfo.openingHours}
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Numbers */}
              {businessInfo.phoneNumbers.length > 0 && (
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F7FF] text-[#2785CE] border border-[#DCEEFF]">
                    <Phone className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[0.9375rem] font-bold text-[#123B68] leading-snug">
                      Phone Enquiry
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      {businessInfo.phoneNumbers.map((num) => (
                        <a
                          key={num}
                          href={toTelHref(num)}
                          className="text-sm font-semibold text-[#2785CE] hover:text-[#123B68] underline-offset-4 hover:underline whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] rounded"
                        >
                          {formatIndianPhone(num)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Google Maps Actions — View Location & Get Directions */}
              {businessInfo.googleMapsUrl && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={businessInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#CBDCEB] bg-white px-4 py-2.5 text-sm font-semibold text-[#123B68] hover:border-[#2785CE] hover:bg-[#F0F7FF] hover:text-[#2785CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[#2785CE]" aria-hidden="true" />
                    <span>View Location</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />
                  </a>
                  <a
                    href={businessInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#123B68] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E4E85] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors"
                  >
                    <Navigation className="h-4 w-4 shrink-0 text-[#7CC4FA]" aria-hidden="true" />
                    <span>Get Directions</span>
                    <ExternalLink className="h-3.5 w-3.5 text-white/70" aria-hidden="true" />
                  </a>
                </div>
              )}
            </motion.div>

            {/* Supporting Visit-Planning Panel */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-7 rounded-2xl border border-[#DCEEFF] bg-[#F0F7FF] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="min-w-0">
                <h3 className="text-[0.95rem] font-bold text-[#123B68]">
                  Planning a Store Visit?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                  Reach out to us before visiting if you would like to enquire
                  about a particular product.
                </p>
              </div>
              <motion.a
                href="#contact"
                onClick={handleContactScroll}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.15 }}
                className="inline-flex min-h-[44px] w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(39,133,206,0.4)] hover:bg-[#1E6EAD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors"
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
