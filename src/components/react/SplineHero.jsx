import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ParticleField from './ParticleField';

const orbConfigs = [
  { size: 180, color: 'rgba(0,255,102,0.15)', blur: 80, speed: 0.12, offset: { x: -200, y: -150 } },
  { size: 120, color: 'rgba(0,102,255,0.12)', blur: 60, speed: 0.18, offset: { x: 300, y: -100 } },
  { size: 90, color: 'rgba(255,255,255,0.08)', blur: 50, speed: 0.25, offset: { x: -100, y: 200 } },
  { size: 220, color: 'rgba(0,255,102,0.08)', blur: 100, speed: 0.08, offset: { x: 250, y: 180 } },
  { size: 60, color: 'rgba(0,200,255,0.2)', blur: 30, speed: 0.3, offset: { x: -300, y: 50 } },
  { size: 150, color: 'rgba(0,255,102,0.1)', blur: 70, speed: 0.15, offset: { x: 150, y: -250 } },
];

function FloatingOrb({ config, mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false);
  
  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const unsubX = mouseX.on('change', (latest) => {
      x.set(latest * config.speed + config.offset.x);
    });
    const unsubY = mouseY.on('change', (latest) => {
      y.set(latest * config.speed + config.offset.y);
    });
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, config, x, y]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.6 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className="absolute rounded-full pointer-events-auto cursor-none"
      style={{
        x, y,
        width: config.size,
        height: config.size,
        background: hovered
          ? config.color.replace(/[\d.]+\)$/, '0.5)')
          : config.color,
        mixBlendMode: 'screen',
        filter: `blur(${hovered ? config.blur * 0.5 : config.blur}px)`,
      }}
    />
  );
}

export default function SplineHero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.width / 2);
    mouseY.set(e.clientY - rect.height / 2);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[85vh] md:h-[110vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Shader Background - dots flee cursor */}
      <ParticleField />

      {/* Floating Reactive Orbs */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
        {orbConfigs.map((config, i) => (
          <FloatingOrb key={i} config={config} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full px-[5vw] pointer-events-none mt-[-10vh]">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[15vw] font-black text-white mix-blend-difference leading-[0.75] tracking-[-0.06em] uppercase"
          >
            Co-Lab<br />Web
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mt-8 border-l border-white/20 pl-8 mix-blend-difference"
        >
          <p className="text-white text-xl md:text-2xl font-medium leading-none tracking-tighter opacity-80 max-w-xl">
            Pioneering the intersection of <br />
            high-end design & neural automation.
          </p>

          <div className="text-right hidden md:block">
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em]">
              / digital-boutique.v2
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-[5vw] flex items-center gap-4"
      >
        <motion.div animate={{ width: [48, 24, 48] }} transition={{ duration: 2, repeat: Infinity }} className="h-[1px] bg-white" />
        <span className="text-[0.6rem] uppercase tracking-[0.5em] font-mono text-white">Keep Scrolling</span>
      </motion.div>
    </section>
  );
}
