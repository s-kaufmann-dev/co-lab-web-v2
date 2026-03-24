import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-white font-mono text-xs uppercase tracking-widest">Loading Digital Organism...</div>}>
          <Spline scene="https://prod.spline.design/6Wq1Q7YAnWfEL7ic/scene.splinecode" />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full px-[5vw] pointer-events-none mt-[-10vh]">
        <div className="overflow-hidden">
          <h1 className="text-[18vw] md:text-[15vw] font-black text-white mix-blend-difference leading-[0.75] tracking-[-0.06em] uppercase">
            Co-Lab<br />Web
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-8 border-l border-white/20 pl-8 mix-blend-difference">
          <p className="text-white text-xl md:text-2xl font-medium leading-none tracking-tighter opacity-80 max-w-xl">
            Pioneering the intersection of <br />
            high-end design & neural automation.
          </p>
          
          <div className="text-right hidden md:block">
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em]">
              / digital-boutique.v2
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-[5vw] flex items-center gap-4 mix-blend-difference opacity-30">
        <div className="w-12 h-[1px] bg-white"></div>
        <span className="text-[0.6rem] uppercase tracking-[0.5em] font-mono text-white">Keep Scrolling</span>
      </div>
    </section>
  );
}
