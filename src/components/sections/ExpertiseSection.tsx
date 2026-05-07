'use client';

import React from 'react';
import { motion } from 'motion/react';
import { DraftingCompass, Building2, HardHat } from 'lucide-react';

const COMPETENCIES = [
  { icon: DraftingCompass, title: "Pre-Construction", desc: "Strategic site analysis, rigorous feasibility studies, and comprehensive planning to mitigate risk and maximize value." },
  { icon: Building2, title: "General Contracting", desc: "Flawless large-scale execution, elite subcontractor orchestration, and uncompromising on-site quality control." },
  { icon: HardHat, title: "Structural Engineering", desc: "Advanced structural solutions ensuring absolute durability, paramount safety, and strict regulatory compliance." }
];

export const ExpertiseSection = () => {
  return (
    <motion.section 
      id="expertise" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 md:py-32 px-8 lg:px-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#D4AF37]" /> Core Competencies
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none text-white">Our Expertise</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMPETENCIES.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`group p-8 pt-12 border-t border-white/10 ${i !== 0 ? 'md:border-l' : ''} bg-transparent transition-all duration-300 hover:bg-[#080808] hover:-translate-y-2`}
            >
              <item.icon className="w-12 h-12 text-[#D4AF37] mb-8 stroke-1" />
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
