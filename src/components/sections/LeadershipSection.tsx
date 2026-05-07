'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const leaders = [
  {
    name: "Engr. Benjamin Ugbede",
    title: "Founder & Chief Executive Officer",
    bio: "With over 15 years of structural engineering experience, Benjamin has overseen successful project execution across Nigeria.",
  },
  {
    name: "Aisha Bello, PMP",
    title: "Chief Operating Officer",
    bio: "Specializing in large-scale resource allocation and risk management, Aisha ensures that every BECL project is delivered with absolute precision and compliance.",
  },
  {
    name: "Dr. David Chen",
    title: "Head of Infrastructure Design",
    bio: "Former lead architect for global mega-structures, Dr. Chen drives the innovative design philosophies that make BECL projects resilient and iconic.",
  }
];

export const LeadershipSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-6 flex items-center gap-4">
              <span className="h-[1px] w-8 bg-[#D4AF37]" /> The Standard
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1]">
              Engineering Is <br/>
              <span className="text-white/40">Our Foundation.</span> <br/>
              People Are Our <span className="text-[#D4AF37]">Pillars.</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/60 max-w-sm text-sm leading-relaxed border-l border-[#D4AF37]/30 pl-6">
              Our executive board brings together over a century of combined experience in high-stakes civil engineering, architecture, and luxury real estate development.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="w-full aspect-[3/4] bg-[#111] mb-6 relative overflow-hidden flex items-center justify-center border border-white/5 transition-colors duration-500 group-hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <span className="text-white/10 font-heading font-black tracking-widest uppercase text-2xl z-0">
                  BECL
                </span>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-[#D4AF37]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20 flex items-start justify-end p-6">
                  <ArrowUpRight className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h4 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {leader.name}
                </h4>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4 font-semibold">
                  {leader.title}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
