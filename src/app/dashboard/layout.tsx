'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ContextSwitcher from '@/components/dashboard/ContextSwitcher';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import UserProfile from '@/components/dashboard/UserProfile';
import dynamic from 'next/dynamic';
import { Search, Bell, Settings } from 'lucide-react';

const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <div className="flex min-h-screen bg-[#050505] selection:bg-[#C3EB7A]/30 overflow-hidden">
            {/* Background Base */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <NetworkBackground />
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#4A90E2]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#C3EB7A]/5 blur-[150px] rounded-full" />
            </div>

            {/* DashboardSidebar is fixed, so we pass its state or just use its widths here */}
            {/* For simplicity and consistency, we'll use a wrapper or just the margin */}
            
            <DashboardSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

            <main className={`flex-1 flex flex-col relative z-10 transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-80'}`}>
                {/* 
                    NOTE: On mobile, sidebar is hidden/drawer. 
                    On desktop, we have a fixed pl matches sidebar width.
                    We should probably make this dynamic if we want the toggle to push content.
                */}
                
                {/* Dashboard Header */}
                <header className="sticky top-0 h-24 border-b border-white/5 bg-[#050505]/60 backdrop-blur-3xl px-4 md:px-8 flex items-center justify-between z-40">
                    <div className="flex items-center gap-4 md:gap-6">
                        <ContextSwitcher />
                        <div className="h-8 w-[1px] bg-white/5 hidden lg:block" />
                        <div className="hidden sm:block">
                            <DateRangePicker />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Search Bar */}
                        <div className="relative group hidden xl:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search Command Center..."
                                className="w-64 bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#C3EB7A]/30 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2 md:pr-2">
                             <button className="p-2 md:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all relative">
                                <Bell className="w-5 h-5" />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-[#C3EB7A] rounded-full border-2 border-[#050505] animate-pulse" />
                            </button>
                             <UserProfile />
                        </div>
                    </div>
                </header>

                {/* Sub-Dashboard Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
