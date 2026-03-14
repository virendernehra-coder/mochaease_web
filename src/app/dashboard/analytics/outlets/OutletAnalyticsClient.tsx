'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, 
    ArrowLeft, 
    TrendingUp, 
    TrendingDown,
    MapPin,
    AlertCircle,
    ChevronRight,
    Users,
    Zap,
    Clock,
    ShoppingCart,
    Filter,
    MoreHorizontal,
    Sparkles,
    LayoutGrid,
    Search
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/store/business-store';
import { formatCurrency, formatCompactNumber } from '@/utils/format';
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip as RechartsTooltip,
    CartesianGrid,
    BarChart,
    Bar,
    Cell
} from 'recharts';

// --- Mock Data ---

const OUTLETS_DATA = [
    { id: 'all-outlets', name: 'Downtown Cafe', location: 'District 1', status: 'Optimal', revenue: 142500, orders: 4200, staff: 12, health: 94, trend: '+12%', alert: null },
    { id: 'outlet-2', name: 'Westside Espresso', location: 'District 4', status: 'Attention', revenue: 82400, orders: 1800, staff: 8, health: 68, trend: '-4%', alert: 'High Labor Cost Variance' },
    { id: 'outlet-3', name: 'Harbor Brews', location: 'Coastal Range', status: 'Optimal', revenue: 112000, orders: 3100, staff: 10, health: 88, trend: '+8%', alert: null },
    { id: 'outlet-4', name: 'Academic Bean', location: 'University Sq', status: 'Critical', revenue: 42100, orders: 900, staff: 5, health: 42, trend: '-18%', alert: 'Stock-out Critical' },
    { id: 'outlet-5', name: 'Parkside Deli', location: 'Central Green', status: 'Optimal', revenue: 95300, orders: 2800, staff: 9, health: 91, trend: '+5%', alert: null },
];

const HEATMAP_DATA = [
    { time: '08:00', 'Downtown Cafe': 45, 'Westside': 30, 'Harbor': 20, 'Academic': 60, 'Parkside': 15 },
    { time: '10:00', 'Downtown Cafe': 85, 'Westside': 50, 'Harbor': 40, 'Academic': 80, 'Parkside': 30 },
    { time: '12:00', 'Downtown Cafe': 95, 'Westside': 90, 'Harbor': 85, 'Academic': 40, 'Parkside': 75 },
    { time: '14:00', 'Downtown Cafe': 70, 'Westside': 65, 'Harbor': 60, 'Academic': 30, 'Parkside': 50 },
    { time: '16:00', 'Downtown Cafe': 60, 'Westside': 45, 'Harbor': 75, 'Academic': 55, 'Parkside': 40 },
    { time: '18:00', 'Downtown Cafe': 80, 'Westside': 55, 'Harbor': 90, 'Academic': 45, 'Parkside': 85 },
    { time: '20:00', 'Downtown Cafe': 90, 'Westside': 70, 'Harbor': 95, 'Academic': 20, 'Parkside': 90 },
    { time: '22:00', 'Downtown Cafe': 40, 'Westside': 20, 'Harbor': 30, 'Academic': 10, 'Parkside': 45 },
];

// --- Components ---

export default function OutletAnalyticsClient() {
    const router = useRouter();
    const { activeContextId } = useBusinessStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'orders' | 'health'>('revenue');

    const filteredOutlets = useMemo(() => {
        return OUTLETS_DATA.filter(o => 
            o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const attentionNeededCount = OUTLETS_DATA.filter(o => o.status !== 'Optimal').length;

    return (
        <div className="space-y-10 pb-24">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-8">
                <div>
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[3px] mb-6 hover:text-[#C3EB7A] transition-all group"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20">
                            <Zap className="w-6 h-6 text-[#C3EB7A]" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-[4px]">Strategic Operations</span>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mt-1">
                                Outlet <span className="text-white/30">Analytics.</span>
                            </h1>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-white/40 max-w-xl leading-relaxed">
                        Cross-outlet operational intelligence. Monitor velocity, detecting performance leaks, and optimizing resource distribution across your entire footprint.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Find outlet..."
                            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-xs font-bold text-white outline-none focus:border-[#C3EB7A]/40 focus:bg-white/[0.08] transition-all w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Critical Attention Section */}
            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <AlertCircle className="w-4 h-4" />
                        </div>
                        <h2 className="text-lg font-black text-white tracking-tight">Attention Center</h2>
                        <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest border border-rose-500/30">
                            {attentionNeededCount} Anomalies
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {OUTLETS_DATA.filter(o => o.status !== 'Optimal').map((outlet, i) => (
                        <AttentionCard key={outlet.id} outlet={outlet} delay={i * 0.1} />
                    ))}
                </div>
            </div>

            {/* Performance Matrix (Global Heatmap) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 md:p-10 rounded-[40px] bg-[#0F0F0F] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LayoutGrid className="w-24 h-24 text-white" />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
                            <div>
                                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[3px] mb-2">Operational Density</h3>
                                <h2 className="text-2xl font-black text-white tracking-tight">Performance Matrix</h2>
                            </div>
                            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
                                <MetricToggle active={selectedMetric === 'revenue'} onClick={() => setSelectedMetric('revenue')} label="Revenue" />
                                <MetricToggle active={selectedMetric === 'orders'} onClick={() => setSelectedMetric('orders')} label="Orders" />
                                <MetricToggle active={selectedMetric === 'health'} onClick={() => setSelectedMetric('health')} label="Health" />
                            </div>
                        </div>

                        <div className="h-[450px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={HEATMAP_DATA}>
                                    <defs>
                                        <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#C3EB7A" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#C3EB7A" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis 
                                        dataKey="time" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 800 }} 
                                    />
                                    <YAxis hide />
                                    <RechartsTooltip content={<CustomMatrixTooltip />} />
                                    <Area type="monotone" dataKey="Downtown Cafe" stroke="#C3EB7A" fillOpacity={1} fill="url(#colorGlobal)" strokeWidth={4} />
                                    <Area type="monotone" dataKey="Westside" stroke="#4A90E2" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                                    <Area type="monotone" dataKey="Harbor" stroke="#8B5CF6" fillOpacity={0} strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <MatrixLegend label="Downtown Cafe" color="#C3EB7A" value="$142.5k" />
                            <MatrixLegend label="Westside" color="#4A90E2" value="$82.4k" />
                            <MatrixLegend label="Harbor Brews" color="#8B5CF6" value="$112k" />
                            <MatrixLegend label="Parkside Deli" color="#F59E0B" value="$95.3k" />
                        </div>
                    </motion.div>
                </div>

                {/* Leaderboard Column */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C3EB7A]/5 blur-[80px] rounded-full" />
                        
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 rounded-xl bg-[#C3EB7A]/10 text-[#C3EB7A]">
                                <Activity className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Global Ranking</h3>
                        </div>

                        <div className="space-y-4">
                            {OUTLETS_DATA.sort((a,b) => b.revenue - a.revenue).map((outlet, i) => (
                                <div key={outlet.id} className="group/row flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs font-black ${i < 2 ? 'text-[#C3EB7A]' : 'text-white/20'}`}>
                                            #{(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div>
                                            <p className="text-xs font-black text-white group-hover/row:text-[#C3EB7A] transition-colors">{outlet.name}</p>
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{outlet.location}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-white">{formatCompactNumber(outlet.revenue)}</p>
                                        <p className={`text-[9px] font-black ${outlet.trend.startsWith('+') ? 'text-[#C3EB7A]' : 'text-rose-400'}`}>
                                            {outlet.trend}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-8 py-4 rounded-2xl bg-[#C3EB7A]/5 border border-[#C3EB7A]/10 text-[#C3EB7A] font-black text-[10px] uppercase tracking-[3px] hover:bg-[#C3EB7A]/10 transition-all flex items-center justify-center gap-2">
                            Compare All Locations <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>

                    {/* AI Insights Proxy */}
                    <div className="p-8 rounded-[38px] bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                        </div>
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">MOZA INTELLIGENCE</h4>
                        <p className="text-xs font-medium text-white/60 leading-relaxed italic mb-6">
                            &quot;Academic Bean (District 4) is showing a <span className="text-white font-bold">24% drop in labor efficiency</span> compared to peer locations. Re-calibration recommended for morning shifts.&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-indigo-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ duration: 1.5 }}
                                />
                            </div>
                            <span className="text-[10px] font-black text-indigo-400">Confidence 92%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid for Individual Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricSmall label="Staffing Density" value="1.4x" desc="Staff per 100 orders" icon={Users} color="text-blue-400" />
                <MetricSmall label="Order Latency" value="4.2m" desc="Global Avg Prepare Time" icon={Clock} color="text-orange-400" />
                <MetricSmall label="Throughput" value="124" desc="Orders / Hour Peak" icon={Zap} color="text-[#C3EB7A]" />
                <MetricSmall label="Customer Loop" value="88%" desc="Returning Customers" icon={ShoppingCart} color="text-purple-400" />
            </div>
        </div>
    );
}

// --- Sub-components ---

function AttentionCard({ outlet, delay }: { outlet: any, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="p-6 rounded-3xl bg-[#0A0A0A] border border-rose-500/10 hover:border-rose-500/30 transition-all group relative overflow-hidden shadow-2xl"
        >
            <div className="absolute -right-4 -top-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <AlertCircle className="w-16 h-16 text-rose-500" />
            </div>

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-black text-white group-hover:text-rose-400 transition-colors uppercase tracking-tight">{outlet.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-white/20" />
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{outlet.location}</span>
                    </div>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    outlet.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                }`}>
                    {outlet.status}
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
                <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Diagnosed Issue</p>
                <p className="text-xs font-bold text-white leading-relaxed">{outlet.alert}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Health Score</p>
                    <div className="flex items-end gap-2">
                        <span className="text-xl font-black text-white">{outlet.health}%</span>
                        <TrendingDown className="w-4 h-4 text-rose-500 mb-1" />
                    </div>
                </div>
                <div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Delta</p>
                    <span className="text-xl font-black text-rose-500">{outlet.trend}</span>
                </div>
            </div>

            <button className="w-full mt-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-[2px] group-hover:bg-rose-500 group-hover:text-white transition-all">
                INITIATE AUDIT
            </button>
        </motion.div>
    );
}

function MetricToggle({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button 
            onClick={onClick}
            className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                active ? 'bg-[#C3EB7A] text-black shadow-lg shadow-[#C3EB7A]/10 scale-105' : 'text-white/30 hover:text-white'
            }`}
        >
            {label}
        </button>
    );
}

function MatrixLegend({ label, color, value }: { label: string, color: string, value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]" style={{ backgroundColor: color }} />
            <div>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-xs font-black text-white leading-none">{value}</p>
            </div>
        </div>
    );
}

function MetricSmall({ label, value, desc, icon: Icon, color }: any) {
    return (
        <div className="p-6 rounded-[32px] bg-[#0F0F0F] border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center group">
            <div className={`p-3 rounded-2xl bg-white/5 ${color} mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
            </div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{label}</h4>
            <p className="text-xl font-black text-white mb-2">{value}</p>
            <p className="text-[10px] font-bold text-white/10 leading-relaxed italic">{desc}</p>
        </div>
    );
}

function CustomMatrixTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111111]/90 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] shadow-2xl w-64 ring-1 ring-white/5">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[3px] mb-4">{label}</p>
                <div className="space-y-4">
                    {payload.map((p: any, i: number) => (
                        <div key={i} className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{p.name}</span>
                            </div>
                            <span className="text-sm font-black text-white">{p.value}% <span className="text-[9px] text-white/20">Load</span></span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
}
