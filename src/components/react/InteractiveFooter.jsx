import React, { Suspense, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function ScrambleText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2;
    }, 40);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {displayText}
    </span>
  );
}

export default function InteractiveFooter() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.05);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.05);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full bg-black overflow-hidden"
    >
      {/* Interactive 3D Scene */}
      <div className="relative h-[60vh] w-full">
        <Suspense
          fallback={
            <div className="w-full h-full bg-black flex items-center justify-center">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white font-mono text-xs uppercase tracking-widest"
              >
                Initializing 3D Environment...
              </motion.span>
            </div>
          }
        >
          <Spline scene="https://prod.spline.design/PyzDhUBmiLZqxpGR/scene.splinecode" />
        </Suspense>

        {/* Overlay text that reacts to mouse */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-difference"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-[8vw] md:text-[5vw] font-black uppercase tracking-[-0.06em] leading-[0.85] text-center"
          >
            Let's Build<br />
            Something
          </motion.p>
        </motion.div>
      </div>

      {/* Interactive scramble stats */}
      <div className="border-t border-white/10 py-12 px-[5vw]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Projects Delivered", value: "47+" },
            { label: "Lines of Code", value: "2.4M" },
            { label: "Automation Hours Saved", value: "12K" },
            { label: "Client Retention", value: "96%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <ScrambleText
                text={stat.value}
                className="text-4xl md:text-5xl font-black text-accent uppercase tracking-tighter block mb-2"
              />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
