import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  {
    id: 'cpvc',
    title: 'CPVC Pipes & Fittings',
    description: 'CPVC piping products and fittings for plumbing applications.',
    image: '/images/category-cpvc.png',
    alt: 'Cream CPVC pipes arranged with matching CPVC elbows, tees, couplers, and threaded connectors',
  },
  {
    id: 'upvc',
    title: 'UPVC Pipes & Fittings',
    description: 'UPVC pipes and fittings for suitable plumbing and piping requirements.',
    image: '/images/category-upvc.png',
    alt: 'Medium-grey UPVC pipes displayed with matching UPVC elbows, bends, tees, reducers, and sockets',
  },
  {
    id: 'pvc',
    title: 'PVC Pipes & Accessories',
    description: 'PVC pipes and related accessories for general piping requirements.',
    image: '/images/category-pvc.png',
    alt: 'White PVC pipes alongside white PVC elbows, tees, reducers, threaded sockets, and end caps',
  },
  {
    id: 'electrical',
    title: 'Electrical Pipes & Accessories',
    description: 'Electrical piping and conduit-related products for suitable installation requirements.',
    image: '/images/category-electrical.png',
    alt: 'PVC electrical conduit pipes with conduit bends, couplers, junction boxes, and saddle clips',
  },
  {
    id: 'sanitary',
    title: 'Sanitaryware & Bathroom Fittings',
    description: 'Sanitary products and bathroom fittings for modern spaces.',
    image: '/images/category-sanitary.png',
    alt: 'Modern white ceramic wash basin with chrome faucet, hand shower fitting, and bathroom accessory',
  },
  {
    id: 'water-tank',
    title: 'Water Tanks',
    description: 'Water tank products for residential and other suitable water-storage needs.',
    image: '/images/category-water-tank.png',
    alt: 'Two vertical ribbed plastic water storage tanks with threaded top lids in light neutral finish',
  },
  {
    id: 'casing-pipes',
    title: 'Casing Pipes',
    description: 'Casing pipe products for suitable borewell and piping applications.',
    image: '/images/category-casing-pipes.png',
    alt: 'Thick-walled blue industrial PVC borewell casing pipes showing open ends, threaded joints, and screen slots',
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProductCategories() {
  const handleEnquireClick = (event) => {
    event.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="scroll-mt-20 bg-[#F0F7FF] border-y border-[#E5EDF5] py-14 sm:py-20 lg:py-24"
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
          <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEEFF] border border-[#C6E2FC] px-3 sm:px-3.5 py-1.5 text-[0.6875rem] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-[#123B68] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
            WHAT WE OFFER
          </span>

          <h2
            id="products-heading"
            className="mt-4 text-[1.625rem] min-[375px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.4rem] font-extrabold tracking-[-0.02em] leading-[1.18] text-[#123B68]"
          >
            Explore Our Product Categories
          </h2>

          <p className="mt-4 text-[0.9625rem] sm:text-base leading-[1.7] text-[#64748B]">
            Discover plumbing, piping and sanitary product categories for a variety of
            residential and commercial requirements.
          </p>
        </motion.div>

        {/* Balanced 7-Card Grid: 4 on Row 1 + 3 Centered on Row 2 (lg+) */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some' }}
          className="mt-11 sm:mt-14 flex flex-wrap justify-center gap-6"
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <motion.a
              key={category.id}
              href="#contact"
              onClick={handleEnquireClick}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] overflow-hidden rounded-2xl border border-[#E5EDF5] bg-white transition-shadow duration-200 hover:border-[#C5DDF3] hover:shadow-[0_18px_38px_-16px_rgba(18,59,104,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE]"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7FBFF] border-b border-[#E5EDF5]">
                <img
                  src={category.image}
                  alt={category.alt}
                  width={800}
                  height={597}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Details */}
              <div className="flex flex-1 flex-col p-4 xl:p-5">
                <h3 className="text-[1.02rem] font-bold leading-snug text-[#123B68] group-hover:text-[#2785CE] transition-colors duration-150">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {category.description}
                </p>

                <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#2785CE]">
                  <span>Enquire about this category</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Compact Category Enquiry CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-14 rounded-2xl border border-[#E5EDF5] bg-white p-5 sm:px-8 sm:py-7 shadow-[0_10px_28px_-18px_rgba(18,59,104,0.14)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          <div className="max-w-xl">
            <h3 className="text-base sm:text-[1.15rem] font-bold text-[#123B68]">
              Looking for a particular plumbing product?
            </h3>
            <p className="mt-1 text-sm sm:text-[0.95rem] text-[#64748B]">
              Get in touch with us to enquire about the product you need.
            </p>
          </div>

          <motion.a
            href="#contact"
            onClick={handleEnquireClick}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
            className="inline-flex min-h-[44px] w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2785CE] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(39,133,206,0.42)] hover:bg-[#1E6EAD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors duration-150"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
