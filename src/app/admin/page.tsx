"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Users, ShoppingBag, Activity, MoreVertical, Edit2, MessageSquare, Bot, ArrowLeft, Check, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminInput, setAdminInput] = useState("");
  const [adminChat, setAdminChat] = useState<{role: 'admin'|'bot', text: string}[]>([
    { role: 'bot', text: 'Hello Admin! I am online and ready to assist you. Ask me anything when orders start coming in.' }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAdminAndFetch() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user || user.email !== "kumarh62058@gmail.com") {
          router.push("/");
          return;
        }

        setIsAdmin(true);

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    checkAdminAndFetch();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleAdminChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminInput.trim()) return;
    
    const newChat = [...adminChat, { role: 'admin' as const, text: adminInput }];
    setAdminChat(newChat);
    setAdminInput("");

    // Mock AI Analysis Logic
    setTimeout(() => {
      let botResponse = "I'm still learning. Try asking 'who ordered', 'price', or 'which order is good'.";
      const lower = adminInput.toLowerCase();
      
      if (lower.includes("who")) {
         botResponse = `The latest order (#${orders[0]?.id?.slice(0,8) || 'N/A'}) was placed by ${orders[0]?.customer_email || 'someone'}.`;
      } else if (lower.includes("price") || lower.includes("cost")) {
         botResponse = "I recommend pricing custom design requests at ₹6,800 base + material costs for a solid margin.";
      } else if (lower.includes("good") || lower.includes("best") || lower.includes("feasible")) {
         botResponse = "Standard STL prints are generally very feasible. Complex resins require higher setup fees.";
      }

      setAdminChat([...newChat, { role: 'bot' as const, text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Activity className="text-secondary-neon" /> Admin Control Panel
        </h1>
        <p className="text-gray-400">Manage orders, customers, and system settings.</p>
      </div>

      {!selectedOrder ? (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Revenue", value: "₹9,96,000", icon: IndianRupee, color: "text-green-400" },
              { title: "Active Orders", value: orders.length.toString(), icon: ShoppingBag, color: "text-blue-400" },
              { title: "New Customers", value: "142", icon: Users, color: "text-purple-400" },
              { title: "Pending Reviews", value: orders.filter(o => o.status === 'Pending').length.toString(), icon: Activity, color: "text-yellow-400" }
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-white/10 flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
                <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                <button className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-white/5 text-gray-300">
                    <tr>
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <Loader2 className="w-6 h-6 mx-auto animate-spin text-primary-neon" />
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          <ShoppingBag className="w-8 h-8 mx-auto mb-3 opacity-50" />
                          No active orders yet. When customers place orders, they will appear here.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order, i) => (
                        <tr key={i} onClick={() => setSelectedOrder(order)} className="hover:bg-white/10 transition-colors cursor-pointer group">
                          <td className="px-6 py-4 font-mono text-white group-hover:text-primary-neon">#{order.id.slice(0,8)}</td>
                          <td className="px-6 py-4 truncate max-w-[150px]">{order.customer_email}</td>
                          <td className="px-6 py-4">{order.type}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                              order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'Printing' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-primary-neon hover:text-white p-1 text-xs font-bold">Manage</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Chatbot Admin Panel */}
            <div className="lg:col-span-1 glass rounded-2xl border border-white/10 flex flex-col h-[600px] overflow-hidden">
              <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary-neon border border-primary/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Admin AI Assistant</h2>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    System Online
                  </p>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {adminChat.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                      msg.role === 'admin' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAdminChatSubmit} className="p-4 border-t border-white/10 bg-black/40">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={adminInput}
                    onChange={(e) => setAdminInput(e.target.value)}
                    placeholder="Ask about orders, prices..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-neon transition-colors"
                  />
                  <button type="submit" className="bg-primary hover:bg-primary/90 text-white p-2 rounded-xl flex items-center justify-center transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        /* ORDER DETAILS VIEW */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Info & Actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass p-6 rounded-2xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Order {selectedOrder.id}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="text-white">{selectedOrder.customer}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="text-yellow-400 font-bold">{selectedOrder.status}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Material</span><span className="text-white">{selectedOrder.material}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Infill</span><span className="text-white">{selectedOrder.infill}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">File</span><span className="text-primary-neon underline cursor-pointer">{selectedOrder.file}</span></div>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Admin Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Check className="w-5 h-5" /> Accept & Request Payment
                  </button>
                  <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <X className="w-5 h-5" /> Decline / Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Live Chat Room */}
            <div className="lg:col-span-2 glass rounded-2xl border border-white/10 flex flex-col h-[600px]">
              <div className="p-6 border-b border-white/10 bg-white/5 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-neon" /> Project Communication Room
                </h2>
                <p className="text-xs text-gray-400 mt-1">Chat directly with {selectedOrder.customer}</p>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 p-4 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                    Hi, I uploaded the reference images for my custom anime figure. Can you let me know if they are clear enough?
                    <span className="block text-[10px] text-gray-500 mt-2">Today, 10:42 AM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary/20 border border-primary/30 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                    Hello Sarah! The images are perfect. I noticed the sword is very thin, do you want us to reinforce it so it doesn't break during printing?
                    <span className="block text-[10px] text-primary-neon/50 mt-2">Today, 11:05 AM</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 p-4 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                    Yes please, that would be great! What will the final price be?
                    <span className="block text-[10px] text-gray-500 mt-2">Today, 11:15 AM</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-black/40 rounded-b-2xl">
                <div className="flex gap-3 relative">
                  <input 
                    type="text" 
                    placeholder="Type a message to the customer..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-neon"
                  />
                  <button className="bg-primary hover:bg-primary/90 text-white px-6 rounded-xl flex items-center justify-center transition-colors shadow-lg">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IndianRupee({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
}
