"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Mic, Paperclip, Image as ImageIcon, CheckCircle2, MessageSquare, Loader2, Sparkles, Box } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  isImage?: boolean;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm your NextLayer AI Assistant. I can help you with 3D printing orders, material advice, or tracking. आप मुझसे हिंदी में भी बात कर सकते हैं!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputValue;
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Logic
    setTimeout(async () => {
      let botResponse = "I'm processing your request. Could you please provide more details?";
      const lowerInput = text.toLowerCase();
      
      // 1. ORDER TRACKING LOGIC
      if (lowerInput.includes("track") || lowerInput.includes("status") || lowerInput.includes("order #")) {
        const orderIdMatch = text.match(/[0-9a-f]{8}/i);
        if (orderIdMatch) {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .filter('id', 'ilike', `%${orderIdMatch[0]}%`)
            .single();

          if (data) {
            botResponse = `Order Found! \nStatus: ${data.status}\nProgress: ${data.progress}%\nMaterial: ${data.material || 'N/A'}\nCreated: ${new Date(data.created_at).toLocaleDateString()}`;
          } else {
            botResponse = "Sorry, I couldn't find an order with that ID. Please double check.";
          }
        } else {
          botResponse = "Please provide your Order ID (like #a1b2c3d4) to track your progress.";
        }
      } 
      // 2. HINDI SUPPORT
      else if (lowerInput.includes("hindi") || lowerInput.includes("नमस्ते") || lowerInput.includes("kaise ho") || lowerInput.includes("kya hai")) {
        botResponse = "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप 3D प्रिंटिंग, मटेरियल या अपने ऑर्डर के बारे में पूछ सकते हैं।";
      }
      // 3. MATERIAL ADVICE
      else if (lowerInput.includes("material") || lowerInput.includes("pla") || lowerInput.includes("petg") || lowerInput.includes("abs")) {
        botResponse = "For beginners, **PLA** is best. For outdoor or strong parts, use **PETG**. For high heat resistance, **ABS** is recommended. Which one fits your project?";
      }
      // 4. PRICING
      else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("kitna")) {
        botResponse = "Pricing depends on size, material, and infill. Basic prints start from ₹400. Upload your STL file on our 'Upload' page for an exact quote!";
      }
      // 5. ROBOT ARM (Requirement Example)
      else if (lowerInput.includes("robot arm")) {
        botResponse = "Exciting! For a robot arm, I recommend **PETG or Carbon Fiber PLA** for strength. Do you have the STL files, or should we design it for you?";
      }
      // 6. WHATSAPP ESCALATION
      else if (lowerInput.includes("human") || lowerInput.includes("talk to") || lowerInput.includes("support")) {
        botResponse = "Sure! You can talk to our human engineers on WhatsApp here: [Click to Chat](https://wa.me/919997392335)";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileUpload = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: "bot",
        text: "File received! I'm analyzing the complexity... This looks like a 'High Complexity' print. Should I estimate the cost?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[350px] sm:w-[420px] h-[650px] max-h-[85vh] z-50 glass rounded-3xl shadow-[0_0_50px_rgba(14,165,233,0.2)] flex flex-col overflow-hidden border border-primary/30"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-black/60 backdrop-blur-xl flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-neon via-secondary-neon to-primary-neon animate-gradient-x"></div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                    <Sparkles className="w-6 h-6 text-primary-neon animate-pulse" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-lg"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">NextLayer AI Assistant</h3>
                  <p className="text-[10px] text-primary-neon font-bold tracking-widest uppercase">Intelligent System Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-black/20 to-primary/5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-sm shadow-lg shadow-primary/10"
                        : "glass border border-white/10 text-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-2 px-1 font-mono">{msg.time}</span>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 text-primary-neon p-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-medium animate-pulse">AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/40 backdrop-blur-md">
              {[
                { label: "Track Order", icon: Box },
                { label: "Material Guide", icon: Sparkles },
                { label: "Estimate Price", icon: IndianRupee },
                { label: "Human Support", icon: MessageSquare }
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(action.label)}
                  className="whitespace-nowrap flex items-center gap-2 text-xs bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-gray-300 hover:text-primary-neon px-4 py-2 rounded-xl transition-all"
                >
                  <action.icon className="w-3 h-3" />
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-black/80 border-t border-white/10">
              <div className="flex items-end gap-3">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-primary/50 focus-within:bg-white/10 transition-all">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask anything in English or Hindi..."
                    className="w-full bg-transparent text-white text-sm p-2 focus:outline-none resize-none max-h-[120px] min-h-[45px]"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between px-2 pt-1 border-t border-white/5 mt-1">
                    <div className="flex gap-1">
                      <button onClick={handleFileUpload} className="p-2 text-gray-400 hover:text-primary-neon transition-colors rounded-lg hover:bg-white/5">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button onClick={handleFileUpload} className="p-2 text-gray-400 hover:text-primary-neon transition-colors rounded-lg hover:bg-white/5">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                      <span>SHIFT+ENTER for new line</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-50 disabled:shadow-none"
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                  <button
                    onMouseDown={() => setIsRecording(true)}
                    onMouseUp={() => setIsRecording(false)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${
                      isRecording 
                        ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' 
                        : 'glass border-white/10 text-gray-300 hover:text-primary-neon hover:border-primary/50'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-8 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-110 active:scale-95 transition-all z-50 group border border-white/20"
      >
        <div className="relative">
          <Bot className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-neon rounded-full animate-ping"></span>
        </div>
      </button>
    </>
  );
}

// Icon for pricing
function IndianRupee({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
}
