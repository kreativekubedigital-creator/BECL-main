'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = () => {
  return (
    <motion.footer 
      id="contact" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#050505] border-t border-white/10 pt-32 pb-12 px-8 lg:px-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-6 leading-none">
            Discuss Your Next Large-Scale Project
          </h2>
          <p className="text-white/50 mb-8 max-w-md text-sm leading-relaxed">
            Partner with BECL's engineering experts to bring your architectural vision to life with precision and uncompromising quality.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-colors duration-500 rounded-sm"
          >
            Schedule A Consultation <ArrowRight size={16} />
          </Link>
        </div>
        
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Company</h4>
          <ul className="space-y-4 text-white/50">
            <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About BECL</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Leadership</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Safety Standard</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Careers</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Offices</h4>
          <ul className="space-y-4 text-white/50">
            <li>Abuja, Nigeria</li>
            <li className="mt-8 text-white"><a href="mailto:info@benstruct.com" className="hover:text-[#D4AF37]">info@benstruct.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Benstruct Engineering and Construction Nigerian Limited.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </motion.footer>
  );
};
