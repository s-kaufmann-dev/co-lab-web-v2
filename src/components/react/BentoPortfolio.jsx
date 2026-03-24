import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../styles/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, header, category }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "row-span-1 group/bento hover:shadow-2xl transition-all duration-500 p-5 bg-neutral-950 border border-white/[0.06] hover:border-accent/40 justify-between flex flex-col space-y-4 cursor-pointer overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300 relative z-10">
        <div className="text-[0.6rem] uppercase tracking-widest text-accent mb-2 font-mono">
          {category}
        </div>
        <div className="font-black text-white mb-2 mt-2 text-xl leading-none tracking-tighter uppercase">
          {title}
        </div>
        <div className="font-normal text-neutral-500 text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const items = [
  {
    title: "Velvet & Stone",
    description: "Luxuriöse Markenidentität mit handgefertigter Typografie und immersiven Scroll-Erlebnissen.",
    category: "Brand Design",
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-900 overflow-hidden relative">
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop" className="object-cover w-full h-full opacity-30 group-hover/bento:scale-105 group-hover/bento:opacity-50 transition-all duration-700" />
    </div>,
  },
  {
    title: "Prism Works",
    description: "Minimalistisches Produktdesign mit mutigen Kontrasten und interaktiven 3D-Elementen.",
    category: "Web Design",
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-900 overflow-hidden relative">
      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className="object-cover w-full h-full opacity-30 group-hover/bento:scale-105 group-hover/bento:opacity-50 transition-all duration-700" />
    </div>,
  },
  {
    title: "Lumina Studio",
    description: "Ganzheitliche Digitalstrategie – vom Mood Board bis zur fertigen Premium-Website.",
    category: "Creative Direction",
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-900 overflow-hidden relative">
       <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop" className="object-cover w-full h-full opacity-30 group-hover/bento:scale-105 group-hover/bento:opacity-50 transition-all duration-700" />
    </div>,
  },
  {
    title: "Norden Digital",
    description: "Brutalistisches Redesign mit animierten Übergängen, Custom Cursor und Micro-Interactions.",
    category: "Visual Identity",
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-900 overflow-hidden relative">
      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="object-cover w-full h-full opacity-30 group-hover/bento:scale-105 group-hover/bento:opacity-50 transition-all duration-700" />
    </div>,
  },
];

export default function BentoPortfolio() {
  return (
    <div className="py-16 md:py-32 bg-black px-[5vw]">
       <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-24 gap-8">
          <div>
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em] mb-4 block">Selected Works</span>
            <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8]">
              Design<br/>Portfolio
            </h2>
          </div>
          <p className="text-neutral-500 font-medium text-lg max-w-sm border-l border-white/20 pl-6">
            Jedes Projekt ist ein visuelles Statement – von der Typografie bis zur letzten Micro-Animation.
          </p>
       </div>
      <BentoGrid className="max-w-none">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            category={item.category}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
