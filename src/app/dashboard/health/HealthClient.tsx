'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, ShieldCheck, TrendingUp, Users, 
    Wallet, Zap, ArrowUpRight, ChevronRight,
    Sparkles, AlertCircle, CheckCircle2, MapPin,
    Calendar, TrendingDown, LayoutGrid, Info, ArrowRight,
    BrainCircuit, Target, UserPlus, X, Search, Loader2
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, TooltipProps 
} from 'recharts';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { type Recommendation, type Task, type HealthSummary } from '@/utils/supabase/queries';
import { getHealthSummary, getHealthHistory, getBusinessOutlets, getEmployees, createTask } from '@/utils/supabase/queries-client';

export default function HealthClient() {
    const { user } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const [scoreType, setScoreType] = useState<'weekly' | 'monthly'>('monthly');
    const [activeTab, setActiveTab] = useState<string>("");
    const [assigningRec, setAssigningRec] = useState<Recommendation | null>(null);
    
    const isGlobal = activeContextId === 'business';
    const businessId = user?.business_id;
    const outletId = isGlobal ? null : activeContextId;

    // Fetch latest health snapshot
    const { data: healthData, isLoading: isLoadingSummary } = useQuery({
        queryKey: ['health-summary', businessId, outletId, scoreType],
        queryFn: () => getHealthSummary(businessId!, outletId, scoreType),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 5,
    });

    // Fetch historical data for charts
    const { data: healthHistory = [], isLoading: isLoadingHistory } = useQuery({
        queryKey: ['health-history', businessId, outletId, scoreType],
        queryFn: () => getHealthHistory(businessId!, outletId, scoreType, 15),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 5,
    });

    // Deep Fallback: Fetch history of the OTHER type to find hidden recommendations
    const isLoading = isLoadingSummary || isLoadingHistory;
    const contextName = isGlobal ? 'Global Business' : 'Selected Outlet';

    // Simplified Recommendation Fetching (Direct Global Binding)
    const { data: currentPeriodRecs = [] } = useQuery({
        queryKey: ['health-current-recs', businessId, outletId, scoreType, healthData?.period_start_date],
        queryFn: async (): Promise<Recommendation[]> => {
            const supabase = createClient();
            
            // 1. GLOBAL CONTEXT: Bind directly from business summaries if possible
            if (isGlobal && healthData?.recommendations && Array.isArray(healthData.recommendations) && healthData.recommendations.length > 0) {
                console.log('Health Bind: Found direct global recommendations');
                return healthData.recommendations as Recommendation[];
            }

            // 2. OUTLET CONTEXT: Bind directly from outlet summaries if possible
            if (!isGlobal && healthData?.recommendations && Array.isArray(healthData.recommendations) && healthData.recommendations.length > 0) {
                console.log('Health Bind: Found direct outlet recommendations');
                return healthData.recommendations as Recommendation[];
            }

            // 3. ECOSYSTEM RELAY: If direct binding is empty, scan for any available strategy in THIS PERIOD
            console.log('Health Relay: Scanning for ecosystem strategy...', { scoreType, period: healthData?.period_start_date });
            
            const { data } = await supabase
                .from('outlet_health_summaries')
                .select('recommendations, outlet_name')
                .eq('business_id', businessId!)
                .eq('score_type', scoreType)
                .eq('period_start_date', healthData?.period_start_date || '')
                .not('recommendations', 'is', null)
                .limit(10);
            
            if (data) {
                for (const row of data) {
                    // Recursive Decoder for Multi-Column Relay
                    const recCols = [
                        { key: 'financial_recs', category: 'Financial' },
                        { key: 'operational_recs', category: 'Operational' },
                        { key: 'workforce_recs', category: 'Workforce' },
                        { key: 'customer_recs', category: 'Customer' },
                        { key: 'recommendations', category: 'General' }
                    ];

                    let inheritedRecs: Recommendation[] = [];

                    for (const col of recCols) {
                        let rawVal = (row as any)[col.key];
                        if (!rawVal) continue;

                        let parsed = rawVal;
                        let parseCount = 0;
                        while (typeof parsed === 'string' && parseCount < 5) {
                            try {
                                const next = JSON.parse(parsed);
                                if (next === parsed) break;
                                parsed = next;
                                parseCount++;
                            } catch { break; }
                        }

                        if (Array.isArray(parsed)) {
                            const normalized = parsed.map(item => ({
                                ...item,
                                category: col.category,
                                recommendation_text: item.recommendation_text || item.text || ''
                            }));
                            inheritedRecs = [...inheritedRecs, ...normalized];
                        }
                    }

                    if (inheritedRecs.length > 0) {
                        console.log(`Health Relay SUCCESS: Bound ${inheritedRecs.length} strategies from ${row.outlet_name}`);
                        return inheritedRecs;
                    }
                }
            }

            console.warn('Health Bind FAILURE: No strategies found in business ecosystem for this period');
            return [];
        },
        enabled: !!businessId && !!healthData,
        staleTime: 1000 * 60 * 5,
    });
    
    // Core metrics from database
    const metrics = useMemo(() => {
        const parseValue = (val: any) => typeof val === 'string' ? parseFloat(val) : (val ?? 0);
        return {
            overall: parseValue(healthData?.overall_score),
            finance: parseValue(healthData?.financial_score),
            ops: parseValue(healthData?.operational_score),
            team: parseValue(healthData?.workforce_score),
            retention: parseValue(healthData?.customer_score),
        };
    }, [healthData]);

    const targetScore = 75;
    const healthStatus = healthData?.is_current_period ? 'CURRENT' : healthData ? 'LATEST RECORD' : 'NO DATA FOUND';

    const { activeRecs, isFallback, fallbackSource } = useMemo(() => {
        if (currentPeriodRecs.length > 0) {
            return { 
                activeRecs: currentPeriodRecs, 
                isFallback: isGlobal && (!healthData?.recommendations || (healthData.recommendations as any[]).length === 0), 
                fallbackSource: 'Outlet Intel Relay' 
            };
        }
        return { activeRecs: [], isFallback: false, fallbackSource: null };
    }, [currentPeriodRecs, isGlobal, healthData]);

    // 1. BULLETPROOF DECODING STEP (Defensive UI Layer)
    const safeRecommendations: Recommendation[] = useMemo(() => {
        try {
            if (!activeRecs) return [];
            
            // Re-verify as array even if it passed the relay/query
            if (Array.isArray(activeRecs)) return activeRecs;
            
            // Emergency parse if something slipped through
            if (typeof activeRecs === 'string') {
                const parsed = JSON.parse(activeRecs);
                return Array.isArray(parsed) ? parsed : [];
            }
            return [];
        } catch (error) {
            console.error("Health UI: Bulletproof parse failed", error);
            return [];
        }
    }, [activeRecs]);

    const categorizedRecs = useMemo(() => {
        if (!safeRecommendations || safeRecommendations.length === 0) return {};

        return safeRecommendations.reduce((acc: Record<string, Recommendation[]>, item) => {
            const cat = item.category || 'General';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
        }, {});
    }, [safeRecommendations]);

    const categories = useMemo(() => Object.keys(categorizedRecs), [categorizedRecs]);

    // Safety check: If categories change, ensure activeTab is valid
    React.useEffect(() => {
        if (categories.length > 0 && (!activeTab || !categories.includes(activeTab))) {
            setActiveTab(categories[0]);
        }
    }, [categories, activeTab]);

    // Prepare chart data (chronological order)
    const chartData = useMemo(() => {
        return [...healthHistory].reverse().map(item => ({
            date: new Date(item.period_start_date).toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric' 
            }),
            score: typeof item.overall_score === 'string' ? parseFloat(item.overall_score) : item.overall_score
        }));
    }, [healthHistory]);

    const tabs = useMemo(() => {
        const iconMap: Record<string, any> = {
            'Financial': Wallet,
            'Operational': Activity,
            'Workforce': Users,
            'Customer': Target,
            'General': Sparkles
        };
        const colorMap: Record<string, string> = {
            'Financial': '#C3EB7A',
            'Operational': '#60A5FA',
            'Workforce': '#F87171',
            'Customer': '#A855F7',
            'General': '#C3EB7A'
        };

        return categories.map(cat => ({
            id: cat,
            label: cat,
            icon: iconMap[cat] || LayoutGrid,
            color: colorMap[cat] || '#FFFFFF',
            count: categorizedRecs[cat].length
        }));
    }, [categories, categorizedRecs]);

    if (isLoading && !healthData) {
        return (
            <div className="h-[600px] w-full flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#C3EB7A]/20 border-t-[#C3EB7A] rounded-full animate-spin" />
                <p className="text-white/20 font-black uppercase tracking-[4px] text-xs">Synchronizing Ecosystem Vitality...</p>
            </div>
        );
    }

    return (
        <>
        <div className="w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-12 pb-16 sm:pb-24 overflow-x-hidden">
            
            {/* Health Header & Toggle */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 sm:gap-8 pb-4 sm:pb-6 border-b border-white/5">
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                            <span className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-[2px] sm:tracking-[3px]">Diagnostic Intelligence</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-white/20" />
                                <span className="text-[8px] sm:text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                    {isGlobal ? 'Global Business' : (healthData as any)?.outlet_name || 'Selected Outlet'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.85] sm:leading-[0.9] truncate">
                        Enterprise <span className="text-white/30">Vita.</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                    {/* Weekly / Monthly Toggle */}
                    <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex items-center shadow-inner">
                        <button 
                            onClick={() => setScoreType('weekly')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                                scoreType === 'weekly' 
                                ? 'bg-[#C3EB7A] text-black shadow-lg scale-[1.02]' 
                                : 'text-white/30 hover:text-white'
                            }`}
                        >
                            Weekly
                        </button>
                        <button 
                            onClick={() => setScoreType('monthly')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                                scoreType === 'monthly' 
                                ? 'bg-[#C3EB7A] text-black shadow-lg scale-[1.02]' 
                                : 'text-white/30 hover:text-white'
                            }`}
                        >
                            Monthly
                        </button>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 bg-[#C3EB7A]/5 border border-[#C3EB7A]/10 rounded-2xl p-3 sm:p-4 backdrop-blur-xl">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${healthData?.is_current_period ? 'bg-[#C3EB7A]' : 'bg-white/10 text-white/30'}`}>
                            <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${healthData?.is_current_period ? 'text-black' : ''}`} />
                        </div>
                        <div>
                            <h4 className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase tracking-wider">Sync Status</h4>
                            <p className={`text-[9px] sm:text-[10px] font-bold leading-tight uppercase ${healthData?.is_current_period ? 'text-[#C3EB7A]' : 'text-white/20'}`}>{healthStatus}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vitality Matrix: Gauge + Trends */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8">
                
                {/* Main Score Gauge */}
                <div className="xl:col-span-2 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50" />
                    <div className="absolute top-6 sm:top-8 left-6 sm:left-8 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C3EB7A] animate-pulse" />
                        <span className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[2px]">Core Index</span>
                    </div>

                    <div className="relative w-full max-w-[200px] sm:max-w-[280px] aspect-square mb-6 sm:mb-10 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]" viewBox="0 0 256 256">
                            <circle cx="128" cy="128" r="110" className="stroke-white/[0.03] fill-none" strokeWidth="16" />
                            <motion.circle 
                                initial={{ strokeDashoffset: 691 }}
                                animate={{ strokeDashoffset: 691 - (691 * metrics.overall / 100) }}
                                transition={{ duration: 2, ease: "circOut" }}
                                cx="128" cy="128" r="110" 
                                className="stroke-blue-500 fill-none" 
                                strokeWidth="16" 
                                strokeDasharray="691" 
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-5xl sm:text-7xl font-black text-white tracking-tighter"
                            >
                                {metrics.overall}
                            </motion.span>
                            <span className="text-[9px] sm:text-[11px] font-black text-white/30 uppercase tracking-[2px] sm:tracking-[3px]">Score / 100</span>
                        </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black text-white">Overall Vitality</h3>
                        <p className="text-xs sm:text-sm text-white/40 max-w-xs mx-auto mb-4 sm:mb-6">
                            Based on {healthHistory.length} data points, your performance is <span className={metrics.overall >= targetScore ? 'text-[#C3EB7A]' : 'text-red-400'}>
                                {metrics.overall >= targetScore ? 'above' : 'below'}
                            </span> its optimal threshold.
                        </p>
                    </div>
                </div>

                {/* Trend Analysis Chart */}
                <div className="xl:col-span-3 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] bg-[#0A0A0A] border border-white/10 relative group overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">Vitality Trend</h3>
                            <p className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[2px]">Longitudinal Performance Matrix</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#C3EB7A]" />
                            <span className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest">History: {scoreType}</span>
                        </div>
                    </div>

                    <div className="h-[200px] sm:h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis 
                                    dataKey="date" 
                                    stroke="rgba(255,255,255,0.2)" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis 
                                    domain={[0, 100]} 
                                    stroke="rgba(255,255,255,0.2)" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false}
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#3B82F6" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorScore)" 
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Dashboard Analytics Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">Functional Health</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <Info className="w-4 h-4 text-white/20 hover:text-white transition-colors cursor-pointer" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 min-w-0">
                    <ScoreCard 
                        title="Financial Vitality" 
                        score={healthData?.financial_score} 
                        icon={Wallet} 
                        color="#C3EB7A" 
                        delay={0.1}
                    />
                    <ScoreCard 
                        title="Operational Excellence" 
                        score={healthData?.operational_score} 
                        icon={Activity} 
                        color="#60A5FA" 
                        delay={0.2}
                    />
                    <ScoreCard 
                        title="Workforce Resilience" 
                        score={healthData?.workforce_score} 
                        icon={Users} 
                        color="#F87171" 
                        delay={0.3}
                    />
                    <ScoreCard 
                        title="Customer Synergy" 
                        score={healthData?.customer_score} 
                        icon={Target} 
                        color="#A855F7" 
                        delay={0.4}
                    />
                </div>

                {/* Tabbed Intelligence Section */}
                <div id="intelligence-hub" className="space-y-6 sm:space-y-8 bg-white/[0.02] border border-white/5 rounded-[32px] sm:rounded-[48px] p-4 sm:p-8 md:p-12 mt-8 sm:mt-12 overflow-hidden">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <BrainCircuit className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Departmental Intelligence</h2>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-white/40 max-w-xl">Deep contextual AI strategies generated for your specific business ecosystem.</p>
                        </div>
                        
                        <div className="flex bg-black/60 p-1 rounded-xl sm:rounded-3xl border border-white/10 overflow-x-auto no-scrollbar backdrop-blur-3xl shadow-2xl relative w-full">
                           {tabs.map((tab) => {
                               const isActive = activeTab === tab.id;
                               return (
                                   <button
                                       key={tab.id}
                                       onClick={() => setActiveTab(tab.id as any)}
                                       className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-2xl transition-all duration-700 relative group/tab whitespace-nowrap min-w-0 ${
                                           isActive 
                                           ? 'bg-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.4)] scale-[1.02] -translate-y-[1px]' 
                                           : 'text-white/20 hover:text-white/50 hover:bg-white/[0.02]'
                                       }`}
                                   >
                                       {isActive && (
                                           <motion.div 
                                               layoutId="activeTabGlow"
                                               className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg sm:rounded-2xl"
                                               transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                           />
                                       )}
                                       <tab.icon 
                                           className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-700 relative z-10 ${isActive ? 'scale-110' : 'opacity-40 group-hover/tab:opacity-100'}`} 
                                           style={{ color: isActive ? tab.color : '' }} 
                                       />
                                       <div className="flex flex-col items-start leading-none relative z-10 min-w-0">
                                           <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[1px] sm:tracking-[2px] truncate max-w-[80px] sm:max-w-none">{tab.label}</span>
                                           <span className={`text-[6px] sm:text-[8px] font-bold mt-0.5 sm:mt-1 tracking-wider uppercase transition-colors duration-700 ${isActive ? 'text-white/40' : 'text-white/10 group-hover/tab:text-white/20'}`}>
                                               {tab.count} Protocols
                                           </span>
                                       </div>
                                   </button>
                               );
                           })}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-12 min-w-0"
                        >
                            <div className="xl:col-span-2 space-y-6 sm:space-y-8 min-w-0">
                                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                        Strategic Roadmap
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    </h3>
                                    {isFallback && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                                            <Calendar className="w-3 h-3 text-orange-400" />
                                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest leading-none">
                                                Active Fallback: From {fallbackSource} Strategy
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {categorizedRecs[activeTab]?.length > 0 ? (
                                        categorizedRecs[activeTab].map((rec, i) => (
                                            <motion.div 
                                                key={rec.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="group relative p-6 sm:p-8 bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-[40px] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 hover:scale-[1.01] overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                                    <BrainCircuit className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
                                                </div>
                                                <div className="flex gap-4 sm:gap-8 items-start relative z-10">
                                                    <div className="mt-1.5 flex-shrink-0 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                                                    <div className="space-y-3 sm:space-y-4 flex-1">
                                                        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium">
                                                            {rec.recommendation_text}
                                                        </p>
                                                        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 sm:pt-2">
                                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                                    <Zap className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#C3EB7A]" />
                                                                    <span className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">Efficiency Mode</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                                    <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-blue-400" />
                                                                    <span className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">AI Generated</span>
                                                                </div>
                                                            </div>
                                                            <button 
                                                                onClick={() => setAssigningRec(rec)}
                                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20 hover:bg-[#C3EB7A] hover:text-black transition-all text-[9px] font-black uppercase tracking-widest"
                                                            >
                                                                <UserPlus className="w-3 h-3" />
                                                                Assign to Team
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 px-8 border-2 border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
                                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                                                <LayoutGrid className="w-10 h-10 stroke-[1.5px]" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white/40 tracking-tight mb-2">Sector Optimization Confirmed</h4>
                                            <p className="text-sm text-white/20 text-center max-w-sm leading-relaxed">
                                                Our predictive engine shows no critical interventions needed for this department right now. Next audit in 12 hours.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-white">Actionable Intelligence</h3>
                                <div className="p-10 bg-black/60 border border-white/10 rounded-[48px] space-y-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    
                                    <div className="space-y-3 relative z-10">
                                        <div className="flex justify-between items-end">
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[3px]">Urgency Index</p>
                                            <p className="text-sm font-bold text-[#C3EB7A]">High Priority</p>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                className="h-full bg-gradient-to-r from-blue-500 via-[#C3EB7A] to-emerald-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[3px]">Sector Focus</p>
                                        <div className="flex flex-wrap gap-3">
                                            {['Hyper Scaling', 'Efficiency Ops', 'Risk Mitigation', 'Unit Economics'].map(tag => (
                                                <span key={tag} className="px-5 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/60 hover:border-white/20 hover:text-white transition-all">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="relative z-10 w-full py-4 sm:py-6 bg-white text-black font-black text-[11px] sm:text-[13px] uppercase tracking-[2px] sm:tracking-[3px] rounded-[20px] sm:rounded-3xl hover:bg-[#C3EB7A] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                                        Automate Execution
                                    </button>
                                </div>

                                <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.01] flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-0.5">Real-time Stream</p>
                                        <p className="text-[11px] text-white/30 leading-relaxed font-medium">Monitoring delta changes across {activeTab} indices.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Critical Spotlight */}
            {categorizedRecs['General']?.length > 0 && (
                <div className="p-8 sm:p-12 rounded-[40px] sm:rounded-[56px] bg-[#0A0A0A] border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform duration-1000">
                        <Sparkles className="w-64 h-64 text-[#C3EB7A]" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#C3EB7A] shadow-[0_0_15px_#C3EB7A]" />
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Enterprise Spotlight</h2>
                        </div>
                        
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                                    {categorizedRecs['General'].map((rec, i) => (
                                        <div key={rec.id} className="p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#C3EB7A]/30 hover:bg-white/[0.04] transition-all flex items-start gap-4 sm:gap-6 group/rec">
                                            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] group-hover/rec:scale-110 transition-transform">
                                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="flex-1 space-y-4 sm:space-y-6">
                                                <p className="text-white/80 text-base sm:text-lg leading-relaxed font-medium italic">&quot;{rec.recommendation_text}&quot;</p>
                                                <div className="flex items-center justify-between gap-4">
                                                    <button className="flex items-center gap-2 text-[8px] sm:text-[10px] font-black text-[#60A5FA] uppercase tracking-widest hover:gap-3 transition-all">
                                                        Initiate Global Protocol <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setAssigningRec(rec)}
                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20 hover:bg-[#C3EB7A] hover:text-black transition-all text-[8px] sm:text-[9px] font-black uppercase tracking-widest"
                                                    >
                                                        <UserPlus className="w-3 h-3" />
                                                        Assign Task
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                    </div>
                </div>
            )}

        </div>


        <AnimatePresence>
            {assigningRec && (
                <TaskAssignmentModal 
                    recommendation={assigningRec} 
                    onClose={() => setAssigningRec(null)} 
                    businessId={businessId!}
                    initialOutletId={outletId}
                    isGlobal={isGlobal}
                />
            )}
        </AnimatePresence>
        </>
    );
}

function TaskAssignmentModal({ recommendation, onClose, businessId, initialOutletId, isGlobal }: any) {
    const [step, setStep] = useState(isGlobal ? 'outlet' : 'employee');
    const [selectedOutlet, setSelectedOutlet] = useState<any>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useUserStore();

    // Fetch Outlets
    const { data: outlets = [], isLoading: isLoadingOutlets } = useQuery({
        queryKey: ['assignment-outlets', businessId],
        queryFn: () => getBusinessOutlets(businessId),
        enabled: isGlobal && step === 'outlet'
    });

    // Fetch Employees
    const activeOutletId = selectedOutlet?.outlet_id || initialOutletId;
    const { data: employees = [], isLoading: isLoadingEmployees } = useQuery({
        queryKey: ['assignment-employees', activeOutletId],
        queryFn: () => getEmployees(activeOutletId, false),
        enabled: !!activeOutletId && step === 'employee'
    });

    const handleAssign = async () => {
        if (!selectedEmployee || !activeOutletId) return;
        setIsSubmitting(true);
        try {
            await createTask({
                business_id: businessId,
                outlet_id: activeOutletId,
                title: recommendation.recommendation_text || recommendation.text,
                description: `Assigned from Health Recommendation: ${recommendation.category} index`,
                status: 'todo',
                priority: recommendation.category === 'Financial' ? 'high' : 'medium',
                assigned_to_user_id: selectedEmployee.employee_id,
                created_by_user_id: user?.id || null,
                due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days default
                recommendation_reference_id: recommendation.id,
                employee_name: `${selectedEmployee.first_name} ${selectedEmployee.last_name}`
            });
            onClose();
        } catch (error) {
            console.error('Failed to create task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative"
            >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Assign Strategic Protocol</h3>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mt-1">Deployment Phase: {step.toUpperCase()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-6">
                    {/* Rec Preview */}
                    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                        <p className="text-xs text-blue-400 font-medium leading-relaxed">&quot;{recommendation.recommendation_text || recommendation.text}&quot;</p>
                    </div>

                    {step === 'outlet' && (
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest px-1">Select Target Outlet</p>
                            {isLoadingOutlets ? (
                                <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 text-[#C3EB7A] animate-spin" /></div>
                            ) : (
                                <div className="grid grid-cols-1 gap-2">
                                    {outlets.map((outlet: any) => (
                                        <button 
                                            key={outlet.outlet_id}
                                            onClick={() => {
                                                setSelectedOutlet(outlet);
                                                setStep('employee');
                                            }}
                                            className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-white/70 group-hover:text-white">{outlet.outlet_name}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-[#C3EB7A] group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'employee' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Assign to Personnel</p>
                                {isGlobal && (
                                    <button onClick={() => setStep('outlet')} className="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:underline">Change Outlet</button>
                                )}
                            </div>
                            {isLoadingEmployees ? (
                                <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 text-[#C3EB7A] animate-spin" /></div>
                            ) : employees.length === 0 ? (
                                <div className="py-8 text-center text-white/20 text-xs font-medium italic">No personnel found in this sector.</div>
                            ) : (
                                <div className="grid grid-cols-1 gap-2">
                                    {employees.map((emp: any) => (
                                        <button 
                                            key={emp.employee_id}
                                            onClick={() => setSelectedEmployee(selectedEmployee?.employee_id === emp.employee_id ? null : emp)}
                                            className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                                                selectedEmployee?.employee_id === emp.employee_id 
                                                ? 'bg-[#C3EB7A]/10 border-[#C3EB7A]/50' 
                                                : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                                            }`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                                                selectedEmployee?.employee_id === emp.employee_id ? 'bg-[#C3EB7A] text-black' : 'bg-white/5 text-white/40'
                                            }`}>
                                                {emp.first_name[0]}{emp.last_name[0]}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-white">{emp.first_name} {emp.last_name}</p>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider">{emp.role_id_employee || 'Member'}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-black/40 border-t border-white/5">
                    <button 
                        disabled={!selectedEmployee || isSubmitting}
                        onClick={handleAssign}
                        className="w-full py-5 rounded-2xl bg-[#C3EB7A] disabled:bg-white/5 disabled:text-white/20 text-black font-black text-[13px] uppercase tracking-[3px] shadow-lg hover:bg-[#b0d46d] transition-all flex items-center justify-center gap-3 group"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Initiate Deployment
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

function ScoreCard({ title, score, icon: Icon, color, delay }: any) {
    const value = typeof score === 'string' ? parseFloat(score) : score || 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="group relative p-5 sm:p-8 bg-white/[0.02] border border-white/5 rounded-[28px] sm:rounded-[40px] overflow-hidden hover:bg-white/[0.04] transition-all duration-700 min-w-0"
        >
            <div className="absolute -top-16 sm:-top-24 -right-16 sm:-right-24 w-32 sm:w-48 h-32 sm:h-48 rounded-full blur-[80px] sm:blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: color }} />
            
            <div className="relative z-10 flex flex-col h-full space-y-6 sm:space-y-8">
                <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
                    </div>
                    <div className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <p className="text-[8px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest">{value > 75 ? 'Optimal' : value > 50 ? 'Stable' : 'Critical'}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] sm:text-[11px] font-bold text-white/40 uppercase tracking-[1.5px] sm:tracking-[2px] mb-1 sm:mb-2">{title}</h3>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{Math.round(value)}</span>
                        <span className="text-sm sm:text-xl font-bold text-white/20">%</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.3 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
                        <span>Reliability Index</span>
                        <span style={{ color }}>{value}%</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <p className="text-[10px] font-medium text-white/40 italic leading-relaxed">
                        Sector analysis active.
                    </p>
                    <ArrowUpRight className="w-3 h-3 text-white/10 group-hover:text-white/30 transition-colors" />
                </div>
            </div>
        </motion.div>
    );
}

function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1A1A1A] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-2">{payload[0].payload.date}</p>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <p className="text-xl font-black text-white">{payload[0].value}%</p>
                </div>
                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mt-1">Vitality Score</p>
            </div>
        );
    }
    return null;
}
