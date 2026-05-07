import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';

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

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const [hudElevation, setHudElevation] = useState("0.00");

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHudElevation((latest * 150).toFixed(2));
  });

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);

    const loadImages = async () => {
      const promises = Array.from({ length: frameCount }, (_, i) => {
        const index = i + 1;
        return new Promise<void>((resolve) => {
          const img = new Image();
          const paddedIndex = String(index).padStart(3, '0');
          const src = `/${imagePrefix}${paddedIndex}${imageExtension}`;
          
          img.onload = () => {
            if (isMounted) {
              loadedImages[i] = img;
              setLoaded((prev) => prev + 1);
            }
            resolve();
          };
          img.onerror = () => {
            if (isMounted) {
              setErrorCount((prev) => prev + 1);
            }
            resolve();
          };
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

    let animationFrameId: number;
    let lastRenderedIndex = -1;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const currentIndex = Math.floor(frameIndex.get());
      if (currentIndex !== lastRenderedIndex && images[currentIndex]) {
        const img = images[currentIndex];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  
        
        ctx.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

        lastRenderedIndex = currentIndex;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
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
        <canvas ref={canvasRef} className="absolute left-0 top-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 pointer-events-none" />

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block text-right z-50 pointer-events-none">
          <p className="text-[9px] text-[#D4AF37] uppercase tracking-widest mb-1">Project Elevation</p>
          <p className="text-2xl font-mono text-white/80">+{hudElevation}m</p>
        </div>
        
        <ScrollOverlay progress={scrollYProgress} range={[0, 0.15]} align="center">
          <div className="flex flex-col items-center text-center px-4 sm:px-8 w-full">
             <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Building the Future</h2>
             <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-4">
               WE DON'T JUST<br />
               <span className="text-[#D4AF37]">BUILD STRUCTURES.</span>
             </h2>
             <p className="text-sm text-white/70 uppercase tracking-[0.4em]">We Build Legacies.</p>
             <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto w-full sm:w-auto">
               <button onClick={onStartProjectClick} className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest cursor-pointer">Start Your Project</button>
               <button onClick={onViewProjectsClick} className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer">View Our Projects</button>
             </div>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={scrollYProgress} range={[0.2, 0.35]} align="left">
          <div className="max-w-2xl px-6 md:px-16 mt-12 md:mt-24">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">SITE PREPARATION</h2>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              EVERY LANDMARK<br />
              <span className="text-[#D4AF37]">BEGINS WITH VISION.</span>
            </h3>
            <p className="text-base sm:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-4 sm:pl-6 max-w-md">
              Clearing the path for progress. Our site preparation and surveying lay an unshakable foundation.
            </p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={scrollYProgress} range={[0.4, 0.55]} align="left">
          <div className="max-w-2xl px-6 md:px-16 mt-12 md:mt-24">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">STRUCTURAL EXECUTION</h2>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              ENGINEERED WITH<br />
              <span className="text-[#D4AF37]">PRECISION.</span>
            </h3>
            <p className="text-base sm:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-4 sm:pl-6 max-w-md">
              High-performance reinforced concrete structural frames rising with precision engineering.
            </p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={scrollYProgress} range={[0.6, 0.75]} align="left">
          <div className="max-w-2xl px-6 md:px-16 mt-12 md:mt-24">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">ASSEMBLY PEAK</h2>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              FROM BLUEPRINT<br />
              <span className="text-[#D4AF37]">TO REALITY.</span>
            </h3>
            <p className="text-base sm:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-4 sm:pl-6 max-w-md">
              Heavy machinery and master craftsmen breathing life into the structure.
            </p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={scrollYProgress} range={[0.8, 0.9]} align="left">
          <div className="max-w-2xl px-6 md:px-16 mt-12 md:mt-24">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">FINISHING</h2>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              MODERN DESIGN.<br />
              <span className="text-[#D4AF37]">DURABLE EXECUTION.</span>
            </h3>
            <p className="text-base sm:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-4 sm:pl-6 max-w-md">
              Meticulous installation of exterior cladding and premium finishes.
            </p>
          </div>
        </ScrollOverlay>

        <ScrollOverlay progress={scrollYProgress} range={[0.95, 1.0]} align="center">
          <div className="flex flex-col items-center text-center px-4 sm:px-8 w-full">
             <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">COMPLETION</h2>
             <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-4">
               WELCOME TO THE<br />
               <span className="text-[#D4AF37]">FUTURE OF LIVING.</span>
             </h2>
             <p className="text-sm text-white/70 uppercase tracking-[0.4em]">Partner With BECL.</p>
             <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto w-full sm:w-auto">
               <button onClick={onStartProjectClick} className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest cursor-pointer">Start Your Project</button>
               <button onClick={onViewProjectsClick} className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer">View Our Projects</button>
             </div>
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
    [0, 0, 0, end === 1 ? 0 : -30]
  );
  const y = useTransform(yRaw, (v: number) => Math.max(-30, Math.min(0, v)));

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
