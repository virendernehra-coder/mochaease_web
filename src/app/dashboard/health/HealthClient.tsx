'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, ShieldCheck, TrendingUp, Users, 
    Wallet, Zap, ArrowUpRight, ChevronRight,
    Sparkles, AlertCircle, CheckCircle2, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';

export default function HealthClient() {
    const { activeContextId } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';
    
    // Simulate context-specific scores
    const overallScore = isGlobal ? 82 : activeContextId === 'outlet-1' ? 88 : 74;
    const financeScore = isGlobal ? 88 : 92;
    const opsScore = isGlobal ? 76 : 84;
    const teamScore = isGlobal ? 92 : 88;
    const retentionScore = isGlobal ? 71 : 79;
    
    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Health Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Activity className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[3px]">Ecosystem Vitality</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-blue-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Business <span className="text-white/30">Health.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        A holistic scorecard of your enterprise performance across finance, operations, team, and retention.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-[#C3EB7A]/5 border border-[#C3EB7A]/10 rounded-2xl p-4 backdrop-blur-xl">
                    <div className="w-10 h-10 rounded-full bg-[#C3EB7A] flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Health Status</h4>
                        <p className="text-[10px] text-[#C3EB7A] font-bold leading-tight">OPTIMIZED CONTEXT</p>
                    </div>
                </div>
            </div>

            {/* Primary Scorecard Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Main Health Gauge (Placeholder for now) */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Circle Gauge Mockup */}
                    <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="96" cy="96" r="88" className="stroke-white/5 fill-none" strokeWidth="12" />
                            <circle 
                                cx="96" cy="96" r="88" 
                                className="stroke-blue-500 fill-none" 
                                strokeWidth="12" 
                                strokeDasharray="553" 
                                strokeDashoffset={553 - (553 * overallScore / 100)} 
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-white tracking-tighter">{overallScore}</span>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[2px]">Score / 100</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">Overall Vitality</h3>
                    <p className="text-sm text-white/40 mb-6">
                        {isGlobal ? "You are performing +5% above your quarterly target." : "This outlet is performing +8% above local target."}
                    </p>
                    
                    <div className="w-full h-[1px] bg-white/5 mb-6" />
                    
                    <div className="grid grid-cols-2 gap-8 w-full">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Target</p>
                            <p className="text-lg font-bold text-white">75.0</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Status</p>
                            <p className="text-lg font-bold text-[#C3EB7A]">HEALTHY</p>
                        </div>
                    </div>
                </div>

                {/* Departmental Breakdown */}
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard title="Finance level" score={financeScore} icon={<Wallet className="w-5 h-5 text-emerald-400" />} color="emerald" />
                    <MetricCard title="Ops level" score={opsScore} icon={<TrendingUp className="w-5 h-5 text-blue-400" />} color="blue" />
                    <MetricCard title="Team level" score={teamScore} icon={<Users className="w-5 h-5 text-purple-400" />} color="purple" />
                    <MetricCard title="Retention level" score={retentionScore} icon={<ShieldCheck className="w-5 h-5 text-amber-400" />} color="amber" />
                </div>
            </div>

            {/* Moza Recommendations Engine */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">Moza Recommendations</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#C3EB7A] animate-pulse" />
                        <span className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-wider">AI ACTIVE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <RecommendationCard 
                        dept="Finance" 
                        text="Re-optimize Swiggy commission logic to save ~3.2% in operating costs." 
                        priority="High"
                    />
                    <RecommendationCard 
                        dept="Ops" 
                        text="Inventory lag in Outlet #4. Stock replenishment required in next 48h." 
                        priority="Critical"
                    />
                    <RecommendationCard 
                        dept="Team" 
                        text="Peak hours (Friday 7PM) show staff fatigue. Suggesting dynamic shift rotation." 
                        priority="Medium"
                    />
                    <RecommendationCard 
                        dept="Retention" 
                        text="Customer comeback rate is slowing. Activate 'Loyal-Express' campaign." 
                        priority="High"
                    />
                </div>
            </div>

        </div>
    );
}

function MetricCard({ title, score, icon, color }: { title: string, score: number, icon: React.ReactNode, color: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group cursor-pointer overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500/20 group-hover:bg-${color}-500 transition-all`} />
            <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">{icon}</div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-black text-white">{score}</p>
                </div>
            </div>
            <h4 className="text-lg font-black text-white mb-2">{title}</h4>
            <div className="flex items-center justify-between">
                <div className="h-1.5 flex-1 bg-white/5 rounded-full mr-4 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${color === 'emerald' ? 'from-emerald-500' : color === 'blue' ? 'from-blue-500' : color === 'purple' ? 'from-purple-500' : 'from-amber-500'} to-transparent`}
                    />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
            </div>
        </div>
    );
}

function RecommendationCard({ dept, text, priority }: { dept: string, text: string, priority: 'High' | 'Critical' | 'Medium' }) {
    return (
        <div className="p-6 rounded-[28px] bg-[#0A0A0A]/60 border border-white/5 hover:border-[#C3EB7A]/20 transition-all flex flex-col gap-4 group">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[2px]">{dept}</span>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                    priority === 'Critical' ? 'text-red-400 border-red-400/20 bg-red-400/5' : 
                    priority === 'High' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' : 
                    'text-blue-400 border-blue-400/20 bg-blue-400/5'
                }`}>{priority}</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed flex-1 italic group-hover:text-white transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest hover:gap-2 transition-all">
                Execute <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
