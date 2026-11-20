import { useState } from 'react';
import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'Ashirvad by Aliaxis', logo: '/images/brands/ashirvad.png' },
  { name: 'Toy', logo: null },
  { name: 'Trubore', logo: '/images/brands/trubore.png' },
  { name: 'Watertec', logo: '/images/brands/watertec.svg' },
  { name: 'Onida Ibibo', logo: '/images/brands/onida-ibibo.png' },
  { name: 'Leo', logo: '/images/brands/leo.png' },
  { name: 'L&K Supremo', logo: '/images/brands/lk-supremo.png' },
  { name: 'Ideal', logo: '/images/brands/ideal.svg' },
  { name: 'HP Adhesives', logo: '/images/brands/hp-adhesives.png' },
  { name: 'Jindal Vignec', logo: '/images/brands/jindal-vignec.svg' },
  { name: 'Somany', logo: '/images/brands/somany.svg' },
  { name: 'Anchor', logo: '/images/brands/anchor.svg' },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function OurBrands() {
  const [failedLogos, setFailedLogos] = useState({});

  const handleLogoError = (brandName) => {
    setFailedLogos((prev) => ({ ...prev, [brandName]: true }));
  };

  return (
    <section
      id="brands"
      aria-labelledby="brands-heading"
      className="scroll-mt-20 bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-left sm:text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEEFF]/75 border border-[#C6E2FC] px-3 sm:px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-[#123B68] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
            OUR BRAND RANGE
          </span>

          <h2
            id="brands-heading"
            className="mt-4 text-[1.625rem] min-[375px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.4rem] font-extrabold tracking-[-0.02em] leading-[1.18] text-[#123B68]"
          >
            Brands We Deal In
          </h2>

          <p className="mt-4 text-[0.9625rem] sm:text-base leading-[1.7] text-[#64748B]">
            We feature products from recognised names across plumbing, piping,
            sanitary and related product categories.
          </p>
        </motion.div>

        {/* Brand Grid: 4x3 Desktop, 3x4 Tablet, 2x6 Mobile */}
        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some' }}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5"
        >
          {BRANDS.map((brand) => {
            const showLogo = Boolean(brand.logo && !failedLogos[brand.name]);

            return (
              <motion.li
                key={brand.name}
                variants={tileVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                className="group flex h-[92px] sm:h-[110px] items-center justify-center rounded-xl border border-[#E5EDF5] bg-white p-3.5 sm:p-5 transition-all duration-200 hover:border-[#C5DDF3] hover:shadow-[0_12px_28px_-16px_rgba(18,59,104,0.16)]"
              >
                {showLogo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                    onError={() => handleLogoError(brand.name)}
                    className="max-h-10 sm:max-h-12 max-w-[130px] sm:max-w-[155px] w-auto h-auto object-contain select-none transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="font-display text-[0.95rem] sm:text-[1.05rem] font-extrabold tracking-[0.03em] text-[#123B68] leading-tight">
                      {brand.name}
                    </span>
                    <span className="mt-0.5 text-[0.6875rem] font-medium tracking-wider uppercase text-[#64748B]">
                      Plumbing
                    </span>
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
