import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Co-Lab-Web hat unsere digitale Präsenz auf ein völlig neues Level gehoben. Das Design ist mutig und die Performance unschlagbar.",
    name: "Jan Müller",
    designation: "CTO @ Phase Null",
  },
  {
    quote: "Die individuelle Automation, die für uns entwickelt wurde, spart uns wöchentlich über 20 Stunden Arbeit. Absolute Empfehlung!",
    name: "Elena Schmidt",
    designation: "Gründerin @ Terra Mud",
  },
  {
    quote: "Ein Partner, der Design und Technik gleichermaßen beherrscht. Unsere Micro SaaS Lösung läuft absolut reibungslos.",
    name: "Marcus Wagner",
    designation: "Product Lead @ XOLOG",
  },
];

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-black px-[5vw]">
       <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1">
                <AnimatePresence mode="wait">
                   <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                   >
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8">
                        "{testimonials[active].quote}"
                      </h3>
                      <div>
                         <p className="text-accent font-bold uppercase">{testimonials[active].name}</p>
                         <p className="text-neutral-500 text-sm font-mono">{testimonials[active].designation}</p>
                      </div>
                   </motion.div>
                </AnimatePresence>
             </div>
             
             <div className="flex gap-4">
                <button 
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronLeft />
                </button>
                <button 
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronRight />
                </button>
             </div>
          </div>
       </div>
    </section>
  );
}
