import { motion } from 'framer-motion';
import { Droplets, Headset, Package, ShieldCheck } from 'lucide-react';

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Trusted Brand Partners',
    description: 'Products from recognised plumbing brands.',
  },
  {
    icon: Package,
    title: 'Wide Product Range',
    description: 'Multiple plumbing and sanitary product categories.',
  },
  {
    icon: Droplets,
    title: 'Plumbing Solutions',
    description: 'Products for residential and commercial needs.',
  },
  {
    icon: Headset,
    title: 'Customer Assistance',
    description: 'Help customers find suitable products.',
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TrustStrip() {
  return (
    <section
      aria-label="Key business highlights"
      className="w-full bg-[#F0F7FF] border-y border-[#E5EDF5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-9 sm:py-11 lg:py-12">
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-8 lg:gap-0 lg:divide-x lg:divide-[#D5E6F7]"
        >
          {TRUST_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="flex items-start gap-4 lg:px-6 first:lg:pl-0 last:lg:pr-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCEEFF] text-[#2785CE] ring-1 ring-[#2785CE]/12">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[0.95rem] font-bold leading-snug text-[#123B68]">
                    {feature.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
