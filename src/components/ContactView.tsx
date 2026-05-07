import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, Globe, CheckCircle2 } from 'lucide-react';

export const ContactView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Pre-Construction Planning',
    brief: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.brief.trim()) {
      newErrors.brief = 'Project brief is required';
    } else if (formData.brief.length < 20) {
      newErrors.brief = 'Please provide a bit more detail (min 20 chars)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-6 flex items-center gap-4">
            <span className="h-[1px] w-12 bg-[#D4AF37]" /> Global Outreach
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            Connect <br />
            <span className="text-[#D4AF37]">With BECL.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-16"
          >
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Inquiries</h4>
                  <p className="text-xl font-mono text-white tracking-tight">+234 813 977 7344</p>
                  <p className="text-sm text-white/40 mt-1">Available Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Email</h4>
                  <p className="text-xl font-mono text-white tracking-tight">info@benstruct.com</p>
                  <p className="text-sm text-white/40 mt-1">Typical response within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Headquarters</h4>
                  <p className="text-xl font-mono text-white tracking-tight leading-relaxed">
                    Central Business District, Abuja<br />
                    Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Social</span>
                <div className="flex gap-4">
                  {['LinkedIn', 'Instagram', 'Twitter'].map(social => (
                    <a key={social} href="#" className="text-xs text-white/40 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">{social}</a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-[#0a0a0a] border border-white/5 p-6 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Globe size={120} className="text-[#D4AF37]" />
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <CheckCircle2 size={64} className="text-[#D4AF37] mb-6" />
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-4">Message Received</h3>
                  <p className="text-white/50 max-w-xs leading-relaxed">
                    Our engineering board has been notified. An executive consultant will reach out within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-12 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 space-y-8" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-[#050505] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-sm focus:border-[#D4AF37] outline-none transition-colors text-white`} 
                        placeholder="John Doe" 
                      />
                      {errors.name && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#050505] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-sm focus:border-[#D4AF37] outline-none transition-colors text-white`} 
                        placeholder="john@example.com" 
                      />
                      {errors.email && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Service Required</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-sm focus:border-[#D4AF37] outline-none transition-colors text-white/60"
                    >
                      <option>Pre-Construction Planning</option>
                      <option>General Contracting</option>
                      <option>Engineering Consulting</option>
                      <option>Real Estate Investment</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Message</label>
                    <textarea 
                      rows={4} 
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      className={`w-full bg-[#050505] border ${errors.brief ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-sm focus:border-[#D4AF37] outline-none transition-colors text-white`} 
                      placeholder="Tell us about your project..."
                    ></textarea>
                    {errors.brief && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.brief}</p>}
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {isSubmitting ? 'Processing...' : 'Send Message'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
