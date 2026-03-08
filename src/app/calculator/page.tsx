'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    Timer, ShieldCheck, PieChart as PieChartIcon,
    TrendingUp, Bolt, Store, AlertTriangle,
    CheckCircle2, Cpu, Clock, BrainCircuit, Activity, ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { COUNTRIES } from '@/lib/countries';

// Type definitions based on Flutter code
type BusinessType = 'Retail' | 'Fashion' | 'F&B / Restaurant';
type Country = string;

const COLORS = {
    inventory: '#C3EB7A', // Neon Green
    delivery: '#FF9500',  // Orange
    ops: '#4A90E2',      // Blue
    admin: '#E040FB',    // Purple
    positive: '#C3EB7A',
    negative: '#FF3B30',
    glass: 'rgba(255, 255, 255, 0.05)',
    card: 'rgba(20, 20, 20, 0.8)',
};

export default function CalculatorPage() {
    // Input State
    const [monthlyRevenue, setMonthlyRevenue] = useState<number>(50000);
    const [monthlyInventoryCost, setMonthlyInventoryCost] = useState<number>(15000);
    const [staffCost, setStaffCost] = useState<number>(10000);
    const [monthlyOnlineSales, setMonthlyOnlineSales] = useState<number>(8000);
    const [country, setCountry] = useState<Country>('USA');
    const [businessType, setBusinessType] = useState<BusinessType>('F&B / Restaurant');

    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

    const getScaler = (c: string) => {
        if (c === 'India') return 80;
        if (c === 'Indonesia') return 15000;
        return 1;
    };

    const handleCountryChange = (newCountry: string) => {
        const oldScaler = getScaler(country);
        const newScaler = getScaler(newCountry);
        const conversionRate = newScaler / oldScaler;

        setMonthlyRevenue(Math.round(monthlyRevenue * conversionRate));
        setMonthlyInventoryCost(Math.round(monthlyInventoryCost * conversionRate));
        setStaffCost(Math.round(staffCost * conversionRate));
        setMonthlyOnlineSales(Math.round(monthlyOnlineSales * conversionRate));

        setCountry(newCountry);
    };

    const [lossSinceLoad, setLossSinceLoad] = useState<number>(0);
    const [activeSlice, setActiveSlice] = useState<number | null>(null);

    // Formatters
    const getSymbol = () => {
        if (country === 'India') return '₹';
        if (country === 'Indonesia') return 'Rp ';
        return '$';
    };

    const formatMoney = (amount: number) => {
        const symbol = getSymbol();
        if (country === 'India') {
            if (amount >= 10000000) return `${symbol}${(amount / 10000000).toFixed(2)} Cr`;
            if (amount >= 100000) return `${symbol}${(amount / 100000).toFixed(2)} L`;
            return `${symbol}${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
        }
        if (amount >= 1000000000) return `${symbol}${(amount / 1000000000).toFixed(1)}B`;
        if (amount >= 1000000) return `${symbol}${(amount / 1000000).toFixed(1)}M`;
        return `${symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    };

    // Logic from Flutter App
    const getHourlyRate = () => {
        if (country === 'Indonesia') return 50000.0;
        if (country === 'India') return 500.0;
        if (country === 'USA') return 25.0;
        return 20.0;
    };

    const getIndustryStats = () => {
        if (businessType === 'Retail') return [0.04, 0.02, 0.03, "Shrinkage AI", "Visual AI detects shoplifting."];
        if (businessType === 'Fashion') return [0.025, 0.015, 0.05, "Stock Accuracy", "RFID/OCR syncs online stock."];
        return [0.08, 0.03, 0.04, "Forensic Inventory", "Visual AI catches expiry & spillage."];
    };

    const calculateValues = () => {
        const stats = getIndustryStats();
        const valInv = (monthlyInventoryCost * parseFloat(stats[0].toString())) * 0.85;
        const valDel = monthlyOnlineSales * parseFloat(stats[1].toString());
        const valLabor = staffCost * parseFloat(stats[2].toString());
        const valAdmin = 36 * getHourlyRate(); // Weekly admin hours saved?

        const monthlyTotal = valInv + valDel + valLabor + valAdmin;
        const annualTotal = monthlyTotal * 12;

        return { valInv, valDel, valLabor, valAdmin, monthlyTotal, annualTotal, stats };
    };

    const results = calculateValues();

    // Live Ticker Effect (matching _startLossTimer)
    useEffect(() => {
        if (!showResults) return;

        const lossPerSecond = results.annualTotal / 31536000;
        const interval = setInterval(() => {
            setLossSinceLoad(prev => prev + (lossPerSecond / 10)); // 100ms updates
        }, 100);

        return () => clearInterval(interval);
    }, [showResults, results.annualTotal]);

    const handleCalculate = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setShowResults(true);
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }, 1500);
    };

    // Chart Data
    const chartData = [
        { name: 'Inventory/Shrink', value: results.valInv * 12, color: COLORS.inventory },
        { name: 'Delivery Loss', value: results.valDel * 12, color: COLORS.delivery },
        { name: 'Payroll/Time', value: results.valLabor * 12, color: COLORS.ops },
        { name: 'Admin Work', value: results.valAdmin * 12, color: COLORS.admin },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-[#C3EB7A] selection:text-black font-sans pb-32">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4A90E2]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C3EB7A]/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 lg:pt-40">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Hidden Profits</span>
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
                        See exactly how much revenue you're losing to operational blind spots, and how fast MochaEase pays for itself.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* INPUT SECTION */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <div className="p-2 bg-[#C3EB7A]/20 rounded-lg text-[#C3EB7A]">
                                    <Activity className="w-5 h-5" />
                                </div>
                                Business Metrics
                            </h2>

                            <div className="space-y-6">
                                {/* Type & Country */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Business Type</label>
                                        <select
                                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C3EB7A]"
                                            value={businessType}
                                            onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                                        >
                                            <option>F&B / Restaurant</option>
                                            <option>Retail</option>
                                            <option>Fashion</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Region</label>
                                        <select
                                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A90E2] max-h-48"
                                            value={country}
                                            onChange={(e) => handleCountryChange(e.target.value)}
                                        >
                                            <option value="United States">United States</option>
                                            <option value="India">India</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option disabled>──────────</option>
                                            {COUNTRIES.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Numbers */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex justify-between">
                                        <span>Monthly Revenue</span>
                                        <span className="text-[#C3EB7A]">{formatMoney(monthlyRevenue)}</span>
                                    </label>
                                    <input
                                        type="range" min={5000 * getScaler(country)} max={500000 * getScaler(country)} step={1000 * getScaler(country)}
                                        value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                                        className="w-full accent-[#C3EB7A]"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex justify-between">
                                        <span>Inventory/COGS</span>
                                        <span className="text-[#FF9500]">{formatMoney(monthlyInventoryCost)}</span>
                                    </label>
                                    <input
                                        type="range" min={1000 * getScaler(country)} max={250000 * getScaler(country)} step={500 * getScaler(country)}
                                        value={monthlyInventoryCost} onChange={(e) => setMonthlyInventoryCost(Number(e.target.value))}
                                        className="w-full accent-[#FF9500]"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex justify-between">
                                        <span>Monthly Payroll</span>
                                        <span className="text-[#4A90E2]">{formatMoney(staffCost)}</span>
                                    </label>
                                    <input
                                        type="range" min={2000 * getScaler(country)} max={150000 * getScaler(country)} step={500 * getScaler(country)}
                                        value={staffCost} onChange={(e) => setStaffCost(Number(e.target.value))}
                                        className="w-full accent-[#4A90E2]"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider flex justify-between">
                                        <span>Online App Sales</span>
                                        <span className="text-[#E040FB]">{formatMoney(monthlyOnlineSales)}</span>
                                    </label>
                                    <input
                                        type="range" min={0} max={100000 * getScaler(country)} step={500 * getScaler(country)}
                                        value={monthlyOnlineSales} onChange={(e) => setMonthlyOnlineSales(Number(e.target.value))}
                                        className="w-full accent-[#E040FB]"
                                    />
                                </div>

                                <button
                                    onClick={handleCalculate}
                                    className="w-full mt-6 bg-[#C3EB7A] text-black font-black text-lg py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(195,235,122,0.3)]"
                                >
                                    {isCalculating ? (
                                        <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>Calculate AI Uplift <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RESULTS SECTION */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {!showResults ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 border border-white/5 rounded-3xl bg-white/5"
                                >
                                    <BrainCircuit className="w-20 h-20 text-white/10 mb-6" />
                                    <h3 className="text-2xl font-bold text-white/40 mb-2">Awaiting Data</h3>
                                    <p className="text-white/30 text-sm">Enter your business metrics to see an AI-driven projection of your reclaimable profits.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    id="results-section"
                                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-6"
                                    style={{ scrollMarginTop: '100px' }}
                                >
                                    {/* Annual Profit Headline */}
                                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                                        {/* Live Ticker */}
                                        <div className="absolute top-0 left-0 right-0 bg-red-500/10 border-b border-red-500/20 py-1.5 px-4 flex items-center justify-center gap-2">
                                            <Timer className="w-4 h-4 text-red-400" />
                                            <span className="text-xs text-white/60">Inefficiency Cost (Live):</span>
                                            <span className="text-sm font-black text-red-500 font-mono tracking-wider">
                                                {getSymbol()}{lossSinceLoad.toFixed(4)}
                                            </span>
                                        </div>

                                        <div className="mt-8 flex items-end justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-[#C3EB7A] mb-2 tracking-widest uppercase">Projected Annual Uplift</p>
                                                <h2 className="text-5xl md:text-7xl font-black">{formatMoney(results.annualTotal)}</h2>
                                            </div>
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="hidden md:flex w-16 h-16 rounded-full bg-[#C3EB7A]/20 items-center justify-center"
                                            >
                                                <ShieldCheck className="w-8 h-8 text-[#C3EB7A]" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Chart & Breakdowns */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Donut Chart */}
                                        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col items-center">
                                            <h3 className="text-sm font-bold text-white/40 mb-4 w-full text-left uppercase tracking-wider">Where it comes from</h3>
                                            <div className="h-48 w-full relative">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={chartData}
                                                            cx="50%" cy="50%"
                                                            innerRadius={60} outerRadius={80}
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                            onMouseEnter={(_, index) => setActiveSlice(index)}
                                                            onMouseLeave={() => setActiveSlice(null)}
                                                        >
                                                            {chartData.map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={entry.color}
                                                                    opacity={activeSlice === null || activeSlice === index ? 1 : 0.3}
                                                                />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip
                                                            formatter={(value: any) => formatMoney(Number(value))}
                                                            contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                {/* Center Text */}
                                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                                                        {activeSlice !== null ? chartData[activeSlice].name : 'Total'}
                                                    </span>
                                                    <span className="text-lg font-black" style={{ color: activeSlice !== null ? chartData[activeSlice].color : '#fff' }}>
                                                        {activeSlice !== null ? formatMoney(chartData[activeSlice].value) : '100%'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Breakdown List */}
                                        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-center gap-4">
                                            {chartData.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex justify-between items-center transition-opacity duration-200 ${activeSlice !== null && activeSlice !== i ? 'opacity-30' : 'opacity-100'}`}
                                                    onMouseEnter={() => setActiveSlice(i)}
                                                    onMouseLeave={() => setActiveSlice(null)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                        <span className="text-sm font-medium text-white/80">{item.name}</span>
                                                    </div>
                                                    <span className="text-sm font-bold" style={{ color: item.color }}>{formatMoney(item.value)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actionable Insights */}
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="bg-[#1A1A1A] border border-[#C3EB7A]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center">
                                            <div className="flex flex-col items-center gap-2 mb-6">
                                                <div className="w-16 h-16 rounded-full bg-[#C3EB7A]/10 flex items-center justify-center mb-2">
                                                    <Bolt className="w-8 h-8 text-[#C3EB7A]" />
                                                </div>
                                                <h3 className="text-sm font-bold text-[#C3EB7A] uppercase tracking-widest">Return on Investment</h3>
                                                <h4 className="text-2xl md:text-3xl font-bold text-white">MochaEase Pays For Itself In</h4>
                                            </div>
                                            <div className="flex items-baseline gap-3 mb-4">
                                                <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-emerald-400 drop-shadow-[0_0_30px_rgba(195,235,122,0.3)]">
                                                    {Math.max(1, Math.ceil((299 * getScaler(country)) / (results.annualTotal / 365)))}
                                                </span>
                                                <span className="text-2xl font-bold text-white/50">Days</span>
                                            </div>
                                            <p className="text-sm md:text-base text-white/60 max-w-lg mx-auto leading-relaxed">
                                                After this initial break-even period, the software acts as a pure profit generator, adding 100% of the calculated savings directly to your bottom line.
                                            </p>
                                        </div>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

