import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../styles/utils";

export const MagneticButton = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <button
        className={cn(
          "relative rounded-full px-8 py-3 font-bold uppercase tracking-tighter transition-all duration-300",
          "bg-white text-black hover:bg-accent hover:text-black border border-white/20",
          "shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)]",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
};

export const Highlighter = ({
  children,
  className
}) => {
  return (
    <span className={cn(
      "relative inline-block group cursor-pointer font-bold",
      "after:content-[''] after:absolute after:bottom-[2px] after:left-0 after:w-0 after:h-[30%] after:bg-accent/30 after:transition-all after:duration-500 hover:after:w-full hover:text-accent transition-colors duration-300",
      className
    )}>
      {children}
    </span>
  );
};

export const GradientButton = MagneticButton; // Aliasing for compatibility if needed
