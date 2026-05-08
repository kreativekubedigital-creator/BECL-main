'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent, useSpring } from 'motion/react';

interface ConstructionScrollSequenceProps {
  frameCount?: number;
  imagePrefix?: string;
  imageExtension?: string;
  onStartProjectClick?: () => void;
  onViewProjectsClick?: () => void;
}

export const ConstructionScrollSequence: React.FC<ConstructionScrollSequenceProps> = ({
  frameCount = 53,
  imagePrefix = 'ezgif-frame-',
  imageExtension = '.jpg',
  onStartProjectClick,
  onViewProjectsClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Scroll config
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Optimization: useTransform instead of useState prevents React from re-rendering the entire component 60 times a second during scroll
  const hudElevationText = useTransform(scrollYProgress, (latest) => `+${(latest * 150).toFixed(2)}m`);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);

    const loadImages = async () => {
      const promises = Array.from({ length: frameCount }, (_, i) => {
        const index = i + 1;
        return new Promise<void>((resolve) => {
          const img = new Image();
          const paddedIndex = String(index).padStart(3, '0');
          const rawSrc = `/${imagePrefix}${paddedIndex}${imageExtension}`;
          const src = rawSrc.replace(/\/\//g, '/');
          
          let isResolved = false;
          const safeResolve = () => {
            if (!isResolved) {
              isResolved = true;
              resolve();
            }
          };

          img.onload = () => {
            if (isMounted) {
              loadedImages[i] = img;
              setLoaded((prev) => prev + 1);
            }
            safeResolve();
          };
          img.onerror = () => {
            if (isMounted) {
              setErrorCount((prev) => prev + 1);
            }
            safeResolve();
          };
          
          // Safety fallback: if the image takes longer than 3 seconds, just resolve it
          setTimeout(safeResolve, 3000);

          img.src = src;
        });
      });

      await Promise.all(promises);
      if (isMounted) {
        setImages(loadedImages);
        setLoadingComplete(true);
      }
    };

    loadImages();
    return () => { isMounted = false; };
  }, [frameCount, imagePrefix, imageExtension]);

  useEffect(() => {
    if (!loadingComplete) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastRenderedIndex = -1;

    const renderFrame = (index: number) => {
      if (index === lastRenderedIndex) return;
      
      const ctx = canvas.getContext('2d', { alpha: false }); // Optimization: disable alpha if images are opaque
      if (!ctx || !images[index]) return;

      const img = images[index];

      // Math.max guarantees 'cover' behavior, meaning the image will completely fill the canvas.
      // Therefore, ctx.clearRect and ctx.fillRect are unnecessary and cause performance overhead.
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

      lastRenderedIndex = index;
    };

    // Render initial frame
    renderFrame(Math.floor(frameIndex.get()));

    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastRenderedIndex = -1; // Force re-render
      renderFrame(Math.floor(frameIndex.get()));
    };

    // Initial setup
    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize, { passive: true });

    // Framer motion provides an efficient observer for the scroll value
    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(Math.floor(latest));
    });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      unsubscribe();
    };
  }, [frameIndex, images, loadingComplete]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505] w-full">
      {!loadingComplete && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
          <div className="w-64">
            <h2 className="text-xl font-bold tracking-widest text-[#D4AF37] mb-4 text-center">BECL</h2>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#D4AF37] transition-all duration-300"
                style={{ width: `${((loaded + errorCount) / frameCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute left-0 top-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

        {/* Animated gold progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
          <motion.div 
            className="h-full bg-[#D4AF37]"
            style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
          />
        </div>

        {/* Scroll indicator at bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent"
          />
        </motion.div>

        {/* HUD: Corner decorators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-8 left-8 hidden lg:block pointer-events-none z-50"
        >
          <div className="w-6 h-6 border-t border-l border-[#D4AF37]/40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-8 right-8 hidden lg:block pointer-events-none z-50"
        >
          <div className="w-6 h-6 border-t border-r border-[#D4AF37]/40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-8 hidden lg:block pointer-events-none z-50"
        >
          <div className="w-6 h-6 border-b border-l border-[#D4AF37]/40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 right-8 hidden lg:block pointer-events-none z-50"
        >
          <div className="w-6 h-6 border-b border-r border-[#D4AF37]/40" />
        </motion.div>

        {/* HUD: Elevation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block text-right z-50 pointer-events-none"
        >
          <p className="text-[9px] text-[#D4AF37] uppercase tracking-widest mb-1">Project Elevation</p>
          <motion.p className="text-2xl font-mono text-white/80">{hudElevationText}</motion.p>
        </motion.div>
        
        <ScrollOverlay progress={smoothProgress} range={[0, 0.15]} align="center">
          <div className="flex flex-col items-center text-center px-6 sm:px-8 w-full max-w-5xl mx-auto">
             <motion.h2 
               initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
               className="text-[10px] sm:text-sm text-[#D4AF37]/80 uppercase tracking-[0.2em] sm:tracking-[0.6em] mb-3"
             >
               Engineering Excellence
             </motion.h2>
             <motion.h1 
               initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
               className="text-2xl sm:text-4xl md:text-7xl lg:text-8xl text-white leading-[1.05] uppercase mb-4"
             >
               <span className="font-light whitespace-nowrap">WE ENGINEER</span><br />
               <span className="text-[#D4AF37] font-black">YOUR LEGACY.</span>
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="text-[10px] sm:text-sm text-white/70 uppercase tracking-[0.2em] sm:tracking-[0.4em]"
             >
               Masterful Execution. Uncompromising Quality.
             </motion.p>
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
               className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto w-full sm:w-auto"
             >
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={onStartProjectClick} 
                 className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest cursor-pointer relative overflow-hidden group"
               >
                 <span className="relative z-10">Start Your Project</span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.22,1,0.36,1]" />
               </motion.button>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={onViewProjectsClick} 
                 className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-white/5 hover:border-white transition-colors"
               >
                 View Our Projects
               </motion.button>
             </motion.div>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={smoothProgress} range={[0.2, 0.35]} align="left">
          <div className="max-w-2xl px-5 sm:px-8 md:px-24 lg:px-32 mt-6 sm:mt-12 md:mt-24">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-[1px] w-16 bg-[#D4AF37] mb-6"
            />
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.6em] text-[#D4AF37]/80 mb-3"
            >SITE PREPARATION</motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6 uppercase leading-[1.05]"
            >
              <span className="font-light">LAYING THE</span><br />
              <span className="text-[#D4AF37] font-black">FOUNDATION.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xs sm:text-base md:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-3 sm:pl-6 max-w-md"
            >
              Strategic site preparation and rigorous surveying to establish an unshakable foundation for large-scale development.
            </motion.p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={smoothProgress} range={[0.4, 0.55]} align="left">
          <div className="max-w-2xl px-5 sm:px-8 md:px-24 lg:px-32 mt-6 sm:mt-12 md:mt-24">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-[1px] w-16 bg-[#D4AF37] mb-6"
            />
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.6em] text-[#D4AF37]/80 mb-3"
            >STRUCTURAL EXECUTION</motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6 uppercase leading-[1.05]"
            >
              <span className="font-light">THE FRAMEWORK OF</span><br />
              <span className="text-[#D4AF37] font-black">EXCELLENCE.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xs sm:text-base md:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-3 sm:pl-6 max-w-md"
            >
              High-performance structural engineering, executed with absolute precision and strict adherence to safety standards.
            </motion.p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={smoothProgress} range={[0.6, 0.75]} align="left">
          <div className="max-w-2xl px-5 sm:px-8 md:px-24 lg:px-32 mt-6 sm:mt-12 md:mt-24">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-[1px] w-16 bg-[#D4AF37] mb-6"
            />
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.6em] text-[#D4AF37]/80 mb-3"
            >ASSEMBLY PEAK</motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6 uppercase leading-[1.05]"
            >
              <span className="font-light">ORCHESTRATING</span><br />
              <span className="text-[#D4AF37] font-black">SCALE.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xs sm:text-base md:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-3 sm:pl-6 max-w-md"
            >
              Elite project management and heavy machinery orchestration, transforming complex blueprints into monumental reality.
            </motion.p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={smoothProgress} range={[0.8, 0.9]} align="left">
          <div className="max-w-2xl px-5 sm:px-8 md:px-24 lg:px-32 mt-6 sm:mt-12 md:mt-24">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-[1px] w-16 bg-[#D4AF37] mb-6"
            />
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.6em] text-[#D4AF37]/80 mb-3"
            >FINISHING</motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6 uppercase leading-[1.05]"
            >
              <span className="font-light">ARCHITECTURAL</span><br />
              <span className="text-[#D4AF37] font-black">POLISH.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xs sm:text-base md:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-3 sm:pl-6 max-w-md"
            >
              Meticulous execution of exterior cladding, premium materials, and flawless architectural finishes.
            </motion.p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={smoothProgress} range={[0.95, 1.0]} align="center">
          <div className="flex flex-col items-center text-center px-4 sm:px-8 w-full">
             <motion.div
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               className="h-[1px] w-24 bg-[#D4AF37] mb-6 mx-auto"
             />
             <motion.p
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]/80 mb-4"
             >COMPLETION</motion.p>
             <motion.h2 
               initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
               whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
               className="text-2xl sm:text-4xl md:text-7xl lg:text-8xl text-white leading-[1.05] uppercase mb-4"
             >
               <span className="font-light">VISION.</span><br />
               <span className="text-[#D4AF37] font-black">REALIZED.</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="text-[10px] sm:text-sm text-white/70 uppercase tracking-[0.2em] sm:tracking-[0.4em]"
             >Partner With Engineering Authority.</motion.p>
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
               className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto w-full sm:w-auto justify-center"
             >
               <motion.button 
                 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                 onClick={onStartProjectClick} 
                 className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-white transition-colors text-black text-[10px] font-bold uppercase tracking-widest cursor-pointer"
               >Consult Our Engineers</motion.button>
               <motion.button 
                 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                 onClick={onViewProjectsClick} 
                 className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer"
               >View Architectural Portfolio</motion.button>
             </motion.div>
          </div>
        </ScrollOverlay>
      </div>
    </div>
  );
};

interface ScrollOverlayProps {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
  align?: 'left' | 'center' | 'right';
}

const ScrollOverlay: React.FC<ScrollOverlayProps> = ({ children, progress, range, align = 'center' }) => {
  const start = range[0];
  const end = range[1];
  
  // Framer Motion requires EXACTLY strictly increasing numbers in useTransform arrays.
  // We use exactly 4 points for every sequence to prevent any array-length mismatch crashes.
  
  // Point 0: Just before appearance
  const p0 = start === 0 ? 0 : start - 0.001;
  // Point 1: Exact appearance
  const p1 = start === 0 ? 0.001 : start;
  // Point 2: Start of fade out (5% before end)
  const p2 = Math.max(p1 + 0.001, end - 0.05);
  // Point 3: Exact end of sequence
  const p3 = Math.max(p2 + 0.001, end);

  const opacityRaw = useTransform(
    progress,
    [p0, p1, p2, p3],
    [start === 0 ? 1 : 0, 1, 1, end === 1 ? 1 : 0]
  );
  // Strictly clamp the opacity to prevent browser CSS rejection on extrapolation
  const opacity = useTransform(opacityRaw, (v: number) => Math.max(0, Math.min(1, v)));

  const yRaw = useTransform(
    progress,
    [p0, p1, p2, p3],
    [30, 0, 0, end === 1 ? 0 : -30]
  );
  // Optional clamping if we only want it strictly bounded
  const y = useTransform(yRaw, (v: number) => v); // We let it move freely within bounds

  // Completely disable clicks when invisible so they don't block other elements
  const pointerEvents = useTransform(opacity, (v: number) => v > 0.05 ? "auto" : "none");
  
  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center z-40"
    >
      <div className={`w-full flex ${align === 'center' ? 'justify-center' : align === 'left' ? 'justify-start' : 'justify-end'}`}>
        {children}
      </div>
    </motion.div>
  );
}
