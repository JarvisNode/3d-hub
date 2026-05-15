"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Mic, Paperclip, Image as ImageIcon, CheckCircle2 } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm your AI 3D Printing Assistant. I can help you estimate costs, choose materials, or design a custom part. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    // Simulate AI response based on the prompt example
    setTimeout(() => {
      let botResponse = "I can certainly help with that. Could you provide more details?";
      const lowerInput = newUserMsg.text.toLowerCase();
      
      if (lowerInput.includes("robot arm")) {
        botResponse = "Please upload your STL file, sketch, image, or video reference. Also specify size, material, and quantity.";
      } else if (lowerInput.includes("photo") || lowerInput.includes("image")) {
        botResponse = "No problem. Upload the photo and our team will create a custom 3D model for you.";
      } else if (lowerInput.includes("hindi") || lowerInput.includes("namaste")) {
        botResponse = "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? (Hello! How can I help you?)";
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
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] z-50 glass rounded-2xl shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col overflow-hidden border border-primary/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-neon to-secondary-neon"></div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                    <Bot className="w-5 h-5 text-primary-neon" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">NextLayer AI</h3>
                  <p className="text-xs text-primary-neon flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin scrollbar-thumb-white/10">
              <div className="text-center mb-6">
                <span className="text-xs text-gray-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  Today
                </span>
              </div>
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "glass border border-white/10 text-gray-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
              {/* Typing indicator could go here */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none border-t border-white/5 bg-black/40">
              {["Estimate Price", "Material Guide", "Track Order"].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(suggestion);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="whitespace-nowrap text-xs bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-gray-300 hover:text-primary-neon px-3 py-1.5 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/60 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl relative focus-within:border-primary/50 focus-within:bg-white/10 transition-all flex flex-col justify-end">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about printing, materials..."
                    className="w-full bg-transparent text-white text-sm p-3 focus:outline-none resize-none max-h-[100px] min-h-[44px]"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between px-2 pb-2">
                    <div className="flex gap-1">
                      <button type="button" className="p-1.5 text-gray-400 hover:text-primary-neon transition-colors rounded-lg hover:bg-white/5">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 text-gray-400 hover:text-primary-neon transition-colors rounded-lg hover:bg-white/5">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    type="submit"
                    className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                  <button
                    type="button"
                    className="w-11 h-11 glass border border-white/10 text-gray-300 rounded-xl flex items-center justify-center hover:text-primary-neon hover:border-primary/50 transition-colors"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-110 transition-transform z-50 group"
      >
        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </>
  );
}
