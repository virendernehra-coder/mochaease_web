'use client';

import { BarChart3, Clock, Rocket, Shield, Settings2, FileText, Smartphone, Coffee, Store, Users, Zap, CheckCircle2, Globe, ChevronRight, Sparkles, WifiOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });
const CustomVideoPlayer = dynamic(() => import('@/components/CustomVideoPlayer'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

export default function HomeComponent({ country = 'us' }: { country?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
      <NetworkBackground />

      <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-transparent to-transparent pointer-events-none -z-0" />

      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center text-center z-10 min-h-[80vh] md:min-h-screen justify-center">

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4A90E2]/20 to-[#C3EB7A]/20 border border-white/10 mb-8 backdrop-blur-sm shadow-[0_0_30px_rgba(74,144,226,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#C3EB7A] shadow-[0_0_8px_#C3EB7A] animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide uppercase">MochaEase 2.0 is Live</span>
          </motion.div>

          <motion.h1 variants={fadeUpVariant} className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1]">
            Total Control Over <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)]">Your Business.</span>
          </motion.h1>

          <motion.p variants={fadeUpVariant} className="max-w-2xl text-lg md:text-xl text-white/70 font-medium mb-12 leading-relaxed">
            Whether you're opening your first café or leading a nationwide retail chain — MochaEase handles the daily chaos with AI-powered tools for sales, stock, and staff.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link href="/experience" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A1A1A] border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2 group">
              Find Your Business Type
            </Link>
            <Link href="/demo" className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#C3EB7A] text-black font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.4)] flex items-center justify-center gap-2 group">
              Book a Free Demo
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Pain Points Section - Made Vibrant & Animated */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 z-10 relative">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Stop relying on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">fragmented tools</span>.
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            70% of F&B and retail businesses in Asia still use Excel and WhatsApp. It's time to evolve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-12 lg:col-span-2">

            <motion.div variants={fadeUpVariant} className="relative p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 group hover:border-red-500/50 hover:bg-red-500/20 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-[50px] -z-10 rounded-full group-hover:bg-red-500/40 transition-colors duration-500" />
              <h3 className="text-2xl font-bold text-white mb-6">Why businesses fail in 12–18 months:</h3>
              <ul className="space-y-5">
                {[
                  "Juggling 4–7 different tools daily ops",
                  "Zero visibility across multiple outlets",
                  "Gut-feeling forecasts leading to dead stock",
                  "No real-time clarity on business health"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30 group-hover/item:bg-red-500 group-hover/item:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all">
                      <span className="text-red-400 group-hover/item:text-white font-bold text-sm transition-colors">✕</span>
                    </div>
                    <span className="text-white/80 font-medium group-hover/item:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="relative p-8 rounded-2xl bg-gradient-to-br from-[#C3EB7A]/10 to-transparent border border-[#C3EB7A]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C3EB7A]/20 blur-[50px] -z-10 rounded-full" />
              <p className="text-xl text-white font-medium flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#C3EB7A]" />
                <span>
                  MochaEase unifies it all. Actionable facts, not inefficient <span className="text-[#C3EB7A] underline decoration-[#C3EB7A] underline-offset-4 decoration-2">gut-feelings.</span>
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Custom Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10, y: 50 }} whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative w-full flex items-center justify-center z-20 perspective-1000 lg:col-span-3 pt-8 lg:pt-0"
          >
            <CustomVideoPlayer
              src="https://xvjgvffbpbipdqdqlpwo.supabase.co/storage/v1/object/sign/website_videos/MochaEase%20Business%20Management%20System%20Introduction.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMTJhOThhZC1iYjdjLTQ3Y2YtODE2MS1jNDRjM2M4YzMwNWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX3ZpZGVvcy9Nb2NoYUVhc2UgQnVzaW5lc3MgTWFuYWdlbWVudCBTeXN0ZW0gSW50cm9kdWN0aW9uLm1wNCIsImlhdCI6MTc3MzA4MjE1NiwiZXhwIjoxODY3NjkwMTU2fQ.vjedNvSh80gTAAWRAyO-qnqBDUpCXBWJpr703qsTsAs"
              poster="/mochaease_video_poster.webp"
            />
          </motion.div>
        </div>
      </section>

      {/* Profit Leakage Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 z-10 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Your Profits Are Leaking. <span className="text-red-400">We Will Find the Holes.</span>
          </h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Flying Blind", desc: "No real-time data means guessing which items actually drive profit." },
            { title: "Strangers as Best", desc: "Zero loyalty tracking means you treat regulars like first-timers." },
            { title: "Untracked Overtime", desc: "Manual timesheets lead to inflated payroll and scheduling chaos." },
            { title: "Wasted Stock", desc: "Over-ordering perishables because you lack AI demand forecasting." },
          ].map((leak, i) => (
            <motion.div whileHover={{ y: -10, scale: 1.02 }} key={i} variants={fadeUpVariant} className="p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-500 font-bold border border-red-500/30">0{i + 1}</div>
              <h3 className="text-xl font-bold text-white mb-2">{leak.title}</h3>
              <p className="text-white/60 text-sm">{leak.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="flex justify-center">
          <Link href="#features" className="text-sm font-bold text-[#C3EB7A] flex items-center gap-2 hover:gap-4 transition-all group">
            Why Switch to MochaEase <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </section>

      {/* Revenue Leakage Prompt CTA */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 z-10 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="bg-gradient-to-br from-red-500/10 via-[#1A1A1A] to-[#0A0A0A] rounded-[40px] border border-red-500/20 p-8 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-red-500/10 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A90E2]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
              <span className="text-3xl">💸</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              You are likely <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">losing money</span> every single day.
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-medium mb-10 leading-relaxed">
              Without an intelligent system tracking your inventory, staff, and sales, hidden leakages quietly eat away at your profit margins. Do you know how much you're actually losing?
            </p>
            <Link href="/calculator" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] text-lg group/btn hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
              Find Out How Much
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="features" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 z-10 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center mb-16 md:mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C3EB7A]/5 blur-[100px] -z-10 rounded-full" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">The Complete Suite for the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Modern Era</span></h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">Stop patching together 5 different tools. MochaEase is an intelligent, unified ecosystem built to run your entire operation.</p>
        </motion.div>

        {/* Bento Grid 2.0 - Animated */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {/* HERO CARD: Moza AI Data Analyst (Span 4) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-4 lg:col-span-4 h-full">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-[#4A90E2]/40 via-white/5 to-white/5 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A90E2]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#4A90E2]/20 transition-colors duration-700 pointer-events-none" />

              <div className="p-8 md:p-12 h-full flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                <div className="flex-1 flex flex-col items-start z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A90E2]/10 border border-[#4A90E2]/20 text-[#4A90E2] text-xs font-bold uppercase tracking-wider mb-6">
                    <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" /> AI Assistant
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Moza AI Data Analyst</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-sm">
                    Stop downloading CSVs. Just ask Moza questions like <span className="text-white/90 italic">"What were our top 3 most profitable items last Tuesday?"</span> and get instant, actionable insights.
                  </p>
                </div>

                {/* Mini Chat Illustration */}
                <div className="w-full md:w-[320px] shrink-0 bg-[#111] border border-white/10 rounded-2xl p-4 shadow-2xl relative z-10 hidden sm:block group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] flex items-center justify-center text-black font-black text-sm">M</div>
                    <span className="text-white font-bold text-sm">Moza</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="self-end bg-[#4A90E2]/20 border border-[#4A90E2]/30 text-white/90 text-xs p-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                      Can you calculate the food cost variance for August?
                    </div>
                    <div className="self-start bg-white/5 border border-white/5 text-white/80 text-xs p-3 rounded-2xl rounded-tl-sm max-w-[90%]">
                      <p className="mb-2">Your theoretical food cost was 28.5%, but actual was 32.1%.</p>
                      <p className="font-bold text-[#C3EB7A]">Major leak found: Dairy products (Cheese, Butter).</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* SECONDARY CARD: Invoice Scanning (Span 2) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-bl from-yellow-400/40 via-white/5 to-white/5 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 blur-[60px] rounded-full group-hover:bg-yellow-400/20 transition-colors duration-700 pointer-events-none" />

              <div className="p-8 h-full flex flex-col z-10 relative">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <FileText className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Invoice Sync</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  Snap a photo or upload a vendor invoice. Our AI automatically reads line items, updates inventory quantities, and logs expenses instantly.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* MIDDLE ROW */}
          {/* Predictive Procurement (Span 2) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-cyan-500/20 to-white/0 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="p-8 flex flex-col h-full bg-[#111]/50 group-hover:bg-[#111]/80 transition-colors rounded-[31px]">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <Rocket className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Predictive Purchasing</h3>
                <p className="text-white/50 text-base leading-relaxed mb-4">
                  MochaEase predicts when you'll run out of high-velocity stock and auto-generates supplier POs right before the weekend rush.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Franchise Control (Span 2) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-b from-[#C3EB7A]/30 to-white/0 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="absolute inset-0 bg-[#C3EB7A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
              <div className="p-8 flex flex-col h-full bg-[#111]/50 group-hover:bg-transparent transition-colors rounded-[31px]">
                <div className="w-12 h-12 rounded-xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <Globe className="w-6 h-6 text-[#C3EB7A]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Franchise Mastery</h3>
                <p className="text-white/50 text-base leading-relaxed mb-4">
                  Push menu updates to 100 outlets in one click. Centralized permission controls and aggregated live reporting.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Performance Scoring (Span 2) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-bl from-pink-500/20 to-white/0 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="p-8 flex flex-col h-full bg-[#111]/50 group-hover:bg-[#111]/80 transition-colors rounded-[31px]">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <Shield className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Staff Scoring</h3>
                <p className="text-white/50 text-base leading-relaxed mb-4">
                  Gamify your team's performance. Auto-calculate metrics like items-sold-per-hour, upselling success, and void rates.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ROW 3 */}
          {/* Payroll & HR (Span 3) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-3 lg:col-span-3 h-full">
            <motion.div animate={{ y: [0, -11, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-purple-500/20 to-white/0 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="p-8 md:p-10 flex flex-col h-full bg-[#111]/50 group-hover:bg-[#111]/80 transition-colors rounded-[31px]">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Biometric HR & Payroll</h3>
                <p className="text-white/50 text-base leading-relaxed mb-4 max-w-sm">
                  Run daily shift roasters and enforce biometric clock-ins via tablet. Automatically track overtime and generate accurate payroll files in one click.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* 100% Offline (Span 3) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-3 lg:col-span-3 h-full">
            <motion.div animate={{ y: [0, -13, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-l from-red-500/20 to-white/5 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="p-8 md:p-10 flex flex-col h-full z-10 relative">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <WifiOff className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">100% Offline Resiliency</h3>
                <p className="text-white/50 text-base leading-relaxed max-w-sm">
                  Never lose a sale to bad Wi-Fi. Our EdgePOS continues working completely locally without internet, and silently auto-syncs the split-second the network returns.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ROW 4 */}
          {/* B2B & Expense (Span 3) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-3 lg:col-span-3 h-full">
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2.1 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-r from-emerald-500/20 to-white/5 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="p-8 md:p-10 flex flex-col h-full z-10 relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <Store className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">B2B Lifecycle & Expenses</h3>
                <p className="text-white/50 text-base leading-relaxed max-w-sm">
                  Track every penny. From raising professional POs and generating invoices to managing vendor payouts from 'pending' to 'paid' via digital ledger matching.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Omnichannel Delivery (Span 3) */}
          <motion.div variants={fadeUpVariant} className="col-span-1 md:col-span-3 lg:col-span-3 h-full">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} className="relative p-[1px] rounded-[32px] bg-gradient-to-l from-orange-500/20 to-white/5 overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[32px]" />
              <div className="p-8 md:p-10 flex flex-col h-full z-10 relative">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  <Settings2 className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Omnichannel Delivery KDS</h3>
                <p className="text-white/50 text-base leading-relaxed max-w-sm">
                  Funnel your Swiggy, Zomato, UberEats, wholesale, and direct web orders into one centralized Kitchen Display System. No more tablet juggling.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      {/* Testimonials Marquee */}
      <section className="w-full py-20 md:py-32 z-10 relative overflow-hidden bg-white/5 border-y border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Trusted by businesses <span className="text-[#C3EB7A]">just like yours.</span></h2>
        </motion.div>

        <div className="relative w-full flex items-center">
          {/* Edge Fade Gradients */}
          <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          {/* Marquee Track container - Doubled for seamless loop */}
          <div className="flex w-max shrink-0 gap-6 md:gap-8 hover:[&>div]:[animation-play-state:paused] px-4">
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex w-max shrink-0 gap-6 md:gap-8"
            >
              {[
                { type: "Cafe & Coffee Shops", name: "Anjali, Cafe Owner", quote: "Before MochaEase, inventory was a nightmare. Now AI tells me exactly when to order beans. Worth every penny." },
                { type: "Fashion & Beauty", name: "Tina, Boutique Manager", quote: "The CRM feature alone increased our return customer rate by 40%. It's so easy to use." },
                { type: "Quick Service (QSR)", name: "Rahul, QSR Operator", quote: "During lunch rush, the POS speed is incredible. We process orders 2x faster than our old system." },
                { type: "Enterprise Chains", name: "Sarah, COO", quote: "Managing 15 outlets used to take 5 tools. Now I see everything in one dashboard. Pure magic." },
              ].map((test, i) => (
                <div key={`set1-${i}`} className="w-[320px] md:w-[450px] shrink-0 p-8 rounded-3xl bg-black/40 border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden group hover:border-[#4A90E2]/50 hover:shadow-[0_0_40px_rgba(74,144,226,0.15)] cursor-default backdrop-blur-md">
                  <div className="absolute -right-10 -top-10 text-[120px] text-white/5 font-serif leading-none group-hover:text-white/10 group-hover:-rotate-12 transition-all duration-500">"</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold mb-6 group-hover:bg-[#4A90E2]/20 group-hover:text-[#4A90E2] transition-colors">{test.type}</div>
                  <p className="text-lg text-white mb-6 font-medium relative z-10">"{test.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-purple-500 flex items-center justify-center shadow-lg shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-bold text-white/90">{test.name}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex w-max shrink-0 gap-6 md:gap-8"
              aria-hidden="true"
            >
              {[
                { type: "Cafe & Coffee Shops", name: "Anjali, Cafe Owner", quote: "Before MochaEase, inventory was a nightmare. Now AI tells me exactly when to order beans. Worth every penny." },
                { type: "Fashion & Beauty", name: "Tina, Boutique Manager", quote: "The CRM feature alone increased our return customer rate by 40%. It's so easy to use." },
                { type: "Quick Service (QSR)", name: "Rahul, QSR Operator", quote: "During lunch rush, the POS speed is incredible. We process orders 2x faster than our old system." },
                { type: "Enterprise Chains", name: "Sarah, COO", quote: "Managing 15 outlets used to take 5 tools. Now I see everything in one dashboard. Pure magic." },
              ].map((test, i) => (
                <div key={`set2-${i}`} className="w-[320px] md:w-[450px] shrink-0 p-8 rounded-3xl bg-black/40 border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden group hover:border-[#4A90E2]/50 hover:shadow-[0_0_40px_rgba(74,144,226,0.15)] cursor-default backdrop-blur-md">
                  <div className="absolute -right-10 -top-10 text-[120px] text-white/5 font-serif leading-none group-hover:text-white/10 group-hover:-rotate-12 transition-all duration-500">"</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold mb-6 group-hover:bg-[#4A90E2]/20 group-hover:text-[#4A90E2] transition-colors">{test.type}</div>
                  <p className="text-lg text-white mb-6 font-medium relative z-10">"{test.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-purple-500 flex items-center justify-center shadow-lg shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-bold text-white/90">{test.name}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Efficiency / How it Works Section */}
      <section className="w-full bg-white/5 border-y border-white/5 py-32 z-10 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">You Bring the Business. <span className="text-[#C3EB7A]">We'll Bring the System.</span></h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Hardware agnostic. Plug in your existing devices and launch within 24 hours.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#C3EB7A]/0 via-[#C3EB7A]/30 to-[#C3EB7A]/0 -z-10" />
            {[
              { step: "1", title: "Register", desc: "Create your account instantly." },
              { step: "2", title: "Plug In", desc: "Connect existing iPads and printers." },
              { step: "3", title: "Automate", desc: "Turn on AI inventory & digital menus." },
              { step: "4", title: "Grow", desc: "Watch margins improve real-time." }
            ].map((step, i) => (
              <motion.div whileHover={{ y: -15 }} key={i} variants={fadeUpVariant} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border-2 border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6 text-2xl font-black text-white/30 group-hover:border-[#C3EB7A] group-hover:text-[#C3EB7A] group-hover:shadow-[0_0_40px_rgba(195,235,122,0.3)] group-hover:scale-110 transition-all duration-500">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C3EB7A] transition-colors">{step.title}</h3>
                <p className="text-sm text-white/60 px-4">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section id="pricing" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32 z-10 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="bg-gradient-to-br from-[#C3EB7A]/10 via-[#1A1A1A] to-[#0A0A0A] rounded-[40px] border border-[#C3EB7A]/20 p-8 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C3EB7A]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#C3EB7A]/10 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A90E2]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Affordable Plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Every Scale</span>.
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-medium mb-10 leading-relaxed">
              Start free, scale infinitely. View our transparent pricing tiers and extensive feature comparison matrix to see exactly how MochaEase pays for itself.
            </p>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#C3EB7A] text-black font-black hover:brightness-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(195,235,122,0.4)] text-lg group/btn">
              View Pricing & Features
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Cross-Platform Ecosystem Section */}
      <section className="w-full bg-gradient-to-b from-[#050505] to-[#0A0A0A] py-32 z-10 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4A90E2]/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C3EB7A]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Smartphone className="w-4 h-4 text-[#4A90E2]" />
              <span className="text-xs font-bold text-white/80 tracking-wide uppercase">MochaEase Ecosystem</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Fits Your Setup <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] via-white to-[#4A90E2]">Like Butter.</span>
            </h2>
            <p className="text-xl text-white/60 font-medium">
              Hardware agnostic. Available on iOS, Android, and Web. Equip your cashiers with tablets and manage your backoffice from anywhere.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-[120px] left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

            {/* iOS / Apple */}
            <motion.div variants={fadeUpVariant} className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/10 to-transparent hover:from-white/30 transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[32px] -z-10" />
              <div className="p-10 h-full flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  {/* Faux Apple Icon */}
                  <svg className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" className="hidden" />
                    <path d="M16.5 13.974c0-3.187 2.651-4.755 2.766-4.832-1.503-2.147-3.834-2.435-4.664-2.47-1.956-.192-3.824 1.134-4.82 1.134-1.006 0-2.541-1.11-4.14-1.08-2.071.028-3.987 1.187-5.048 3.011-2.158 3.665-.552 9.074 1.545 12.046 1.026 1.455 2.245 3.1 3.82 3.042 1.517-.058 2.091-.968 3.916-.968 1.815 0 2.341.968 3.935.94 1.634-.03 2.668-1.488 3.684-2.923 1.173-1.674 1.656-3.296 1.674-3.376-.037-.015-3.168-1.189-3.168-4.524zm-2.73-8.814c.83-.984 1.385-2.348 1.233-3.71-.143-.021-.295-.032-.442-.032-1.39 0-2.887.65-3.774 1.696-.78.916-1.385 2.313-1.215 3.66 1.52.115 2.97-.565 3.847-1.614z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">iOS Ecosystem</h3>
                <p className="text-white/50 text-base">Turn iPads into sleek point-of-sale terminals and iPhones into mobile inventory scanners.</p>
              </div>
            </motion.div>

            {/* Android */}
            <motion.div variants={fadeUpVariant} className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-[#C3EB7A]/20 to-transparent hover:from-[#C3EB7A]/50 transition-colors duration-500 overflow-hidden lg:-translate-y-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[32px] -z-10" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C3EB7A]/10 blur-[50px] rounded-full group-hover:bg-[#C3EB7A]/20 transition-colors duration-500" />
              <div className="p-10 h-full flex flex-col items-center text-center relative z-10">
                <div className="absolute top-6 right-6 px-3 py-1 bg-[#C3EB7A]/10 text-[#C3EB7A] text-xs font-bold rounded-full border border-[#C3EB7A]/20">Most Popular</div>
                <div className="w-20 h-20 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#C3EB7A]/20 group-hover:border-[#C3EB7A]/40 transition-all duration-500 shadow-[0_0_30px_rgba(195,235,122,0.1)]">
                  {/* Faux Android Icon */}
                  <svg className="w-10 h-10 text-[#C3EB7A]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414C17.523 16.3248 16.7368 17.1111 15.7533 17.1111H8.24431C7.26084 17.1111 6.47466 16.3248 6.47466 15.3414V9.92709H17.523V15.3414ZM16.4891 7.21884L17.5029 5.46288C17.5458 5.38883 17.5204 5.29362 17.4463 5.25078C17.3723 5.20794 17.2771 5.2333 17.2343 5.30732L16.2046 7.09117C14.9567 6.51648 13.5284 6.18244 11.9988 6.18244C10.4692 6.18244 9.04097 6.51648 7.79301 7.09117L6.7634 5.30732C6.72054 5.2333 6.62536 5.20794 6.5513 5.25078C6.47724 5.29362 6.45188 5.38883 6.49474 5.46288L7.50854 7.21884C4.68656 8.76103 2.75391 11.666 2.52988 15.1111H3.64969V9.92709C3.64969 9.42171 4.05943 9.01198 4.56481 9.01198H5.66952V17.1111C5.66952 18.2568 6.5986 19.1859 7.74421 19.1859H8.24431C8.24431 19.756 8.70646 20.2181 9.27663 20.2181H10.1915C10.7617 20.2181 11.2238 19.756 11.2238 19.1859H12.7738C12.7738 19.756 13.236 20.2181 13.8061 20.2181H14.721C15.2912 20.2181 15.7533 19.756 15.7533 19.1859H16.2534C17.399 19.1859 18.3281 18.2568 18.3281 17.1111V9.01198H19.4328C19.9382 9.01198 20.3479 9.42171 20.3479 9.92709V15.1111H21.4678C21.2437 11.666 19.3111 8.76103 16.4891 7.21884ZM8.86874 13.045C8.42861 13.045 8.07185 12.6882 8.07185 12.2481C8.07185 11.808 8.42861 11.4512 8.86874 11.4512C9.30887 11.4512 9.66563 11.808 9.66563 12.2481C9.66563 12.6882 9.30887 13.045 8.86874 13.045ZM15.1289 13.045C14.6888 13.045 14.332 12.6882 14.332 12.2481C14.332 11.808 14.6888 11.4512 15.1289 11.4512C15.569 11.4512 15.9258 11.808 15.9258 12.2481C15.9258 12.6882 15.569 13.045 15.1289 13.045Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Android Ready</h3>
                <p className="text-white/50 text-base mb-6">Deploy affordable, rugged Android POS hardware across hundreds of locations effortlessly.</p>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A]"></div>
                </div>
              </div>
            </motion.div>

            {/* Web App */}
            <motion.div variants={fadeUpVariant} className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-[#4A90E2]/20 to-transparent hover:from-[#4A90E2]/40 transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[32px] -z-10" />
              <div className="p-10 h-full flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-[#4A90E2]/10 border border-[#4A90E2]/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#4A90E2]/20 group-hover:border-[#4A90E2]/40 transition-all duration-500 shadow-[0_0_30px_rgba(74,144,226,0.1)]">
                  <Globe className="w-8 h-8 text-[#4A90E2]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Powerful Backoffice</h3>
                <p className="text-white/50 text-base">Access reports, manage inventory, and configure menus from any web browser globally.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integrations & Newsletter / Footer CTA */}
      <section className="w-full px-6 py-20 z-10 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#4A90E2]/20 to-purple-500/20 rounded-3xl border border-white/10 p-12 text-center backdrop-blur-xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Run a Smoother Business?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">Join thousands of businesses managing their daily chaos with MochaEase. Speak to our team today.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">Try For Free</Link>
            <Link href="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-colors">Book a Free Demo</Link>
          </div>
        </div>
      </section>


      <Chatbot />
    </main>
  );
}
