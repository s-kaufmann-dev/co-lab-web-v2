import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../styles/utils";

// ─── Gradient Glow Button ───────────────────────────────────────
export const GradientGlowButton = ({
  children,
  className,
  ...props
}) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-4 font-bold uppercase tracking-tighter text-sm",
        "bg-black border border-white/20 text-white",
        "transition-shadow duration-500",
        isHovered && "shadow-[0_0_40px_rgba(0,255,102,0.4)] border-accent/50",
        className
      )}
      {...props}
    >
      {/* Animated gradient glow that follows cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(0,255,102,0.3), transparent 70%)`,
        }}
      />
      {/* Rotating gradient border effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
            className="absolute inset-[-2px] rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, #00ff66, #0066ff, #00ff66)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '2px',
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// ─── Particle Highlighter ───────────────────────────────────────
export const Highlighter = ({ children, className }) => {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  const spawnParticles = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        size: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.5 ? '#00ff66' : '#ffffff',
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    if (!isHovered || !canvasRef.current || !ref.current) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = ref.current.getBoundingClientRect();
    canvas.width = rect.width + 40;
    canvas.height = rect.height + 40;

    spawnParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + 20, p.y + 20, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (particlesRef.current.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animate();

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isHovered, spawnParticles]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative inline-block cursor-pointer group", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute -top-5 -left-5 pointer-events-none z-10"
        style={{ width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}
      />
      <motion.span
        className="relative z-0 font-bold"
        animate={{
          color: isHovered ? '#00ff66' : '#ffffff',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 h-[30%] bg-accent/20 z-0"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: 'circOut' }}
      />
    </span>
  );
};

// Backward compat aliases
export const MagneticButton = GradientGlowButton;
export const GradientButton = GradientGlowButton;
