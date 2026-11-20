import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const handleSmoothScroll = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Layer 1: Full-width commercial product background photography */}
      <img
        src="/images/hero-plumbing-products.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[right_25%_center]"
      />

      {/* Layer 2: Premium translucent light overlay ensuring high text readability & contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white/98 via-white/94 to-white/70 sm:from-white/97 sm:via-white/90 sm:to-white/60 lg:from-white/98 lg:via-white/92 lg:to-white/50 backdrop-blur-[1px]"
      />

      {/* Subtle ice-blue ambient tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#F0F7FF]/35 mix-blend-multiply"
      />

      {/* Layer 3: Hero Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 xl:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/90 border border-[#C6E2FC] px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.08em] sm:tracking-[0.12em] text-[#123B68] uppercase shadow-[0_2px_8px_rgba(18,59,104,0.06)] backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE] shrink-0" aria-hidden="true" />
              <span>PLUMBING &amp; SANITARY SOLUTIONS</span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            variants={fadeUpVariants}
            className="mt-5 text-[2.1rem] min-[375px]:text-[2.35rem] sm:text-[2.85rem] md:text-[3.25rem] lg:text-[3.65rem] font-extrabold tracking-[-0.03em] leading-[1.12] text-[#123B68]"
          >
            Everything You Need for{' '}
            <span className="text-[#2785CE]">Reliable Plumbing Solutions.</span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-5 text-[1rem] sm:text-[1.125rem] leading-[1.75] text-[#263746]/85 max-w-[580px] font-normal"
          >
            Explore a wide range of quality pipes, valves, fittings, water tanks
            and sanitary products from trusted brands, all under one roof.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5"
          >
            <motion.a
              href="#products"
              onClick={(e) => handleSmoothScroll(e, '#products')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.16 }}
              className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_24px_-6px_rgba(39,133,206,0.5)] hover:bg-[#1E6EAD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors duration-150"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.16 }}
              className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-xl border border-[#CBDCEB] bg-white/95 px-7 py-3.5 text-[0.95rem] font-semibold text-[#123B68] shadow-[0_2px_8px_rgba(18,59,104,0.06)] hover:border-[#2785CE] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors duration-150"
            >
              Contact Us
            </motion.a>
          </motion.div>

          {/* Supporting Line */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 pt-6 border-t border-[#123B68]/15 flex items-center gap-3 max-w-[500px]"
          >
            <span className="h-[2px] w-6 rounded-full bg-[#2785CE] shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#123B68]/80">
              Your destination for pipes, valves and sanitary products.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
