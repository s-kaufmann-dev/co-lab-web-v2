import React from "react";
import { cn } from "../../styles/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  category
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="text-[0.6rem] uppercase tracking-widest text-accent mb-2 font-mono">
          {category}
        </div>
        <div className="font-bold text-white mb-2 mt-2 text-xl leading-none tracking-tighter uppercase">
          {title}
        </div>
        <div className="font-normal text-neutral-400 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

const items = [
  {
    title: "Neural Synergy",
    description: "AI-Driven E-Commerce Ecosystem",
    category: "Automation",
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-black overflow-hidden relative border border-white/5">
      <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop" className="object-cover w-full h-full opacity-40 group-hover/bento:scale-110 transition-transform duration-700" />
    </div>,
  },
  {
    title: "Onyx Framework",
    description: "Next-Gen Design System",
    category: "Architecture",
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-black overflow-hidden relative border border-white/5">
      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className="object-cover w-full h-full opacity-40 group-hover/bento:scale-110 transition-transform duration-700" />
    </div>,
  },
  {
    title: "Aureus Labs",
    description: "Financial Intelligence Platform",
    category: "SaaS",
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-black overflow-hidden relative border border-white/5">
       <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop" className="object-cover w-full h-full opacity-40 group-hover/bento:scale-110 transition-transform duration-700" />
    </div>,
  },
  {
    title: "Vibe Engine",
    description: "Generative Motion Systems",
    category: "Creative Code",
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-black overflow-hidden relative border border-white/5">
      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="object-cover w-full h-full opacity-40 group-hover/bento:scale-110 transition-transform duration-700" />
    </div>,
  },
];

export default function BentoPortfolio() {
  return (
    <div className="py-32 bg-black px-[5vw]">
       <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em] mb-4 block">Selected Works</span>
            <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8]">
              Case<br/>Studies
            </h2>
          </div>
          <p className="text-neutral-500 font-medium text-lg max-w-sm border-l border-white/20 pl-6">
            Exploring the boundaries of digital craft through strategic precision and technical mastery.
          </p>
       </div>
      <BentoGrid className="max-w-none">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn(item.className, "rounded-none border-white/10 hover:border-accent/50")}
            category={item.category}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
