'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link 
        href="/#projects" 
        onClick={() => {
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors ${pathname === '/' ? 'text-white opacity-100' : 'opacity-60'}`}
      >
        Projects
      </Link>
      <Link 
        href="/#expertise" 
        onClick={() => {
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors ${pathname === '/' ? 'text-white opacity-100' : 'opacity-60'}`}
      >
        Expertise
      </Link>
      <Link 
        href="/about"
        onClick={() => {
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors uppercase tracking-widest font-semibold text-left ${pathname === '/about' ? 'text-[#D4AF37] opacity-100' : 'opacity-60'}`}
      >
        About Us
      </Link>
      <Link 
        href="/contact"
        onClick={() => {
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors uppercase tracking-widest font-semibold text-left ${pathname === '/contact' ? 'text-[#D4AF37] opacity-100' : 'opacity-60'}`}
      >
        Contact
      </Link>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="flex flex-col cursor-pointer group">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="https://i.postimg.cc/MpL57gpH/beclogo-(1).png" alt="BECL - Premium Engineering & Construction Company" className="h-[22px] w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" referrerPolicy="no-referrer" />
            </motion.div>
            <span className="font-heading text-[22px] font-black tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">BECL</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">Benstruct Engineering</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <nav aria-label="Main Navigation" className="flex gap-6 lg:gap-8 text-[10px] uppercase tracking-widest font-semibold text-white/50 items-center">
            <NavLinks />
          </nav>
          <Link 
            href="/contact" 
            className="hidden lg:flex items-center justify-center px-6 py-3 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm"
          >
            Discuss Your Project
          </Link>
        </div>

        <button 
          className="md:hidden text-white z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050505] z-[55] flex flex-col items-center justify-center p-8 text-center"
          >
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white/50 hover:text-[#D4AF37] transition-colors p-2"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] to-[#050505] -z-10" />
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-12 text-2xl uppercase tracking-[0.2em] font-black italic">
              <NavLinks mobile />
            </nav>
            <div className="mt-24 text-[8px] uppercase tracking-[0.4em] text-white/20">
              © {new Date().getFullYear()} Benstruct Engineering
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
