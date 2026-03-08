'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Users, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatMessages, setChatMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: "Hi there! I'm Moza, your MochaEase AI assistant. ☕️ How can we help you streamline and grow today?" }
    ]);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        setChatMessages((prev) => [...prev, { role: 'user', text: chatInput }]);
        setChatInput("");
        setIsTyping(true);

        // Simulate AI demo response
        setTimeout(() => {
            setIsTyping(false);
            setChatMessages((prev) => [...prev, { role: 'ai', text: "That is a great question! I am just a visual demo right now, but soon I'll be fully connected to the MochaEase platform to give you live data and insights." }]);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isChatOpen ? (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[calc(100svh-5rem)] sm:h-[550px] max-h-[600px] bg-gradient-to-b from-[#1A1A1A] to-[#050505] rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between backdrop-blur-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2]/20 to-[#C3EB7A]/10 -z-10" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4A90E2] to-purple-500 p-[1px]">
                                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden relative">
                                    <Image src="/moza.jpg" alt="Moza AI" fill className="object-cover" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">Moza AI <span className="w-2 h-2 rounded-full bg-[#C3EB7A] animate-pulse" /></h3>
                                <p className="text-white/50 text-xs">Smart Assistant</p>
                            </div>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {chatMessages.map((msg, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                key={i}
                                className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'ai' ? 'bg-white/5 text-white/90 border border-white/5 self-start rounded-tl-sm' : 'bg-[#4A90E2] text-white self-end rounded-tr-sm'}`}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/5 self-start rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                                <Loader2 className="w-4 h-4 text-white/50 animate-spin" />
                                <span className="text-white/40 text-xs">Moza is typing...</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/5 border-t border-white/10">
                        <div className="relative flex items-center group/input">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask me anything..."
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A90E2]/50 transition-colors shadow-inner"
                            />
                            <button onClick={handleSendMessage} className="absolute right-2 w-8 h-8 rounded-full bg-[#4A90E2]/20 hover:bg-[#4A90E2] text-[#4A90E2] hover:text-white flex items-center justify-center transition-all">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mt-3 flex gap-2 justify-center">
                            <button onClick={() => setChatInput("Show me pricing")} className="text-[10px] text-white/50 hover:text-[#C3EB7A] px-2 py-1 rounded-full border border-white/10 hover:border-[#C3EB7A]/30 transition-colors">Pricing</button>
                            <button onClick={() => setChatInput("How does it work?")} className="text-[10px] text-white/50 hover:text-[#C3EB7A] px-2 py-1 rounded-full border border-white/10 hover:border-[#C3EB7A]/30 transition-colors">Features</button>
                            <button onClick={() => { window.location.href = '/demo'; }} className="text-[10px] text-white/50 hover:text-[#C3EB7A] px-2 py-1 rounded-full border border-white/10 hover:border-[#C3EB7A]/30 transition-colors">Book Demo</button>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 cursor-pointer group"
                    onClick={() => setIsChatOpen(true)}
                >
                    <div className="bg-white text-black text-sm font-bold px-5 py-3 rounded-2xl shadow-2xl hidden md:block relative group-hover:-translate-y-1 transition-transform">
                        Hello, I am Moza! 👋
                        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-l-6 border-l-white border-b-6 border-b-transparent"></div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4A90E2] to-purple-500 p-[2px] shadow-[0_0_30px_rgba(74,144,226,0.4)] group-hover:scale-110 transition-transform">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                            <Image src="/moza.jpg" alt="Moza AI Assistant" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#4A90E2]/40 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
