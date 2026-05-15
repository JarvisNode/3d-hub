"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Clock, Box, Cpu, Upload, MessageCircle, ArrowRight, CheckCircle2, ThumbsUp } from "lucide-react";

const categories = ["All", "Robotics Parts", "Custom 3D Models", "Product Prototypes", "Cosplay Props", "Replacement Parts"];

const projects = [
  {
    id: 1,
    title: "Robotic Arm Components",
    category: "Robotics Parts",
    desc: "Designed and printed lightweight robotic arm joints and servo mounts for a robotics project using PLA material.",
    material: "Tough PLA",
    time: "48 Hours",
    software: "Fusion 360",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Custom Anime Figure",
    category: "Custom 3D Models",
    desc: "Created a highly detailed anime character model from customer reference images and printed it with fine detailing.",
    material: "SLA Resin",
    time: "72 Hours",
    software: "ZBrush",
    image: "https://images.unsplash.com/photo-1606011334315-025e4baab810?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Prototype Product Case",
    category: "Product Prototypes",
    desc: "Designed a custom electronic enclosure prototype for testing and product development.",
    material: "PETG",
    time: "24 Hours",
    software: "SolidWorks",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Replacement Machine Part",
    category: "Replacement Parts",
    desc: "Reverse-engineered and recreated a broken plastic machine component that was unavailable in the market.",
    material: "ABS",
    time: "12 Hours",
    software: "Fusion 360",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Smart Robot Chassis",
    category: "Robotics Parts",
    desc: "Built and printed a modular robot chassis for automation and IoT robotics experiments.",
    material: "Carbon Fiber PETG",
    time: "96 Hours",
    software: "SolidWorks",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
          >
            Our Projects <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-secondary-neon">& Creations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Explore custom 3D models, prototypes, robotics components, cosplay props, and high-quality printed products created for clients and personal projects.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { value: "250+", label: "Prints Completed", icon: Box },
            { value: "120+", label: "Custom Models", icon: Cpu },
            { value: "5000+", label: "Printing Hours", icon: Clock },
            { value: "98%", label: "Client Satisfaction", icon: ThumbsUp },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 text-center rounded-2xl border border-white/5"
            >
              <stat.icon className="w-8 h-8 text-primary-neon mx-auto mb-4" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]" 
                    : "glass text-gray-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-neon transition-colors"
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="glass rounded-3xl border border-white/10 overflow-hidden group hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold text-primary-neon rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-1">{project.desc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xs text-gray-500 mb-1">Material</div>
                      <div className="text-sm text-white font-medium">{project.material}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xs text-gray-500 mb-1">Print Time</div>
                      <div className="text-sm text-white font-medium">{project.time}</div>
                    </div>
                  </div>

                  <Link href="/contact" className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-sm font-bold text-white transition-all group/btn shadow-sm hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary-neon" /> Request Similar Project
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden glass border border-white/10 p-12 text-center max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10 blur-xl" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Have an idea in mind?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Upload your sketch, photo, or concept and turn it into a real 3D printed product today. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/upload" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]">
              <Upload className="w-5 h-5" /> Upload Design
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex items-center justify-center gap-2 glass border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
              <ArrowRight className="w-5 h-5" /> Contact Us
            </Link>
            <a href="https://wa.me/919997392335" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] px-8 py-4 rounded-full font-bold transition-all shadow-lg">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
