'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ChatMessage {
    role: 'ai' | 'user';
    text: string;
}

const QUICK_BUTTONS = [
    { label: '💰 Pricing', message: 'What are the pricing plans?' },
    { label: '✨ Features', message: 'What features does MochaEase offer?' },
    { label: '📅 Book Demo', message: 'I want to book a demo' },
];

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { role: 'ai', text: "Hi there! I'm Moza, your MochaEase AI assistant. ☕️ Ask me about pricing, features, or anything about our POS platform — I'm here to help!" },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, isTyping]);

    const handleSendMessage = async (overrideText?: string) => {
        const text = overrideText || chatInput.trim();
        if (!text) return;

        const userMsg: ChatMessage = { role: 'user', text };
        const updatedMessages = [...chatMessages, userMsg];
        setChatMessages(updatedMessages);
        setChatInput('');
        setIsTyping(true);

        try {
            const res = await fetch('/api/moza-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await res.json();

            if (res.ok && data.reply) {
                setChatMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
            } else {
                setChatMessages(prev => [
                    ...prev,
                    { role: 'ai', text: "Oops! I hit a snag. Could you try again? If this keeps happening, head to mochaease.com/support for help! 🛠️" },
                ]);
            }
        } catch {
            setChatMessages(prev => [
                ...prev,
                { role: 'ai', text: "Looks like I'm having trouble connecting. Please check your internet and try again! 🌐" },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    // Simple markdown-like formatting: **bold**, bullet points, links
    const formatMessage = (text: string) => {
        // Split into lines for bullet point handling
        const lines = text.split('\n');
        const elements: React.ReactNode[] = [];

        lines.forEach((line, lineIdx) => {
            const trimmed = line.trim();

            if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
                // Bullet point
                const bulletText = trimmed.replace(/^[-•*]\s+/, '');
                elements.push(
                    <div key={lineIdx} className="flex items-start gap-2 ml-1 my-0.5">
                        <span className="text-[#C3EB7A] mt-1 text-xs shrink-0">●</span>
                        <span>{formatInline(bulletText)}</span>
                    </div>
                );
            } else if (trimmed === '') {
                elements.push(<div key={lineIdx} className="h-2" />);
            } else {
                elements.push(
                    <span key={lineIdx}>
                        {formatInline(trimmed)}
                        {lineIdx < lines.length - 1 && <br />}
                    </span>
                );
            }
        });

        return <>{elements}</>;
    };

    const formatInline = (text: string): React.ReactNode => {
        // Handle **bold** text
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <AnimatePresence>
            {isChatOpen ? (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', bounce: 0.3 }}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100svh-5rem)] sm:h-[560px] max-h-[620px] bg-gradient-to-b from-[#1A1A1A] to-[#050505] rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between backdrop-blur-md relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2]/20 to-[#C3EB7A]/10 -z-10" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4A90E2] to-purple-500 p-[1px]">
                                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden relative">
                                    <Image src="/moza.jpg" alt="Moza AI" fill className="object-cover" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">Moza AI <span className="w-2 h-2 rounded-full bg-[#C3EB7A] animate-pulse" /></h3>
                                <p className="text-white/50 text-xs">
                                    {isTyping ? 'Thinking...' : 'Powered by Gemini'}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {chatMessages.map((msg, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                key={i}
                                className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'ai'
                                        ? 'bg-white/[0.06] text-white/90 border border-white/5 self-start rounded-tl-sm'
                                        : 'bg-[#4A90E2] text-white self-end rounded-tr-sm'
                                    }`}
                            >
                                {msg.role === 'ai' ? formatMessage(msg.text) : msg.text}
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/[0.06] border border-white/5 self-start rounded-2xl rounded-tl-sm p-3.5 flex items-center gap-2.5"
                            >
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A] animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A] animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A] animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                <span className="text-white/40 text-xs">Moza is thinking...</span>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Buttons + Input */}
                    <div className="p-4 bg-white/5 border-t border-white/10 shrink-0">
                        {chatMessages.length <= 1 && (
                            <div className="mb-3 flex gap-2 flex-wrap">
                                {QUICK_BUTTONS.map((btn) => (
                                    <button
                                        key={btn.label}
                                        onClick={() => handleSendMessage(btn.message)}
                                        disabled={isTyping}
                                        className="text-[11px] text-white/60 hover:text-[#C3EB7A] px-3 py-1.5 rounded-full border border-white/10 hover:border-[#C3EB7A]/30 transition-all disabled:opacity-40"
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
                                placeholder="Ask Moza anything..."
                                disabled={isTyping}
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A90E2]/50 transition-colors shadow-inner disabled:opacity-50"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={isTyping || !chatInput.trim()}
                                className="absolute right-2 w-8 h-8 rounded-full bg-[#4A90E2]/20 hover:bg-[#4A90E2] text-[#4A90E2] hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-[#4A90E2]/20"
                            >
                                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 1.5, type: 'spring', bounce: 0.5 }}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 cursor-pointer group"
                    onClick={() => setIsChatOpen(true)}
                >
                    <div className="bg-white text-black text-sm font-bold px-5 py-3 rounded-2xl shadow-2xl hidden md:block relative group-hover:-translate-y-1 transition-transform">
                        Hey! I&apos;m Moza 👋
                        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-l-6 border-l-white border-b-6 border-b-transparent" />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4A90E2] to-purple-500 p-[2px] shadow-[0_0_30px_rgba(74,144,226,0.4)] group-hover:scale-110 transition-transform">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                            <Image src="/moza.jpg" alt="Moza AI Assistant" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#4A90E2]/40 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
