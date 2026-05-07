'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Users, Trophy } from 'lucide-react';
import { LeadershipSection } from './sections/LeadershipSection';

export const AboutView = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-6 flex items-center gap-4">
            <span className="h-[1px] w-12 bg-[#D4AF37]" /> Our Legacy
          </h2>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            About <br />
            <span className="text-[#D4AF37]">BECL.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg text-white/70 leading-relaxed font-medium space-y-6"
          >
            <p>
              Benstruct Engineering and Construction Nigerian Limited (BECL) is a premier engineering firm dedicated to delivering monumental structures that define skylines and empower communities.
            </p>
            <p>
              With decades of collective experience, our team of expert architects, engineers, and master craftsmen bring precision and innovation to every project we undertake. We don't just build buildings; we engineer legacies with an unwavering commitment to quality and safety.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[300px] border border-white/10"
          >
            {/* Placeholder for an image or decorative element */}
            <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-widest text-white/20">Building Excellence</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Target, title: "Precision", desc: "Unyielding accuracy in every blueprint and execution." },
            { icon: Shield, title: "Safety", desc: "Rigorous standards ensuring zero-compromise environments." },
            { icon: Users, title: "Partnership", desc: "Collaborative approaches with clients and communities." },
            { icon: Trophy, title: "Excellence", desc: "Award-winning structures built to stand the test of time." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-white/5 bg-[#0a0a0a] hover:border-[#D4AF37]/30 transition-colors group"
            >
              <item.icon className="w-10 h-10 text-[#D4AF37] mb-6 stroke-[1.5] group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <LeadershipSection />
    </div>
  );
};
