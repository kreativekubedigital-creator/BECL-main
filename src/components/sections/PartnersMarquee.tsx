'use client';

import React from 'react';
import { motion } from 'motion/react';

const partners = [
  "APEX DEVELOPMENT",
  "NEXUS ARCHITECTS",
  "PRIME INFRASTRUCTURE",
  "MINISTRY OF WORKS",
  "GLOBAL REAL ESTATE",
  "ELEVATE HOLDINGS",
  "STEEL & STONE CO.",
  "VISIONARY ESTATES"
];

export const PartnersMarquee = () => {
  // We duplicate the array to create a seamless infinite loop
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="py-16 md:py-24 bg-[#050505] overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 text-center">
          Trusted By Industry Leaders
        </p>
      </div>
      
      <div className="relative flex w-full overflow-hidden">
        {/* Left/Right Gradient Masks for smooth fading edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {marqueeItems.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center px-12 md:px-20"
            >
              <span className="text-xl md:text-2xl font-heading font-black text-white/20 uppercase tracking-widest hover:text-[#D4AF37]/50 transition-colors duration-500 cursor-default">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
