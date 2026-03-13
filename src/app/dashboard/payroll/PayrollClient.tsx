'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    PieChart, Calendar, Users, 
    ChevronRight, Sparkles, 
    DollarSign, TrendingDown,
    ArrowUpRight, ArrowDownRight,
    Download, Clock, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useFilterStore } from '@/store/filter-store';
import { getPayrollReport } from '@/utils/supabase/queries-client';
import { type PayrollReport } from '@/utils/supabase/queries';
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, X, Info, ShieldCheck, Activity, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { useThemeStore, THEME_COLORS } from '@/store/theme-store';
import Portal from '@/components/Portal';
import { BarChart3, LineChart as LineChartIcon } from 'lucide-react';

export default function PayrollClient() {
    const { user, businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const { primaryColor, setPrimaryColor } = useThemeStore();
    const [selectedStaff, setSelectedStaff] = useState<PayrollReport | null>(null);
    const { selectedRange, activePreset } = useFilterStore();
    
    // UI State
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
    const itemsPerPage = 8;

    const isGlobal = activeContextId === 'business';
    const queryContextId = isGlobal ? user?.business_id : activeContextId;

    const { data: payrollData = [], isLoading } = useQuery({
        queryKey: ['payroll', queryContextId, isGlobal, selectedRange.from.toISOString().split('T')[0], selectedRange.to.toISOString().split('T')[0]],
        queryFn: () => getPayrollReport(
            queryContextId!, 
            isGlobal, 
            selectedRange.from.toISOString().split('T')[0], 
            selectedRange.to.toISOString().split('T')[0]
        ),
        enabled: !!user?.business_id && !!queryContextId,
    });

    // Constant 12-month historical data for chart comparison
    const twelveMonthsAgo = useMemo(() => {
        const d = new Date();
        d.setMonth(d.getMonth() - 11);
        d.setDate(1);
        return d.toISOString().split('T')[0];
    }, []);

    const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

    const { data: historicalData = [] } = useQuery({
        queryKey: ['payroll-historical', queryContextId, isGlobal, twelveMonthsAgo, todayStr],
        queryFn: () => getPayrollReport(queryContextId!, isGlobal, twelveMonthsAgo, todayStr),
        enabled: !!user?.business_id && !!queryContextId,
    });

    const contextName = isGlobal ? (user?.business_name || 'Global Business') : 
                       (user?.outlet_name || 'Outlet Context');

    // KPI Aggregations & Period Filtering
    const { filteredRows, searchedRows, paginatedRows, kpis, chartData, totalPages } = useMemo(() => {
        if (!payrollData.length) return { filteredRows: [], searchedRows: [], paginatedRows: [], totalPages: 0, chartData: [], kpis: { totalPayout: '0', staffCount: '0', laborPerc: '0%', variablePay: '0', currency: 'USD', periodName: activePreset } };

        // 1. Filter by global date range
        const activeRows = payrollData.filter(row => {
            const rowStart = new Date(row.payroll_start);
            const rowEnd = new Date(row.payroll_end);
            
            // Inclusion check: row's range overlaps with selectedRange
            return (rowStart >= selectedRange.from && rowStart <= selectedRange.to) ||
                   (rowEnd >= selectedRange.from && rowEnd <= selectedRange.to) ||
                   (rowStart <= selectedRange.from && rowEnd >= selectedRange.to);
        });

        // 2. Search Filter
        const searchFiltered = activeRows.filter(row => 
            row.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // 4. Pagination
        const totalP = Math.ceil(searchFiltered.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const pagedRows = searchFiltered.slice(startIndex, startIndex + itemsPerPage);

        // KPIs
        const totalNet = activeRows.reduce((sum, row) => sum + (row.net_salary || 0), 0);
        const totalGross = activeRows.reduce((sum, row) => sum + (row.gross_salary || 0), 0);
        const totalSales = activeRows.reduce((sum, row) => sum + (row.actual_total_sales || 0), 0);
        const totalVariable = activeRows.reduce((sum, row) => sum + (row.calculated_variable_pay || 0), 0);
        const staffCount = new Set(activeRows.map(row => row.employee_id)).size;
        const laborPerc = totalSales > 0 ? (totalGross / totalSales) * 100 : 0;
        const currency = businessConfig.currency;

        // 5. Monthly Aggregation for Chart (using historical data)
        const monthlyDataMap = (historicalData.length > 0 ? historicalData : payrollData).reduce((acc: Record<string, number>, row) => {
            const date = new Date(row.payroll_start);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            acc[monthKey] = (acc[monthKey] || 0) + (row.net_salary || 0);
            return acc;
        }, {});

        const chartSeries = Object.entries(monthlyDataMap)
            .map(([month, amount]) => ({ month, amount }))
            .sort((a: { month: string }, b: { month: string }) => new Date(a.month).getTime() - new Date(b.month).getTime())
            .slice(-12);

        return {
            filteredRows: activeRows,
            searchedRows: searchFiltered,
            paginatedRows: pagedRows,
            totalPages: totalP,
            chartData: chartSeries,
            kpis: {
                totalPayout: new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(totalNet),
                staffCount: staffCount.toString(),
                laborPerc: laborPerc.toFixed(1) + '%',
                variablePay: new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(totalVariable),
                currency,
                periodName: activePreset
            }
        };
    }, [payrollData, historicalData, selectedRange, activePreset, searchQuery, currentPage, businessConfig]);

    const handleExportCSV = () => {
        if (searchedRows.length === 0) return;

        // 1. Prepare Headers
        const headers = [
            "Employee Name", "Start Date", "End Date", 
            "Hours Worked", "Base Salary", "Variable Pay", "Gross Total", "Net Payout"
        ];

        // 2. Prepare Data Rows
        const csvRows = searchedRows.map(row => [
            `"${row.employee_name.replace(/"/g, '""')}"`,
            row.payroll_start,
            row.payroll_end,
            row.total_actual_worked_hours?.toFixed(2) || "0.00",
            row.earned_base_salary?.toFixed(2) || "0.00",
            row.calculated_variable_pay?.toFixed(2) || "0.00",
            row.gross_salary?.toFixed(2) || "0.00",
            row.net_salary?.toFixed(2) || "0.00"
        ]);

        // 3. Combine with BOM for Excel compatibility
        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");

        // 4. Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        link.href = url;
        link.setAttribute("download", "payroll_report.csv");
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: kpis.currency 
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-white/40 font-black uppercase tracking-widest text-xs">Calibrating Payroll...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Payroll Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <PieChart className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[3px]">Capital Management</span>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
                                    <MapPin className="w-2.5 h-2.5 text-purple-400/60" />
                                    <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{contextName}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                                    <Calendar className="w-2.5 h-2.5 text-purple-400/60" />
                                    <div className="bg-transparent text-[9px] font-bold text-white/60 uppercase tracking-widest px-1">
                                        {activePreset}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Payroll <span className="text-white/30">Command.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Centralize compensation, track pay cycles, and optimize labor costs with AI-driven insights.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full md:w-auto">
                    <button 
                        onClick={handleExportCSV}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto"
                    >
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                    <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-purple-500 text-white text-xs font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] w-full sm:w-auto">
                        Run New Cycle
                    </button>
                </div>
            </div>

            {/* Top Level KPIs - Total Payout gets more room for long strings (like IDR) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                <KPICard title="Total Payout" wide value={kpis.totalPayout} sub={kpis.periodName} trend="+0.0%" icon={<DollarSign className="w-5 h-5" />} color="emerald" />
                <KPICard title="Staff Count" value={kpis.staffCount} sub="Active this period" trend="0%" icon={<Users className="w-5 h-5" />} color="blue" />
                <KPICard title="Labor %" value={kpis.laborPerc} sub="Target: 20%" trend="0.0%" icon={<TrendingDown className="w-5 h-5" />} color="purple" trendColor="emerald" />
                <KPICard title="Variable Pay" value={kpis.variablePay} sub="Incentives" trend="+0.0%" icon={<Sparkles className="w-5 h-5" />} color="amber" />
            </div>
            {/* Monthly Trend Chart */}
            <div className="p-4 sm:p-8 lg:p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Capital Expenditure Velocity</h3>
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-[3px] mt-1">Monthly Payout Trends • Projections Active</p>
                        <div className="flex items-center gap-2 mt-4">
                            {THEME_COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setPrimaryColor(color.value)}
                                    className={`w-4 h-4 rounded-full border transition-all ${primaryColor === color.value ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-30 hover:opacity-100 hover:scale-110'}`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
                            <button 
                                onClick={() => setChartType('bar')}
                                className={`p-2 rounded-xl transition-all ${chartType === 'bar' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-white/20 hover:text-white/40'}`}
                            >
                                <BarChart3 className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setChartType('line')}
                                className={`p-2 rounded-xl transition-all ${chartType === 'line' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-white/20 hover:text-white/40'}`}
                            >
                                <LineChartIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-0.5">Rolling 12M Average</p>
                            <p className="text-sm font-black text-white">{kpis.totalPayout}</p>
                        </div>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' ? (
                            <BarChart data={chartData.length > 0 ? chartData : []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={primaryColor} stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor={primaryColor} stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }}
                                />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                    contentStyle={{ 
                                        backgroundColor: '#0A0A0A', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '16px',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: primaryColor, fontWeight: 900, fontSize: '12px' }}
                                    labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}
                                />
                                <Bar 
                                    dataKey="amount" 
                                    radius={[8, 8, 0, 0]} 
                                    fill="url(#barGradient)"
                                    barSize={32}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#C3EB7A' : 'url(#barGradient)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        ) : (
                            <AreaChart data={chartData.length > 0 ? chartData : []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={primaryColor} stopOpacity={0.3}/>
                                        <stop offset="100%" stopColor={primaryColor} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#0A0A0A', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '16px',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: primaryColor, fontWeight: 900, fontSize: '12px' }}
                                    labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="amount" 
                                    stroke={primaryColor} 
                                    strokeWidth={4}
                                    fill="url(#areaGradient)" 
                                    dot={{ fill: primaryColor, strokeWidth: 2, r: 4, stroke: '#0A0A0A' }}
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#C3EB7A' }}
                                />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pay Cycle & Distribution Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Pay Cycle Monitor */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Calendar className="w-24 h-24 text-purple-500" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-8">Pay Cycle Monitor</h3>
                    
                    <div className="space-y-8">
                        <CycleStage title="Initialization" date="Mar 01" status="Completed" complete={true} />
                        <CycleStage title="Verification" date="Mar 10" status="In Progress" active={true} />
                        <CycleStage title="Disbursement" date="Mar 15" status="Pending" />
                    </div>

                    <div className="mt-12 p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Action Required</span>
                        </div>
                        <p className="text-xs text-white/60 mb-4 leading-relaxed">Verification window closes in 48 hours for the current cycle.</p>
                        <button className="text-[10px] font-black text-white uppercase tracking-[2px] hover:text-[#C3EB7A] transition-colors">Start Verification →</button>
                    </div>
                </div>

                {/* Staff Compensation Breakdown */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-black text-white tracking-tight shrink-0">Staff Compensation Ledger</h3>
                        </div>
                        
                        <div className="flex flex-1 max-w-md items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition-all">
                            <Search className="w-4 h-4 text-white/20" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="bg-transparent text-xs font-bold text-white placeholder:text-white/20 outline-none w-full"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-4 min-h-[400px]">
                        {paginatedRows.length > 0 ? (
                            paginatedRows.map((staff, idx) => (
                                <StaffRow 
                                    key={staff.employee_id + idx}
                                    name={staff.employee_name} 
                                    role="Team Member"
                                    base={formatCurrency(staff.earned_base_salary)} 
                                    variable={formatCurrency(staff.calculated_variable_pay)} 
                                    total={formatCurrency(staff.net_salary)} 
                                    status={staff.is_current_period ? "Processing" : "Verified"} 
                                    onClick={() => setSelectedStaff(staff)}
                                />
                            ))
                        ) : (
                            <div className="h-[400px] rounded-[40px] bg-white/[0.01] border border-dashed border-white/5 flex flex-col items-center justify-center text-center p-10">
                                <Users className="w-12 h-12 text-white/5 mb-6" />
                                <h4 className="text-lg font-black text-white/40 mb-2">{searchQuery ? 'No Results Matching Query' : 'No Records Found'}</h4>
                                <p className="text-xs text-white/20 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                                    {searchQuery ? `We couldn't find "${searchQuery}" in ${kpis.periodName}.` : `We couldn't find any payroll data for ${kpis.periodName}.`}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                                PAGE {currentPage} OF {totalPages} <span className="mx-2">/</span> {searchedRows.length} STAFF MEMBER(S)
                            </p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Moza AI Payroll Insights */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">Moza Payroll Insights</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">PREDICTIVE LOGIC ACTIVE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard 
                        title="Labor Compression" 
                        text="Shifting 2 baristas from AM to PM on Outlet #2 will reduce labor hours by 12% without affecting throughput." 
                        saving="$840/mo"
                    />
                    <InsightCard 
                        title="Automated Deductions" 
                        text="Detected 4 tax-saving opportunities for the current cycle based on regional compliance updates." 
                        saving="$1,200/mo"
                    />
                    <InsightCard 
                        title="Early Payout Risk" 
                        text="Current variable pay in Outlet #4 is +20% above trend. Suggesting review of commission triggers." 
                        saving="Risk Mitigation"
                    />
                </div>
            </div>

            {/* Detail Modal Overlay */}
            <Portal>
                <AnimatePresence>
                    {selectedStaff && (
                        <PayrollDetailModal 
                            staff={selectedStaff} 
                            currency={kpis.currency} 
                            periodName={kpis.periodName}
                            onClose={() => setSelectedStaff(null)} 
                        />
                    )}
                </AnimatePresence>
            </Portal>
        </div>
    );
}

function PayrollDetailModal({ staff, currency, periodName, onClose }: { staff: PayrollReport, currency: string, periodName: string, onClose: () => void }) {
    const { primaryColor } = useThemeStore();
    const format = (val: number | null) => new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val || 0);
    
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-12 overflow-y-auto scrollbar-none">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/95 backdrop-blur-3xl cursor-pointer" 
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="w-full max-w-3xl bg-[#0A0A0A] border border-white/10 rounded-[48px] overflow-hidden relative shadow-[0_0_200px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] z-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="p-8 sm:p-10 border-b border-white/5 flex items-start justify-between bg-gradient-to-b from-white/[0.04] to-transparent shrink-0">
                    <div className="flex items-center gap-6">
                        <div 
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-2xl transition-all"
                            style={{ backgroundColor: primaryColor, boxShadow: `0 0 40px ${primaryColor}66` }}
                        >
                            {staff.employee_name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase">{staff.employee_name}</h2>
                                <span 
                                    className="px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest leading-none"
                                    style={{ borderColor: `${primaryColor}33`, color: primaryColor, backgroundColor: `${primaryColor}11` }}
                                >
                                    ID: {staff.employee_id.slice(0, 8)}
                                </span>
                            </div>
                            <p className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-[2px]">Performance & Payout Details • {periodName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-12 scrollbar-thin scrollbar-thumb-white/10">
                    
                    {/* High Level Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 mb-4 opacity-40">
                                <Activity className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Efficiency</span>
                            </div>
                            <h4 className="text-2xl font-black text-white tabular-nums">{(staff.total_actual_worked_hours || 0).toFixed(2)} <span className="text-xs text-white/20 uppercase">Hrs</span></h4>
                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">Target: {(staff.expected_total_working_hours || 0).toFixed(1)}</p>
                        </div>
                        
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 mb-4 opacity-40">
                                <Target className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Sales Value</span>
                            </div>
                            <h4 className="text-2xl font-black text-[#C3EB7A] tabular-nums">{format(staff.actual_total_sales)}</h4>
                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">Target: {format(staff.total_sales_target)}</p>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 mb-4 opacity-40">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Hourly Basis</span>
                            </div>
                            <h4 className="text-2xl font-black text-white tabular-nums">{format(staff.hourly_rate)}</h4>
                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">Verified Rate</p>
                        </div>
                    </div>

                    {/* Breakdown Ledger */}
                    <div className="space-y-6">
                        <h3 className="text-[11px] font-black text-white uppercase tracking-[4px] opacity-60 px-2">Financial Ledger Breakdown</h3>
                        
                        <div className="space-y-1">
                            <BreakdownLine label="Base Salary (Monthly)" value={format(staff.base_salary)} />
                            <BreakdownLine label="Earned Proportion" value={format(staff.earned_base_salary)} />
                            <BreakdownLine label="Variable Pay / Incentives" value={format(staff.calculated_variable_pay)} color="emerald" />
                            <BreakdownLine label="Overtime Premium" value={format(staff.overtime_pay)} color="emerald" />
                            <BreakdownLine label="Attendance Deductions" value={`-${format(staff.undertime_deduction)}`} color="rose" />
                            <div className="h-[1px] bg-white/5 my-4" />
                            <BreakdownLine label="Gross Payout Total" value={format(staff.gross_salary)} bold />
                            <BreakdownLine label="Income Tax Withheld" value={`-${format(staff.income_tax)}`} color="rose" />
                            <BreakdownLine label="Advance Recoveries" value={`-${format(staff.total_advance_payment)}`} color="rose" />
                        </div>
                    </div>

                    {/* Net Total Footer */}
                    <div 
                        className="p-10 rounded-[32px] border flex flex-col sm:flex-row items-center justify-between gap-6 mb-10"
                        style={{ backgroundColor: `${primaryColor}0D`, borderColor: `${primaryColor}33` }}
                    >
                        <div className="text-center sm:text-left">
                            <span className="text-[11px] font-black uppercase tracking-[4px]" style={{ color: primaryColor }}>Net Disbursement</span>
                            <p className="text-xs text-white/30 mt-1 font-bold">Total verified amount for {periodName}</p>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-[#C3EB7A] tracking-tighter tabular-nums text-right">{format(staff.net_salary)}</h2>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function BreakdownLine({ label, value, color, bold }: { label: string, value: string, color?: string, bold?: boolean }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-white/[0.03] last:border-0 px-4">
            <span className={`text-[11px] uppercase tracking-widest font-black ${bold ? 'text-white' : 'text-white/30'}`}>{label}</span>
            <span className={`text-sm font-bold tabular-nums ${color === 'emerald' ? 'text-emerald-400' : color === 'rose' ? 'text-rose-400' : 'text-white'} ${bold ? 'text-lg font-black' : ''}`}>{value}</span>
        </div>
    );
}

function KPICard({ title, value, sub, trend, icon, color, trendColor, wide, isUp = true }: { title: string, value: string, sub: string, trend: string, icon: React.ReactNode, color: string, trendColor?: string, wide?: boolean, isUp?: boolean }) {
    const { primaryColor } = useThemeStore();
    
    const getThemeColor = (type: string) => {
        if (type === 'purple') return primaryColor;
        if (type === 'emerald') return '#10B981';
        if (type === 'blue') return '#4A90E2';
        if (type === 'amber') return '#F59E0B';
        if (type === 'rose') return '#EF4444';
        return '#8B5CF6';
    };

    const activeColor = getThemeColor(color);
    const accentColor = getThemeColor(trendColor || color);

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className={`relative p-6 rounded-[28px] bg-[#0F0F0F]/80 border transition-all backdrop-blur-xl overflow-hidden group ${wide ? 'md:col-span-2' : ''}`}
            style={{ borderColor: `${activeColor}20` }}
        >
            <div 
                className={`absolute -right-4 -top-4 w-24 h-24 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`} 
                style={{ background: `linear-gradient(to bottom right, ${activeColor}, transparent)` }}
            />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div 
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors"
                    style={{ color: activeColor }}
                >
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-black`} style={{ color: accentColor }}>
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>

            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1 relative z-10">{title}</h3>
            <div className="flex items-end justify-between items-baseline relative z-10">
                <p className="text-2xl font-black text-white tracking-tight tabular-nums truncate">{value}</p>
                <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest mb-1">{sub}</span>
            </div>
        </motion.div>
    );
}

function CycleStage({ title, date, status, active, complete }: { title: string, date: string, status: string, active?: boolean, complete?: boolean }) {
    const { primaryColor } = useThemeStore();
    return (
        <div className="relative pl-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div 
                    className={`w-4 h-4 rounded-full border-2 transition-all z-10 ${complete ? '' : active ? 'bg-black' : 'bg-black border-white/10'}`}
                    style={{ 
                        backgroundColor: complete ? primaryColor : undefined,
                        borderColor: (complete || active) ? primaryColor : undefined
                    }}
                />
                <div className="absolute top-[100%] w-0.5 h-16 bg-white/5 -z-0" />
            </div>
            <div className="flex justify-between items-center group cursor-default">
                <div>
                    <h4 className={`text-sm font-black ${active ? 'text-white' : 'text-white/40'} transition-colors`}>{title}</h4>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">{date}</p>
                </div>
                <span 
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full border transition-all`}
                    style={{ 
                        borderColor: complete ? `${primaryColor}33` : active ? `${primaryColor}33` : 'rgba(255,255,255,0.1)',
                        color: complete ? primaryColor : active ? '#C3EB7A' : 'rgba(255,255,255,0.1)'
                    }}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}

function StaffRow({ name, role, base, variable, total, status, onClick }: { name: string, role: string, base: string, variable: string, total: string, status: string, onClick?: () => void }) {
    const { primaryColor } = useThemeStore();
    return (
        <div 
            onClick={onClick}
            className="p-4 md:p-5 rounded-[24px] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all flex items-center gap-4 md:gap-6 group cursor-pointer"
        >
            <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm text-white group-hover:bg-purple-500 group-hover:border-purple-500 transition-all hover-theme-bg shrink-0"
                style={{ '--hover-bg': primaryColor } as React.CSSProperties}
            >
                {name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-xs md:text-sm font-black text-white tracking-tight truncate group-hover:text-purple-400 transition-colors uppercase hover-theme-text" style={{ '--hover-color': primaryColor } as React.CSSProperties}>{name}</h4>
                <p className="text-[9px] md:text-[10px] text-white/20 uppercase tracking-[2px] truncate font-bold">{role}</p>
            </div>
            
            {/* Flex container for payouts to handle long numbers */}
            <div className="flex items-center gap-4 md:gap-8 text-right shrink-0">
                <div className="hidden md:block">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-0.5">Base / Var</p>
                    <p className="text-xs font-bold text-white/60 tabular-nums">{base} <span className="opacity-20 mx-1">/</span> {variable}</p>
                </div>
                <div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-0.5">Total Net</p>
                    <p className="text-xs md:text-sm font-black text-[#C3EB7A] tabular-nums tracking-tighter">{total}</p>
                </div>
            </div>

            <div className={`hidden sm:flex px-3 md:px-4 py-1.5 rounded-full border ${status === 'Verified' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' : 'text-amber-400 border-amber-400/20 bg-amber-400/5'} text-[8px] md:text-[9px] font-black uppercase tracking-[2px]`}>
                {status}
            </div>
            <button className="p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white group-hover:bg-white/10 transition-all shrink-0">
                <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
        </div>
    );
}

function InsightCard({ title, text, saving }: { title: string, text: string, saving: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-[#0A0A0A]/60 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-[2px]">{title}</h4>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                    {saving}
                </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic group-hover:text-white/60 transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-purple-400 uppercase tracking-widest hover:gap-2 transition-all">
                Analyze Optimization <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
