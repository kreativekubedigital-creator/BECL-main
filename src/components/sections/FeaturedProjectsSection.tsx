'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2 } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: "Project Genesis 1", type: "Commercial", year: "2024" },
  { id: 2, title: "Project Genesis 2", type: "Commercial", year: "2024" },
  { id: 3, title: "Project Genesis 3", type: "Commercial", year: "2024" }
];

export const FeaturedProjectsSection = () => {
  return (
    <motion.section 
      id="projects" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 md:py-32 px-8 lg:px-24 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4 flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[#D4AF37]" /> Architectural Impact
              </h2>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none text-white">Featured Projects</h3>
            </div>
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-[#D4AF37] transition-colors group">
              View All Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${i === 0 ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/5]'} bg-[#111] overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 bg-[#222] transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                  <Building2 className="text-[#333] w-24 h-24" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                  <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-2">{project.type} / {project.year}</p>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">{project.title}</h3>
                  <div className="h-[2px] w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
