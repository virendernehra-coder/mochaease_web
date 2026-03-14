'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, PieChart, Users, Package, 
    CreditCard, Calendar, Settings, LogOut,
    Menu, X, Sparkles, ChevronRight, ChevronDown, Activity, Tag, Globe, Calendar as CalendarIcon
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import ContextSwitcher from './ContextSwitcher';
import DateRangePicker from './DateRangePicker';

const navItems = [
    { 
        name: 'Analytics', 
        href: '/dashboard', 
        icon: LayoutDashboard,
        subItems: [
            { name: 'Overview', href: '/dashboard' },
            { name: 'Category Sales', href: '/dashboard/analytics/categories' },
            { name: 'Product Sales', href: '/dashboard/analytics/products' },
            { name: 'Retention Analysis', href: '/dashboard/analytics/retention' },
            { name: 'Payment Breakdown', href: '/dashboard/analytics/payments' },
            { name: 'Order History', href: '/dashboard/analytics/history' },
        ]
    },
    { name: 'Business Health', href: '/dashboard/health', icon: Activity },
    { 
        name: 'Payroll', 
        href: '/dashboard/payroll', 
        icon: PieChart,
        subItems: [
            { name: 'Overview', href: '/dashboard/payroll' },
            { name: 'Advance Manager', href: '/dashboard/payroll/advances' },
            { name: 'Settings', href: '/dashboard/payroll/settings' },
        ]
    },
    { 
        name: 'Inventory', 
        href: '/dashboard/inventory', 
        icon: Package,
        subItems: [
            { name: 'Overview', href: '/dashboard/inventory' },
            { name: 'Manage & Audit', href: '/dashboard/inventory/settings' },
        ]
    },
    { name: 'Employees', href: '/dashboard/employees', icon: Users },
    { name: 'Schedules', href: '/dashboard/schedules', icon: Calendar },
    { name: 'Expenses', href: '/dashboard/expenses', icon: CreditCard },
    { name: 'Offers & Promos', href: '/dashboard/offers', icon: Tag },
    { 
        name: 'Settings', 
        href: '/dashboard/settings', 
        icon: Settings,
        subItems: [
            { name: 'Control Center', href: '/dashboard/settings' },
            { name: 'Profile Hub', href: '/dashboard/settings/profile' },
        ]
    },
];

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export default function DashboardSidebar({ collapsed, setCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const supabase = createClient();
    const [expandedItem, setExpandedItem] = React.useState<string | null>(null);
    const [isContextExpanded, setIsContextExpanded] = React.useState(false);
    const [isTimeframeExpanded, setIsTimeframeExpanded] = React.useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // Auto-expand if current path is a sub-item
    React.useEffect(() => {
        navItems.forEach(item => {
            if (item.subItems?.some(sub => pathname === sub.href)) {
                setExpandedItem(item.name);
            }
        });
    }, [pathname]);

    return (
        <aside 
            className={`fixed left-0 top-0 h-screen bg-[#0A0A0A]/80 backdrop-blur-2xl border-r border-white/5 z-50 transition-all duration-500 ease-in-out overflow-x-hidden
                ${collapsed ? 'lg:w-24 w-80' : 'w-80'} 
                ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
            `}
        >
            <div className="flex flex-col h-full p-4 overflow-y-auto no-scrollbar">
                
                {/* Logo Area */}
                <div className="flex items-center justify-between mb-10 px-2 mt-2">
                    {!collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center group"
                        >
                            <div className="text-[#C3EB7A] font-extrabold text-2xl tracking-tighter shrink-0 m-0 leading-none drop-shadow-[0_0_8px_rgba(195,235,122,0.5)]">m</div>
                            <div className="text-white font-extrabold text-2xl tracking-tighter shrink-0 m-0 leading-none">E.</div>
                        </motion.div>
                    )}
                    {collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center group cursor-pointer"
                        >
                            <div className="text-[#C3EB7A] font-extrabold text-2xl tracking-tighter shrink-0 m-0 leading-none drop-shadow-[0_0_8px_rgba(195,235,122,0.5)]">m</div>
                            <div className="text-white font-extrabold text-2xl tracking-tighter shrink-0 m-0 leading-none">E.</div>
                        </motion.div>
                    )}
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className={`p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all ${collapsed ? 'ml-2' : 'ml-4'}`}
                    >
                        {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile-Only Controls Section */}
                <div className="lg:hidden mb-10 px-2 space-y-4">
                    {/* Business Context Trigger */}
                    <div className="space-y-2">
                        <button 
                            onClick={() => setIsContextExpanded(!isContextExpanded)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                                isContextExpanded ? 'bg-white/10 border-white/10' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[#C3EB7A]/10 text-[#C3EB7A]">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Context</p>
                                    <h4 className="text-xs font-bold text-white truncate max-w-[120px]">Viewpoint Selector</h4>
                                </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isContextExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {isContextExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2">
                                        <ContextSwitcher.MobileHub />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Timeframe Trigger */}
                    <div className="space-y-2">
                        <button 
                            onClick={() => setIsTimeframeExpanded(!isTimeframeExpanded)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                                isTimeframeExpanded ? 'bg-white/10 border-white/10' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[#4A90E2]/10 text-[#4A90E2]">
                                    <CalendarIcon className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Timeframe</p>
                                    <h4 className="text-xs font-bold text-white truncate max-w-[120px]">Epoch Window</h4>
                                </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isTimeframeExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {isTimeframeExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2">
                                        <DateRangePicker.MobileHub />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Primary Navigation */}
                <nav className="space-y-2 mb-6">
                    {navItems.map((item) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isExpanded = expandedItem === item.name;
                        const isActive = pathname === item.href || (hasSubItems && item.subItems?.some(sub => pathname === sub.href));

                        return (
                            <div key={item.name} className="space-y-1">
                                <Link 
                                    href={hasSubItems ? '#' : item.href}
                                    onClick={(e) => {
                                        if (hasSubItems) {
                                            e.preventDefault();
                                            setExpandedItem(isExpanded ? null : item.name);
                                            if (collapsed) setCollapsed(false);
                                        }
                                    }}
                                >
                                    <div 
                                        className={`relative group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                                            isActive && !hasSubItems
                                            ? 'bg-[#C3EB7A] text-black shadow-[0_0_20px_rgba(195,235,122,0.2)]' 
                                            : isActive && hasSubItems
                                              ? 'bg-white/10 text-white'
                                              : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                                        
                                        {!collapsed && (
                                            <>
                                                <span className="text-sm font-black tracking-tight flex-1">{item.name}</span>
                                                {hasSubItems && (
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                                )}
                                            </>
                                        )}

                                        {isActive && !collapsed && !hasSubItems && (
                                            <motion.div 
                                                layoutId="active-indicator"
                                                className="w-1.5 h-1.5 rounded-full bg-black/40"
                                            />
                                        )}

                                        {/* Tooltip for collapsed mode */}
                                        {collapsed && (
                                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#151515] border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-[100] whitespace-nowrap translate-x-3 group-hover:translate-x-0">
                                                {item.name}
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                {/* Sub Items */}
                                <AnimatePresence>
                                    {hasSubItems && isExpanded && !collapsed && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden space-y-1 ml-4"
                                        >
                                            {item.subItems?.map((sub) => (
                                                <Link key={sub.name} href={sub.href}>
                                                    <div className={`px-10 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                                        pathname === sub.href
                                                        ? 'text-[#C3EB7A]'
                                                        : 'text-white/30 hover:text-white'
                                                    }`}>
                                                        {sub.name}
                                                    </div>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        {!collapsed && <span className="text-sm font-black tracking-tight flex-1">System Exit</span>}
                    </button>

                    {/* AI Status Badge */}
                    {!collapsed && (
                        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#4A90E2]/10 to-purple-500/10 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-1">
                                <Sparkles className="w-3 h-3 text-[#C3EB7A] animate-pulse" />
                            </div>
                            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-1">Moza AI</h4>
                            <p className="text-[11px] text-white/50 leading-tight">Insights active. 4 new recommendations available.</p>
                            <button className="mt-3 flex items-center gap-1 text-[10px] font-black text-[#C3EB7A] hover:gap-2 transition-all">
                                VIEW ANALYSIS <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
