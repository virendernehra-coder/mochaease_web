'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, TrendingUp, Users, Package, 
    ArrowUpRight, ArrowDownRight, Activity, 
    Sparkles, Filter, MoreHorizontal,
    LayoutGrid, List, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';

export default function DashboardPage() {
    const { activeContextId, businessConfig } = useUserStore();
    
    // Simulated context-specific data
    const isGlobal = activeContextId === 'business';
    const contextName = activeContextId === 'business' ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: businessConfig.currency, 
        maximumFractionDigits: 0 
    }).format(val);

    return (
        <div className="space-y-8 pb-20">
            
            {/* Page Title / AI Summary */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3 h-3 text-[#C3EB7A]" />
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">{contextName}</span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Command Center</h1>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3EB7A]/10 text-[#C3EB7A] text-[10px] font-black uppercase tracking-wider border border-[#C3EB7A]/20">
                            <Activity className="w-3 h-3" /> System Optimal
                        </span>
                        <span className="text-white/30 text-xs font-medium tracking-tight">Analytics refreshed 2 minutes ago</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                    <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
                        <button className="p-2 rounded-xl bg-[#C3EB7A] text-black shadow-lg">
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-xl text-white/40 hover:text-white">
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard 
                    title="Total Revenue" 
                    value={isGlobal ? formatCurrency(128430) : formatCurrency(42120)} 
                    trend={isGlobal ? "+12.5%" : "+8.2%"} 
                    isUp={true} 
                    icon={<TrendingUp className="w-5 h-5" />}
                    color="from-[#C3EB7A]/20 to-transparent"
                    borderColor="border-[#C3EB7A]/20"
                />
                <KPICard 
                    title="Active Staff" 
                    value={isGlobal ? "42" : "14"} 
                    trend={isGlobal ? "+2" : "0"} 
                    isUp={true} 
                    icon={<Users className="w-5 h-5" />}
                    color="from-[#4A90E2]/20 to-transparent"
                    borderColor="border-[#4A90E2]/20"
                />
                <KPICard 
                    title="Inventory Health" 
                    value={isGlobal ? "84%" : "92%"} 
                    trend={isGlobal ? "-2.4%" : "+1.1%"} 
                    isUp={!isGlobal} 
                    icon={<Package className="w-5 h-5" />}
                    color="from-purple-500/20 to-transparent"
                    borderColor="border-purple-500/20"
                />
                <KPICard 
                    title="Efficiency Rate" 
                    value={isGlobal ? "91.2%" : "94.5%"} 
                    trend={isGlobal ? "+4.1%" : "+2.3%"} 
                    isUp={true} 
                    icon={<Zap className="w-5 h-5" />}
                    color="from-orange-500/20 to-transparent"
                    borderColor="border-orange-500/20"
                />
            </div>

            {/* Main Visualizer Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Large Chart Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#C3EB7A]/10 to-[#4A90E2]/10 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />
                    <div className="relative h-[480px] bg-[#0F0F0F]/80 border border-white/10 rounded-[32px] p-8 backdrop-blur-3xl overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Sales Performance</h3>
                                <p className="text-white/30 text-sm font-medium">Monitoring throughput across all active outlets.</p>
                            </div>
                            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chart Placeholder Grid */}
                        <div className="w-full h-full flex flex-col justify-end gap-1 pb-16">
                            <div className="flex items-end justify-between gap-2 h-full px-4">
                                {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((h, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                        className="flex-1 bg-gradient-to-t from-[#C3EB7A]/20 to-[#C3EB7A] rounded-t-lg relative group/bar"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#C3EB7A] text-black text-[10px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                            ${h}k
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between px-4 mt-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                <span>Jan</span>
                                <span>Mar</span>
                                <span>May</span>
                                <span>Jul</span>
                                <span>Sep</span>
                                <span>Nov</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* AI Insights & Notifications */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 shadow-2xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-[#C3EB7A]" />
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Moza AI Insights</h3>
                        </div>

                        <div className="space-y-6">
                            <InsightItem 
                                title="Optimize Scheduling"
                                desc="Outlet #102 is currently overstaffed between 2-4 PM on weekdays."
                                color="text-[#C3EB7A]"
                            />
                            <InsightItem 
                                title="Stock Prediction"
                                desc="Mocha supplies are predicted to run low by Friday based on recent demand spikes."
                                color="text-[#4A90E2]"
                            />
                            <InsightItem 
                                title="Labor Cost Alert"
                                desc="Monthly payroll is currently 4% above the target benchmark."
                                color="text-orange-400"
                            />
                        </div>

                        <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                            Run Deep Analysis
                        </button>
                    </motion.div>

                    <div className="bg-[#0F0F0F]/40 border border-white/5 rounded-[32px] p-6">
                         <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4 px-2">RECENT AUDIT TRAIL</h3>
                         <div className="space-y-4">
                            <AuditItem user="Alex Miller" action="Updated Inventory" time="12m ago" />
                            <AuditItem user="System" action="Backup Completed" time="45m ago" />
                            <AuditItem user="Sarah Chen" action="Approved Payroll" time="2h ago" />
                         </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

interface KPICardProps {
    title: string;
    value: string;
    trend: string;
    isUp: boolean;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
}

function KPICard({ title, value, trend, isUp, icon, color, borderColor }: KPICardProps) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className={`relative p-6 rounded-[28px] bg-[#0F0F0F]/80 border ${borderColor} backdrop-blur-xl overflow-hidden group`}
        >
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${color} blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`} />
            
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-black ${isUp ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>

            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{title}</h3>
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
        </motion.div>
    );
}

interface InsightItemProps {
    title: string;
    desc: string;
    color: string;
}

function InsightItem({ title, desc, color }: InsightItemProps) {
    return (
        <div className="group cursor-pointer">
            <h4 className={`text-xs font-black ${color} mb-1 flex items-center gap-2 uppercase tracking-wide`}>
                <div className={`w-1 h-1 rounded-full bg-current`} />
                {title}
            </h4>
            <p className="text-white/40 text-[11px] font-medium leading-relaxed group-hover:text-white/60 transition-colors">{desc}</p>
        </div>
    );
}

interface AuditItemProps {
    user: string;
    action: string;
    time: string;
}

function AuditItem({ user, action, time }: AuditItemProps) {
    return (
        <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/20">
                    {user.charAt(0)}
                </div>
                <div>
                    <h5 className="text-[11px] font-black text-white tracking-tight">{user}</h5>
                    <p className="text-[10px] font-bold text-white/40 leading-none">{action}</p>
                </div>
            </div>
            <span className="text-[9px] font-bold text-white/10 uppercase tracking-tighter">{time}</span>
        </div>
    );
}
