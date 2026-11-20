import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building2, MessageCircle, Package } from 'lucide-react';

const BENEFITS = [
  {
    icon: Package,
    title: 'A Wide Product Range',
    description:
      'Explore different product categories, including CPVC, UPVC, PVC, electrical, sanitary, water tank and casing pipe products.',
  },
  {
    icon: BadgeCheck,
    title: 'Recognised Brand Names',
    description:
      'Explore products associated with recognised brand names featured in our brand selection.',
  },
  {
    icon: Building2,
    title: 'For Different Requirements',
    description:
      'Find product categories suited to a variety of home, building and plumbing requirements.',
  },
  {
    icon: MessageCircle,
    title: 'Helpful Customer Assistance',
    description:
      'Have a product enquiry? Get in touch with our team or visit the store to discuss your requirements.',
  },
];

const containerVariants = {
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
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyChooseUs() {
  const handleContactScroll = (event) => {
    event.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="scroll-mt-20 bg-[#F0F7FF] border-y border-[#E5EDF5] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 xl:gap-14 items-start lg:items-center">
          {/* Left Column: Core Positioning & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some' }}
            className="lg:col-span-5"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEEFF] border border-[#C6E2FC] px-3 sm:px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-[#123B68] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
                WHY SAAIKUMAR
              </span>
            </motion.div>

            <motion.h2
              id="why-choose-us-heading"
              variants={fadeUpVariants}
              className="mt-4 text-[1.625rem] min-[375px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.35rem] font-extrabold tracking-[-0.02em] leading-[1.18] text-[#123B68]"
            >
              The Right Products for Your Plumbing Needs
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              className="mt-5 space-y-4 text-[0.9625rem] sm:text-base leading-[1.75] text-[#64748B]"
            >
              <p>
                From pipes and fittings to valves, water tanks and sanitary
                products, SAAIKUMAR Valves &amp; Cocks brings a range of
                plumbing-related product categories together in one place.
              </p>
              <p>
                Our team can help you enquire about products suited to your
                requirements.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-7">
              <motion.a
                href="#contact"
                onClick={handleContactScroll}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.16 }}
                className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-6 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(39,133,206,0.45)] hover:bg-[#1E6EAD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors duration-150"
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="mt-6 pt-5 border-t border-[#DCEEFF] flex items-start gap-3"
            >
              <span
                className="mt-2.5 h-[2px] w-6 rounded-full bg-[#2785CE] shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-[#64748B]">
                Need help finding a product? Get in touch or visit our store to
                enquire.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Balanced 2x2 Benefit Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUpVariants}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col rounded-2xl border border-[#E5EDF5] bg-white p-6 transition-shadow duration-200 hover:border-[#C5DDF3] hover:shadow-[0_16px_36px_-18px_rgba(18,59,104,0.16)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCEEFF] text-[#2785CE] transition-colors duration-200 group-hover:bg-[#2785CE] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-[1.02rem] font-bold leading-snug text-[#123B68]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
