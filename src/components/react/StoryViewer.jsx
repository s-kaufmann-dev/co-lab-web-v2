import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Palette, Zap, Code2, Layers } from "lucide-react";

const stories = [
  {
    id: 0,
    icon: <Palette className="w-5 h-5" />,
    label: "Design Maxime",
    title: "Form folgt Provokation",
    content: "Wir glauben, dass gutes Design unbequem sein darf. Unsere Arbeit lebt von mutigen Kontrasten, typografischer Kraft und der bewussten Entscheidung gegen den Mainstream. Jedes Pixel ist ein Statement.",
    accent: "#00ff66"
  },
  {
    id: 1,
    icon: <Code2 className="w-5 h-5" />,
    label: "Technologie",
    title: "Code als Kunstform",
    content: "Unter der Oberfläche steckt performanter, sauberer Code. Wir nutzen die neuesten Frameworks – Astro, React, Three.js – nicht als Selbstzweck, sondern als Werkzeug für Erlebnisse, die im Gedächtnis bleiben.",
    accent: "#0066ff"
  },
  {
    id: 2,
    icon: <Layers className="w-5 h-5" />,
    label: "Prozess",
    title: "Kollaboration, nicht Dienstleistung",
    content: "Co-Lab-Web steht für echte Zusammenarbeit. Wir arbeiten nicht für, sondern mit unseren Partnern. Vom ersten Mood Board bis zur finalen Animation – jeder Schritt ist transparent und gemeinsam gestaltet.",
    accent: "#00ff66"
  },
  {
    id: 3,
    icon: <Zap className="w-5 h-5" />,
    label: "Vision",
    title: "Die Zukunft ist interaktiv",
    content: "Statische Websites gehören der Vergangenheit an. Wir schaffen digitale Erlebnisse mit 3D-Elementen, Shader-Animationen und Micro-Interactions, die Besucher in den Bann ziehen und Marken unvergesslich machen.",
    accent: "#0066ff"
  },
];

export default function StoryViewer() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="py-32 bg-black px-[5vw] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-accent text-sm font-mono uppercase tracking-[0.3em] mb-4 block">Inside Co-Lab-Web</span>
          <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.8]">
            Unsere<br/>DNA
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Interactive Desktop / Navigation */}
          <div className="relative">
            <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
              {/* "Monitor" top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-[0.6rem] font-mono text-neutral-500 uppercase tracking-widest">co-lab-web://stories</span>
              </div>

              {/* Story buttons */}
              <div className="p-4 space-y-2">
                {stories.map((story) => (
                  <motion.button
                    key={story.id}
                    onClick={() => setActiveStory(story.id)}
                    whileHover={{ x: 8 }}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                      activeStory === story.id
                        ? 'bg-white/10 border border-accent/30'
                        : 'bg-transparent border border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeStory === story.id ? 'bg-accent/20 text-accent' : 'bg-white/5 text-neutral-500'} transition-colors`}>
                      {story.icon}
                    </div>
                    <div>
                      <span className="text-[0.6rem] uppercase tracking-widest font-mono text-neutral-500 block">{story.label}</span>
                      <span className={`text-sm font-bold uppercase tracking-tight ${activeStory === story.id ? 'text-white' : 'text-neutral-400'} transition-colors`}>
                        {story.title}
                      </span>
                    </div>
                    {activeStory === story.id && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-2 h-2 rounded-full bg-accent"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Decorative "stand" */}
            <div className="hidden md:block mx-auto w-20 h-6 bg-neutral-800 rounded-b-xl" />
            <div className="hidden md:block mx-auto w-32 h-2 bg-neutral-800 rounded-b-lg" />
          </div>

          {/* Story content display */}
          <div className="min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-[2px]" style={{ backgroundColor: stories[activeStory].accent }} />
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: stories[activeStory].accent }}>
                    {stories[activeStory].label}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                  {stories[activeStory].title}
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed max-w-lg">
                  {stories[activeStory].content}
                </p>
                <div className="flex gap-2 pt-4">
                  {stories.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 rounded-full cursor-pointer"
                      animate={{
                        width: i === activeStory ? 40 : 12,
                        backgroundColor: i === activeStory ? stories[activeStory].accent : '#333',
                      }}
                      onClick={() => setActiveStory(i)}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
