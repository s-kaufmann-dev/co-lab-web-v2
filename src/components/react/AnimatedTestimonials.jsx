import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Das Design, das Co-Lab-Web für uns realisiert hat, ist schlichtweg atemberaubend. Jedes Detail sitzt, jede Interaktion fühlt sich an wie ein Statement.",
    name: "Sophia Reimann",
    designation: "Creative Director @ Lumina Studio",
  },
  {
    quote: "Unsere Conversion Rate ist seit dem Relaunch um 340% gestiegen. Design ist eben doch mehr als nur hübsche Bilder – es ist Strategie.",
    name: "David Hauser",
    designation: "CEO @ Norden Digital",
  },
  {
    quote: "Von der ersten Skizze bis zum Launch hat Co-Lab-Web uns mit einem visuellen Erlebnis überrascht, das wir so nicht erwartet hätten. Weltklasse.",
    name: "Amelie Brandt",
    designation: "Brand Managerin @ Velvet & Stone",
  },
  {
    quote: "Kein anderes Studio versteht es so gut, brutale Ästhetik mit echter Usability zu verbinden. Unsere Kunden sind begeistert.",
    name: "Konstantin Wolff",
    designation: "Head of Product @ Prism Works",
  },
];

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-32 bg-black px-[5vw] border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-4 mb-8 md:mb-16">
          <span className="text-accent text-sm font-mono uppercase tracking-[0.3em]">What They Say</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
          <div className="flex-1 min-h-[200px] md:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                <Quote className="w-8 h-8 text-accent/30 mb-6" />
                <p className="text-2xl md:text-3xl font-medium leading-snug tracking-tight mb-10 text-white/90">
                  {testimonials[active].quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-accent"></div>
                  <div>
                    <p className="text-accent font-bold text-sm uppercase tracking-wider">{testimonials[active].name}</p>
                    <p className="text-neutral-500 text-xs font-mono mt-1">{testimonials[active].designation}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex flex-row md:flex-col gap-4 items-center">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono text-neutral-500">
              {String(active + 1).padStart(2, '0')}/{String(testimonials.length).padStart(2, '0')}
            </span>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
