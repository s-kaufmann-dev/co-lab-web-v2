import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function DesignLandscape() {
  return (
    <section className="relative bg-black border-y border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-[5vw] pt-32 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em] mb-4 block">
              Interactive Experience
            </span>
            <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.8]">
              Design<br />Playground
            </h2>
          </div>
          <p className="text-neutral-500 font-medium text-lg max-w-sm border-l border-white/20 pl-6 pb-2">
            Klicken, Ziehen, Entdecken – interagieren Sie mit unserem digitalen Universum.
          </p>
        </div>
      </div>

      {/* 3D Spline Scene */}
      <div className="relative w-full h-[70vh] md:h-[80vh]">
        <Suspense
          fallback={
            <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-4">
              <motion.div
                className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white font-mono text-xs uppercase tracking-widest"
              >
                Loading 3D Environment...
              </motion.span>
            </div>
          }
        >
          {/* Free abstract/geometric Spline scene */}
          <Spline scene="https://prod.spline.design/hGFnUcNoZ8GYBdkn/scene.splinecode" />
        </Suspense>

        {/* Gradient fades for seamless blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>

      {/* Bottom hint */}
      <div className="px-[5vw] py-8 flex items-center gap-3 relative z-10">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">
          Interaktive 3D-Szene – mit der Maus navigieren
        </span>
      </div>
    </section>
  );
}
