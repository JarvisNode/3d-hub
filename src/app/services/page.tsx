"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Printer, PenTool, FlaskConical, Bot, Swords, Settings, Building2, Sparkles, ChevronRight, Zap } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { icon: Printer, title: "3D Printing Service", desc: "Customers can upload STL, OBJ, or 3MF files and get high-quality custom 3D printed products in different materials, colors, and sizes.", features: ["Fast printing", "Multiple material options", "High precision printing", "Custom sizing", "Bulk orders supported"] },
    { icon: PenTool, title: "Custom 3D Modeling", desc: "Customers can upload photos, sketches, videos, or ideas, and professional 3D models will be created for printing or prototyping.", features: ["Image to 3D model conversion", "Sketch to CAD model", "Product concept design", "STL file creation", "Editable source files"] },
    { icon: FlaskConical, title: "Prototype Development", desc: "Help startups, engineers, and students create functional prototypes for projects and product testing.", features: ["Functional prototypes", "Engineering design support", "Product testing models", "Rapid prototyping", "Mechanical part printing"] },
    { icon: Bot, title: "Robotics Parts Printing", desc: "Custom robotic components and mechanical parts designed and printed for robotics projects and automation systems.", features: ["Servo mounts", "Robot arm parts", "Sensor holders", "Gear systems", "Chassis components"] },
    { icon: Swords, title: "Cosplay & Anime Props", desc: "Create detailed cosplay accessories, anime figures, helmets, masks, and props using high-quality 3D printing.", features: ["Anime figures", "Helmets and masks", "Weapon props", "Armor parts", "Custom painting support"] },
    { icon: Settings, title: "Replacement Parts Manufacturing", desc: "Recreate broken or unavailable plastic parts using custom 3D modeling and printing.", features: ["Reverse engineering", "Custom fitting parts", "Durable materials", "Household replacement parts", "Machine component repair"] },
    { icon: Building2, title: "Architectural & Product Models", desc: "Create realistic miniature architectural designs and product showcase models.", features: ["Building miniatures", "Product display models", "Presentation prototypes", "Detailed scaling", "Professional finishing"] },
    { icon: Sparkles, title: "AI-Assisted Design Support", desc: "Use AI tools to help customers generate ideas, optimize designs, and improve printability.", features: ["AI design suggestions", "Print optimization", "Material recommendations", "Complexity analysis", "Cost estimation"] }
  ];

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden pt-24 pb-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-sm text-primary-neon mb-6"
          >
            <Zap className="w-4 h-4" /> End-to-End Digital Manufacturing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            Transform Ideas <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-secondary-neon">Into Reality</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            From concept sketches to fully finished 3D printed products, we provide complete end-to-end digital manufacturing solutions.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors blur-3xl -z-10" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all z-10 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                <service.icon className="w-8 h-8 text-primary-neon group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 z-10">{service.title}</h3>
              <p className="text-gray-400 text-base mb-8 z-10 flex-1 leading-relaxed">{service.desc}</p>
              
              <div className="bg-black/40 rounded-2xl p-5 mb-8 z-10 border border-white/5 flex-1 shadow-inner backdrop-blur-md">
                <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest text-primary-neon">Key Features</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-sm text-gray-300 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary-neon shrink-0 shadow-[0_0_5px_rgba(56,189,248,0.8)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/upload" className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-primary/10 border border-primary/30 text-sm font-bold text-primary-neon hover:bg-primary hover:text-white transition-all mt-auto z-10 group/btn shadow-[0_0_15px_rgba(14,165,233,0.1)] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]">
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
