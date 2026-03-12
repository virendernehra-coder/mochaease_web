'use client';

import React from 'react';
import { 
    Calendar, Clock, Users, Coffee, 
    ChevronRight, Sparkles, 
    UserPlus, Filter, MoreVertical,
    AlertCircle, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';

export default function SchedulesClient() {
    const { activeContextId } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Schedules Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Calendar className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[3px]">Team Orchestration</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-purple-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Team <span className="text-white/30">Roster.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Optimize shift distribution, manage availability, and align your team with peak business hours.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" /> Filter Shifts
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-purple-500 text-white text-xs font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <UserPlus className="w-4 h-4" /> Assign Shift
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Staff" value="48" sub="Full-time & Part-time" trend="+2" icon={<Users className="w-5 h-5" />} color="blue" />
                <KPICard title="Scheduled Hours" value="1,240h" sub="For current week" trend="+4.2%" icon={<Clock className="w-5 h-5" />} color="emerald" />
                <KPICard title="Open Shifts" value="6" sub="Require immediate fill" trend="-2" icon={<AlertCircle className="w-5 h-5" />} color="amber" />
                <KPICard title="Team Morale" value="92%" sub="Internal survey avg" trend="+1.5%" icon={<Coffee className="w-5 h-5" />} color="purple" />
            </div>

            {/* Shift Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Daily Overview */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Clock className="w-24 h-24 text-purple-500" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-2">Today&apos;s Timeline</h3>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest mb-8">THU, MAR 12, 2026</p>
                    
                    <div className="space-y-8 relative">
                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-white/5" />
                        
                        <TimelineItem time="06:00 AM" label="Opening Shift" staff="Alex Miller, Sarah Chen" active={true} />
                        <TimelineItem time="12:00 PM" label="Mid-Day Rotation" staff="James Wilson, Emily R." />
                        <TimelineItem time="04:00 PM" label="PM Peak Coverage" staff="Maria Garcia, David L." />
                        <TimelineItem time="10:00 PM" label="Closing Team" staff="Kevin Heart, Lisa Wang" />
                    </div>
                </div>

                {/* Team Availability / Roster */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Team Availability & Roles</h3>
                        <p className="text-xs font-bold text-white/20 uppercase tracking-[2px]">Sort by Capacity ▾</p>
                    </div>
                    
                    <div className="space-y-4">
                        <StaffRosterRow name="Alex Miller" role="Store Manager" status="On Shift" shift="06:00 - 14:00" avail="High" />
                        <StaffRosterRow name="Sarah Chen" role="Head Barista" status="On Shift" shift="06:00 - 14:00" avail="Medium" />
                        <StaffRosterRow name="James Wilson" role="Barista" status="Upcoming" shift="12:00 - 20:00" avail="Full" />
                        <StaffRosterRow name="Emily Rodriguez" role="Cashier" status="Upcoming" shift="12:00 - 20:00" avail="Partial" />
                        <StaffRosterRow name="David Lee" role="Floor Lead" status="Off Duty" shift="--:--" avail="Full" />
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View Full Roster (48)
                    </button>
                </div>
            </div>

            {/* Smart Scheduling Insights */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">Scheduling Optimization</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider">AI RECOMMENDATIONS</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard 
                        title="Peak Hour Sync" 
                        text="Expected traffic spike on Friday 7PM. Suggesting 1 additional floor lead deployment." 
                        target="Wait Time Reduction"
                    />
                    <InsightCard 
                        title="Fatigue Detection" 
                        text="Detected back-to-back doubles for 3 team members. Suggesting shift rebalance." 
                        target="Staff Wellbeing"
                    />
                    <InsightCard 
                        title="Skill Mix Audit" 
                        text="Sunday morning shift lacks a Senior Barista. Suggesting trade between Alex and Maria." 
                        target="Quality Assurance"
                    />
                </div>
            </div>

        </div>
    );
}

function KPICard({ title, value, sub, trend, icon, color }: { title: string, value: string, sub: string, trend: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group overflow-hidden">
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`w-12 h-12 text-${color}-500`}>{icon}</div>
            </div>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-3xl font-black text-white mb-1 tracking-tighter">{value}</h4>
            <div className="flex items-center gap-2 mt-4">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-${color}-500/10 text-${color}-400`}>{trend}</span>
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{sub}</span>
            </div>
        </div>
    );
}

function TimelineItem({ time, label, staff, active }: { time: string, label: string, staff: string, active?: boolean }) {
    return (
        <div className="relative pl-10">
            <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-4 ${active ? 'bg-purple-500 border-purple-500/20' : 'bg-black border-white/10'} z-10 transition-all`} />
            <div>
                <p className={`text-[10px] font-black ${active ? 'text-purple-400' : 'text-white/20'} uppercase tracking-[2px] mb-1`}>{time}</p>
                <h4 className={`text-sm font-black ${active ? 'text-white' : 'text-white/40'}`}>{label}</h4>
                <p className="text-[11px] text-white/20 font-medium">{staff}</p>
            </div>
        </div>
    );
}

function StaffRosterRow({ name, role, status, shift, avail }: { name: string, role: string, status: string, shift: string, avail: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-white/20 group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all">
                {name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-white tracking-tight truncate">{name}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{role}</p>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Shift</p>
                <p className="text-xs font-bold text-white/60">{shift}</p>
            </div>
            <div className="hidden lg:block text-right w-24">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Availability</p>
                <p className={`text-[10px] font-black ${avail === 'Full' ? 'text-emerald-400' : avail === 'Medium' ? 'text-blue-400' : 'text-amber-400'}`}>{avail}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Status</p>
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                    status === 'On Shift' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                    status === 'Upcoming' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
                    'text-white/10 border-white/10'
                }`}>
                    {status}
                </span>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white transition-all">
                <Calendar className="w-4 h-4" />
            </button>
        </div>
    );
}

function InsightCard({ title, text, target }: { title: string, text: string, target: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-[#0A0A0A]/60 border border-white/5 hover:border-blue-500/20 transition-all flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-[2px]">{title}</h4>
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    {target}
                </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic group-hover:text-white/60 transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:gap-2 transition-all">
                Adjust Roster <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
