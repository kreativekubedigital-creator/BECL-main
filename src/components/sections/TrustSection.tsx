'use client';

import React from 'react';
import { motion } from 'motion/react';

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "₦1.2B+", label: "Value Engineered" },
  { value: "100%", label: "Compliance Rate" }
];

export const TrustSection = () => {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-8 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#D4AF37]" /> Corporate Authority
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase text-white leading-none mb-6">
              A Legacy of <br className="hidden md:block" /> Uncompromising Quality.
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
              BECL has established itself as the premier engineering and construction partner for high-stakes government, commercial, and luxury residential developments. We don't just build structures; we engineer lasting value.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
