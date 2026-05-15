"use client";

import { useState } from "react";
import { Package, Clock, Download, ChevronRight, Settings, FileText, ArrowLeft, MessageSquare, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUserAndFetchOrders() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    checkUserAndFetchOrders();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Alex</h1>
          <p className="text-gray-400">Manage your orders and design requests.</p>
        </div>
        <Link href="/upload" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
          New Order
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/20 text-primary-neon font-medium border border-primary/30 flex items-center gap-3">
            <Package className="w-5 h-5" /> Active Orders
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors flex items-center gap-3">
            <Clock className="w-5 h-5" /> Order History
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors flex items-center gap-3">
            <FileText className="w-5 h-5" /> Invoices
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors flex items-center gap-3">
            <Settings className="w-5 h-5" /> Account Settings
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {!selectedOrder ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-bold text-white mb-4">Active Orders</h2>
              
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 text-primary-neon animate-spin" />
                </div>
              ) : orders.length === 0 ? (
                <div className="glass p-12 text-center rounded-2xl border border-white/10">
                  <Package className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-white mb-2">No active orders</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">You don't have any projects currently in progress. Start a new project by uploading your 3D models.</p>
                  <Link href="/upload" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full transition-colors font-bold shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                    Upload & Get Quote
                  </Link>
                </div>
              ) : (
                orders.map((order, i) => (
                  <div key={i} className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors cursor-pointer group" onClick={() => setSelectedOrder(order)}>
                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-primary-neon transition-colors">
                            {order.type === 'STL' ? '3D Printing Order' : (order.project_name || 'Custom Design')}
                          </h3>
                          <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">#{order.id.slice(0,8)}</span>
                        </div>
                        <p className="text-sm text-gray-400">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/5 ${order.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {order.status}
                        </span>
                        <button className="text-sm text-primary-neon flex items-center gap-1 hover:underline">
                          View Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div className={`bg-primary h-2 rounded-full`} style={{ width: `${order.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <h2 className="text-xl font-bold text-white mt-12 mb-4">Recent Invoices</h2>
              <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-white/5 text-gray-300">
                    <tr>
                      <th className="px-6 py-4 font-medium">Invoice ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No invoices generated yet.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* ORDER DETAILS & CHAT VIEW */
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Orders
              </button>
              
              <div className="glass p-6 rounded-2xl border border-white/10 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedOrder.title}</h2>
                    <p className="text-sm text-gray-400 font-mono mt-1">Order {selectedOrder.id}</p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full bg-white/5 ${selectedOrder.color === 'bg-blue-500' ? 'text-blue-400' : 'text-yellow-400'}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Material</div>
                    <div className="text-sm text-white font-medium">{selectedOrder.material}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Infill</div>
                    <div className="text-sm text-white font-medium">{selectedOrder.infill}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Date</div>
                    <div className="text-sm text-white font-medium">{selectedOrder.date}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Progress</div>
                    <div className="text-sm text-white font-medium">{selectedOrder.progress}%</div>
                  </div>
                </div>
              </div>

              {/* Live Chat Room */}
              <div className="glass rounded-2xl border border-white/10 flex flex-col h-[500px]">
                <div className="p-6 border-b border-white/10 bg-white/5 rounded-t-2xl">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary-neon" /> Project Communication Room
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Chat directly with the Next Layer 3D engineering team</p>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary/20 border border-primary/30 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                      Hi, I uploaded the reference images for my project. Can you let me know if they are clear enough?
                      <span className="block text-[10px] text-primary-neon/50 mt-2">Today, 10:42 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-gray-200 p-4 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                      Hello Alex! The images are perfect. I noticed one part is very thin, do you want us to reinforce it so it doesn't break during printing?
                      <span className="block text-[10px] text-gray-500 mt-2">Admin • Today, 11:05 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary/20 border border-primary/30 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                      Yes please, that would be great! What will the final price be?
                      <span className="block text-[10px] text-primary-neon/50 mt-2">Today, 11:15 AM</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10 bg-black/40 rounded-b-2xl">
                  <div className="flex gap-3 relative">
                    <input 
                      type="text" 
                      placeholder="Type your message to the team..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-neon"
                    />
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 rounded-xl flex items-center justify-center transition-colors shadow-lg">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
