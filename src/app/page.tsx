"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Upload, Box, Star, MessageCircle } from "lucide-react";
import ThreeDModel from "@/components/ThreeDModel";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          className="flex-1 space-y-8 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-sm text-primary-neon mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen 3D Printing & Modeling
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Bring Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-secondary-neon">
              Imagination
            </span>
            <br />To Reality
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl">
            Upload your STL files for instant printing, or request custom 3D models from our expert engineers. High precision, fast delivery, premium quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/upload" className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]">
              <Upload className="w-5 h-5" />
              Upload STL File
            </Link>
            <Link href="/services" className="flex items-center justify-center gap-2 glass hover:bg-white/5 border border-white/10 px-8 py-4 rounded-full font-medium text-white transition-all">
              Explore Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 w-full relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[100px] -z-10 rounded-full" />
          <ThreeDModel />
        </motion.div>
      </section>


      {/* "How It Works" Section */}
      <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Simple Process. <br/><span className="text-primary-neon">Exceptional Results.</span></h2>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Upload or Request", desc: "Drop your STL file or submit sketches for a custom design." },
                  { step: "02", title: "Instant Quote", desc: "Select material, infill, and color to get an immediate price." },
                  { step: "03", title: "Print & Deliver", desc: "We manufacture it using top-tier machines and ship it right to you." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-2xl font-bold text-white/20">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="glass aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
                <div className="z-10 text-center space-y-4">
                  <Upload className="w-16 h-16 text-primary-neon mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white">Ready to print?</h3>
                  <p className="text-gray-400">Drag & drop your files here</p>
                  <Link href="/upload" className="inline-block mt-4 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Browse Files
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="w-full relative py-24 bg-black/40 border-t border-white/5 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full order-2 lg:order-1">
              <div className="glass rounded-3xl border border-white/10 p-6 md:p-8 relative">
                <div className="flex flex-col gap-4">
                  <div className="self-end glass border border-white/10 text-white p-4 rounded-2xl rounded-br-sm max-w-[80%] text-sm">
                    नमस्ते, मुझे एक रोबोटिक आर्म प्रिंट करना है पर मेरे पास STL फाइल नहीं है।
                  </div>
                  <div className="self-start bg-primary text-white p-4 rounded-2xl rounded-bl-sm max-w-[80%] text-sm">
                    नमस्ते! कोई बात नहीं। आप फोटो या स्केच अपलोड कर सकते हैं, हमारी टीम आपके लिए 3D मॉडल बना देगी। क्या आप इसकी डायमेंशन बता सकते हैं?
                  </div>
                  <div className="self-end glass border border-white/10 text-white p-4 rounded-2xl rounded-br-sm max-w-[80%] text-sm">
                    हाँ, यह लगभग 15cm का होगा। कौन सा मटेरियल बेस्ट रहेगा?
                  </div>
                  <div className="self-start bg-primary text-white p-4 rounded-2xl rounded-bl-sm max-w-[80%] text-sm">
                    रोबोटिक पार्ट्स के लिए **PETG** सबसे अच्छा है क्योंकि यह काफी मजबूत और टिकाऊ होता है।
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-sm text-primary-neon mb-2">
                <Box className="w-4 h-4" /> Futuristic AI Assistant
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Meet Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-secondary-neon">AI 3D Printing Assistant.</span>
              </h2>
              <p className="text-xl text-gray-400">
                Upload your idea, ask questions, get instant recommendations, and turn concepts into real-world 3D printed products.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3 font-medium"><Star className="w-5 h-5 text-primary-neon shadow-[0_0_10px_rgba(56,189,248,0.8)]" /> 24/7 Smart 3D Consultation</li>
                <li className="flex items-center gap-3 font-medium"><Star className="w-5 h-5 text-primary-neon shadow-[0_0_10px_rgba(56,189,248,0.8)]" /> Hindi & English Multi-lingual Support</li>
                <li className="flex items-center gap-3 font-medium"><Star className="w-5 h-5 text-primary-neon shadow-[0_0_10px_rgba(56,189,248,0.8)]" /> Material & Price Estimation</li>
                <li className="flex items-center gap-3 font-medium"><Star className="w-5 h-5 text-primary-neon shadow-[0_0_10px_rgba(56,189,248,0.8)]" /> Live Order Tracking System</li>
              </ul>
              
              <div className="pt-4">
                <button 
                  onClick={() => {
                    const event = new CustomEvent('openChat');
                    window.dispatchEvent(event);
                  }}
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat With AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
