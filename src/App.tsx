import React, { useState } from 'react';
import { ConstructionScrollSequence } from './components/ConstructionScrollSequence';
import { ContactView } from './components/ContactView';
import { AboutView } from './components/AboutView';
import { ArrowRight, ChevronDown, DraftingCompass, HardHat, Building, Building2, Phone, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'home' | 'about' | 'contact'>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToAnimation = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <a 
        href="#projects" 
        onClick={(e) => {
          if (view !== 'home') {
             setView('home');
             setTimeout(() => {
                const el = document.getElementById('projects');
                el?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
          }
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors ${view === 'home' ? 'text-white opacity-100' : 'opacity-60'}`}
      >
        Projects
      </a>
      <a 
        href="#expertise" 
        onClick={(e) => {
          if (view !== 'home') {
             setView('home');
             setTimeout(() => {
                const el = document.getElementById('expertise');
                el?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
          }
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors ${view === 'home' ? 'text-white opacity-100' : 'opacity-60'}`}
      >
        Expertise
      </a>
      <button 
        onClick={() => {
          setView('about');
          window.scrollTo(0, 0);
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors uppercase tracking-widest font-semibold text-left ${view === 'about' ? 'text-[#D4AF37] opacity-100' : 'opacity-60'}`}
      >
        About Us
      </button>
      <button 
        onClick={() => {
          setView('contact');
          window.scrollTo(0, 0);
          if (mobile) setMenuOpen(false);
        }}
        className={`hover:text-[#D4AF37] transition-colors uppercase tracking-widest font-semibold text-left ${view === 'contact' ? 'text-[#D4AF37] opacity-100' : 'opacity-60'}`}
      >
        Contact
      </button>
    </>
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white/80 selection:bg-[#D4AF37] selection:text-black scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div 
          className="flex flex-col cursor-pointer pointer-events-auto group"
          onClick={() => {
            setView('home');
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
              animate={{ 
                y: [0, -2, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 0.5 }
              }}
            >
              <img src="https://i.postimg.cc/MpL57gpH/beclogo-(1).png" alt="BECL Logo" className="h-[22px] w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" referrerPolicy="no-referrer" />
            </motion.div>
            <span className="font-heading text-[22px] font-black tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">BECL</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">Benstruct Engineering</span>
        </div>
        
        <nav className="hidden md:flex gap-6 lg:gap-8 text-[10px] uppercase tracking-widest font-semibold text-white/50 pointer-events-auto items-center">
          <NavLinks />
        </nav>

        <button 
          className="md:hidden pointer-events-auto text-white z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050505] z-[55] flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Close button inside overlay for better accessibility */}
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white/50 hover:text-[#D4AF37] transition-colors p-2"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] to-[#050505] -z-10" />
            <nav className="flex flex-col gap-12 text-2xl uppercase tracking-[0.2em] font-black italic">
              <NavLinks mobile />
            </nav>
            <div className="mt-24 text-[8px] uppercase tracking-[0.4em] text-white/20">
              © {new Date().getFullYear()} Benstruct Engineering
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Scrollytelling Sequence */}
            <ConstructionScrollSequence 
              frameCount={45} 
              imagePrefix="images/ezgif-frame-" 
              imageExtension=".jpg" 
              onStartProjectClick={() => {
                setView('contact');
                window.scrollTo(0, 0);
              }}
              onViewProjectsClick={() => {
                setView('home');
                setTimeout(() => {
                   const el = document.getElementById('projects');
                   el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />

            {/* Final Sections */}
            <motion.section 
              id="expertise" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
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
                  {[
                    { icon: DraftingCompass, title: "Pre-Construction", desc: "Site analysis, feasibility studies, budgeting, and comprehensive architectural planning." },
                    { icon: Building2, title: "General Contracting", desc: "Large-scale execution, subcontractor management, and strict quality control on site." },
                    { icon: HardHat, title: "Engineering", desc: "Advanced structural engineering ensuring durability, safety, and modern regulatory compliance." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
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

            <motion.section 
              id="projects" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
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
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`group relative ${i === 1 ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/5]'} bg-[#111] overflow-hidden cursor-pointer`}
                    >
                      <div className="absolute inset-0 bg-[#222] transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                         <Building2 className="text-[#333] w-24 h-24" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                         <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-2">Commercial / 2024</p>
                         <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Project Genesis {i}</h3>
                         <div className="h-[2px] w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-700 ease-in-out" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.div>
        ) : view === 'about' ? (
          <motion.div 
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AboutView />
          </motion.div>
        ) : (
          <motion.div 
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (Always Visible) */}
      <motion.footer 
        id="contact" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-[#050505] border-t border-white/10 pt-32 pb-12 px-8 lg:px-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-none">
              READY TO<br/>
              <span className="text-[#D4AF37]">CONSTRUCT</span><br/>
              YOUR LEGACY?
            </h2>
            <p className="text-white/50 max-w-sm mb-12 text-lg">
              Discuss your next large-scale real estate or commercial project with our engineering experts.
            </p>
            <button 
              onClick={() => {
                setView('contact');
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors rounded-none group"
            >
              <Phone size={18} />
              Contact Us Today
            </button>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Company</h4>
            <ul className="space-y-4 text-white/50">
              <li><button onClick={() => setView('about')} className="hover:text-[#D4AF37] transition-colors">About BECL</button></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Leadership</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Safety Standard</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a></li>
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
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
