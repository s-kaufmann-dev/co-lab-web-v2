import React, { useState } from "react";
import { motion } from "framer-motion";
import { Workflow, Repeat, BrainCircuit, Gauge, MousePointerClick } from "lucide-react";

const automations = [
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Workflow Automation",
    desc: "Repetitive Prozesse eliminieren. Von der Lead-Erfassung bis zum Follow-Up – alles läuft automatisch.",
    detail: "Zapier, Make, Custom APIs – wir verbinden Ihre Tools zu einem nahtlosen Ökosystem.",
  },
  {
    icon: <Repeat className="w-6 h-6" />,
    title: "Content Pipelines",
    desc: "Blog, Social Media, Newsletter – alles aus einer Quelle, automatisch verteilt und optimiert.",
    detail: "Headless CMS → AI-Aufbereitung → Multi-Channel Distribution in Sekunden.",
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "AI-gestützte Analyse",
    desc: "Ihre Daten erzählen Geschichten. Wir bauen die Dashboards, die sie sichtbar machen.",
    detail: "Echtzeit-Insights, Anomalie-Erkennung und predictive Analytics für Ihr Business.",
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Performance Monitoring",
    desc: "Uptime, Speed, Conversion – alles in einem Dashboard, das sich selbst optimiert.",
    detail: "Automatische Alerts, A/B-Tests und kontinuierliche Performance-Verbesserung.",
  },
];

export default function AutomationSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-32 bg-black px-[5vw] relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em] mb-4 block">Service // 02</span>
            <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.8]">
              Intelligente<br/>Automation
            </h2>
          </div>
          <p className="text-neutral-500 font-medium text-lg max-w-sm border-l border-white/20 pl-6">
            Wir automatisieren die Prozesse, die Sie bremsen – damit Sie sich auf das konzentrieren, was zählt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {automations.map((item, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-neutral-950 border border-white/5 hover:border-accent/30 p-8 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/5 group-hover:bg-accent/20 transition-colors duration-300 rounded-xl text-neutral-400 group-hover:text-accent">
                    {item.icon}
                  </div>
                  <MousePointerClick className="w-4 h-4 text-neutral-700 group-hover:text-accent transition-colors" />
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">{item.desc}</p>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: hoveredIdx === i ? 'auto' : 0, opacity: hoveredIdx === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-accent/80 text-xs font-mono leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
