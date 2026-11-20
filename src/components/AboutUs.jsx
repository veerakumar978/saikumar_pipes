import { motion } from 'framer-motion';
import { Droplets, Layers, Wrench } from 'lucide-react';

const ABOUT_HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Pipes & Fittings',
    description: 'CPVC, UPVC, PVC and related plumbing fittings.',
  },
  {
    icon: Wrench,
    title: 'Valves & Plumbing Hardware',
    description: 'Products for common plumbing requirements.',
  },
  {
    icon: Droplets,
    title: 'Sanitary & Water Solutions',
    description: 'Sanitary products and water tank categories.',
  },
];

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

export default function AboutUs() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column on Desktop (Second on Mobile): Curated Plumbing Products Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 lg:col-span-6 relative isolate pb-2.5 pr-2.5 sm:pb-3.5 sm:pr-3.5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 right-0 bottom-0 sm:top-3.5 sm:left-3.5 rounded-2xl sm:rounded-3xl bg-[#DCEEFF]/60 z-0"
            />
            <div className="relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5EDF5] bg-white shadow-[0_20px_50px_-24px_rgba(18,59,104,0.18)]">
              <img
                src="/images/about-plumbing-products.png"
                alt="Pipes, valves and plumbing fittings representing SAAIKUMAR Valves & Cocks product categories"
                width={1200}
                height={896}
                className="block w-full aspect-[4/3] sm:aspect-[16/10] object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column on Desktop (First on Mobile): Story & Highlights */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some' }}
            className="order-1 lg:order-2 lg:col-span-6"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEEFF]/75 border border-[#C6E2FC] px-3 sm:px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-[#123B68] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
                ABOUT SAAIKUMAR
              </span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeUpVariants}
              className="mt-4 text-[1.625rem] min-[375px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.35rem] font-extrabold tracking-[-0.02em] leading-[1.18] text-[#123B68]"
            >
              Your Local Destination for Plumbing &amp; Sanitary Products
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              className="mt-5 space-y-4 text-[0.9625rem] sm:text-base leading-[1.75] text-[#64748B]"
            >
              <p>
                SAAIKUMAR Valves &amp; Cocks deals in a range of plumbing hardware and
                sanitary products for everyday plumbing requirements. From CPVC, UPVC
                and PVC pipes to valves, fittings, water tanks and sanitary products,
                we bring multiple product categories together in one place.
              </p>
              <p>
                Whether you are looking for products for a home, a construction
                project or a plumbing requirement, our aim is to help you explore
                suitable products for your needs.
              </p>
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#123B68]"
            >
              <span className="h-[2px] w-6 rounded-full bg-[#2785CE] shrink-0" aria-hidden="true" />
              <span>A range of plumbing essentials, all under one roof.</span>
            </motion.p>

            {/* Compact Supporting Highlights */}
            <motion.ul
              variants={contentVariants}
              className="mt-7 pt-6 border-t border-[#E5EDF5] space-y-4"
            >
              {ABOUT_HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.title}
                    variants={fadeUpVariants}
                    className="flex items-start gap-3.5"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F7FF] text-[#2785CE] border border-[#DCEEFF]">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[0.9375rem] font-bold text-[#123B68] leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#64748B]">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
