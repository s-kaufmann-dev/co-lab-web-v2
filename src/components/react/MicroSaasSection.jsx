import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, BarChart3, Users, Shield, ArrowRight } from "lucide-react";

const products = [
  {
    icon: <BarChart3 className="w-8 h-8" />,
    name: "Analytics Dashboard",
    tagline: "Ihre Daten. Ihre Regeln.",
    features: ["Echtzeit-Metriken", "Custom KPIs", "White-Label ready"],
    color: "#00ff66",
  },
  {
    icon: <Users className="w-8 h-8" />,
    name: "CRM Lite",
    tagline: "Kundenbeziehungen, vereinfacht.",
    features: ["Pipeline-Management", "Auto Follow-Up", "Integration-ready"],
    color: "#0066ff",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    name: "Auth Gateway",
    tagline: "Sicherheit ohne Komplexität.",
    features: ["Multi-Tenant Auth", "Role Management", "SSO Integration"],
    color: "#00ff66",
  },
];

export default function MicroSaasSection() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-32 bg-black px-[5vw] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-accent text-sm font-mono uppercase tracking-[0.3em] mb-4 block">Service // 03</span>
            <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.8]">
              Micro<br/>SaaS
            </h2>
          </div>
          <p className="text-neutral-500 font-medium text-lg max-w-sm border-l border-white/20 pl-6">
            Kleine Tools, großer Impact. Maßgeschneiderte Software-Produkte, die Probleme lösen, bevor sie entstehen.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-8">
          {/* Product selector */}
          <div className="space-y-4">
            {products.map((product, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveProduct(i)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ x: 6 }}
                className={`p-6 border cursor-pointer transition-all duration-300 ${
                  activeProduct === i
                    ? 'bg-white/5 border-accent/30'
                    : 'bg-transparent border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="p-3 rounded-xl transition-colors duration-300"
                    style={{
                      backgroundColor: activeProduct === i ? `${product.color}15` : 'rgba(255,255,255,0.03)',
                      color: activeProduct === i ? product.color : '#666',
                    }}
                  >
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase tracking-tight">{product.name}</h3>
                    <p className="text-neutral-500 text-sm">{product.tagline}</p>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 transition-all duration-300"
                    style={{
                      color: activeProduct === i ? product.color : '#333',
                      transform: activeProduct === i ? 'translateX(0)' : 'translateX(-4px)',
                      opacity: activeProduct === i ? 1 : 0.3,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Product detail preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-neutral-950 border border-white/10 p-10 flex flex-col justify-between min-h-[350px] overflow-hidden"
            >
              {/* Glow effect */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[100px]"
                style={{ backgroundColor: products[activeProduct].color }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Rocket className="w-5 h-5" style={{ color: products[activeProduct].color }} />
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: products[activeProduct].color }}>
                    Ready to Deploy
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                  {products[activeProduct].name}
                </h3>
                <p className="text-neutral-400 text-lg mb-8">
                  {products[activeProduct].tagline}
                </p>

                <div className="space-y-3">
                  {products[activeProduct].features.map((feature, fi) => (
                    <motion.div
                      key={fi}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fi * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: products[activeProduct].color }}
                      />
                      <span className="text-sm text-neutral-300 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/5">
                <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
                  Individuell konfigurierbar • Sofort einsatzbereit
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
