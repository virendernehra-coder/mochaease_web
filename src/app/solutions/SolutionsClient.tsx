'use client';

import { SOLUTIONS, SolutionData } from '@/data/solutions';
import Link from 'next/link';
import { 
    ArrowRight, Sparkles, ChefHat, ShoppingBag, Factory, 
    Zap, Coffee, UserCircle, Trophy, Truck, Scissors, 
    HeartHandshake, Box, Target, Building, Ticket, Globe,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';

const CATEGORIES = [
    { id: 'fnb', title: 'Food & Beverage', icon: ChefHat, description: 'From cozy cafes to massive stadium concessions.', color: 'from-[#C3EB7A] to-[#4A90E2]' },
    { id: 'retail', title: 'Retail & Boutiques', icon: ShoppingBag, description: 'Scalable inventory for boutiques and big box retail.', color: 'from-[#4A90E2] to-purple-500' },
    { id: 'enterprise', title: 'Enterprise Chains', icon: Factory, description: 'Centralized control for 1,000+ location franchises.', color: 'from-purple-500 to-pink-500' }
] as const;

const ICON_MAP: Record<string, any> = {
    'cafe': Coffee,
    'qsr': Zap,
    'full-service': UserCircle,
    'bars': Trophy,
    'food-trucks': Truck,
    'bakeries': ChefHat,
    'fashion': Scissors,
    'beauty': HeartHandshake,
    'grocery': ShoppingBag,
    'home': Box,
    'vape': Target,
    'enterprise': Building,
    'multi-brand': Factory,
    'stadiums': Ticket,
    'airports': Globe
};

export default function SolutionsHub() {
    return (
        <main className="min-h-screen bg-[#050505] selection:bg-[#C3EB7A]/30 font-sans pb-40 overflow-hidden">
            <NetworkBackground />
            
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C3EB7A]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4A90E2]/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-6 pt-44 z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-xs font-black text-white/60 tracking-widest uppercase">The Industry Standard</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
                    >
                        Built for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Your Business.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Select your industry to see how MochaEase transforms your specific operations with specialized tech.
                    </motion.p>
                </div>

                {/* Categories Grid */}
                <div className="space-y-40">
                    {CATEGORIES.map((cat, catIdx) => {
                        const solutions = SOLUTIONS.filter(s => s.category === cat.id);
                        const Icon = cat.icon;

                        return (
                            <section key={cat.id} className="relative">
                                {/* Category Header */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="max-w-xl"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                                                <Icon className="w-7 h-7 text-black" />
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                                {cat.title}
                                            </h2>
                                        </div>
                                        <p className="text-white/40 text-xl font-medium">
                                            {cat.description}
                                        </p>
                                    </motion.div>
                                    
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="hidden md:block h-px flex-grow mx-12 bg-gradient-to-r from-white/10 to-transparent mb-6"
                                    />
                                    
                                    <div className="text-white/20 text-8xl font-black absolute -top-10 -right-4 pointer-events-none select-none hidden lg:block opacity-[0.03]">
                                        0{catIdx + 1}
                                    </div>
                                </div>

                                {/* Industry Solutions Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {solutions.map((solution, i) => {
                                        const IndIcon = ICON_MAP[solution.id] || Zap;
                                        return (
                                            <Link 
                                                key={solution.slug} 
                                                href={`/solutions/${solution.slug}`}
                                                className="group relative p-1 rounded-[40px] transition-all duration-500"
                                            >
                                                {/* Animated Border/Glow */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`} />
                                                
                                                <div className="relative h-full p-10 rounded-[39px] bg-white/[0.03] border border-white/10 group-hover:border-white/20 backdrop-blur-xl transition-all duration-500 flex flex-col items-start">
                                                    {/* Card Content Interior Glow */}
                                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-[0.02] group-hover:opacity-[0.1] blur-[50px] transition-opacity duration-500`} />
                                                    
                                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                                        <IndIcon className={`w-8 h-8 text-white transition-colors duration-500 group-hover:text-[#C3EB7A]`} />
                                                    </div>
                                                    
                                                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-white transition-colors">
                                                        {solution.title}
                                                    </h3>
                                                    
                                                    <p className="text-white/40 mb-12 font-medium leading-relaxed group-hover:text-white/60 transition-colors">
                                                        {solution.metaDescription}
                                                    </p>
                                                    
                                                    <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#C3EB7A] group-hover:gap-4 transition-all">
                                                        Explore Solution 
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-60 relative p-[1px] rounded-[48px] overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C3EB7A]/50 via-white/5 to-[#4A90E2]/50 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[#0A0A0A] rounded-[47px] p-12 md:p-24 text-center overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#C3EB7A]/5 blur-[120px] rounded-full" />
                        
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                            Don't see your industry?
                        </h2>
                        <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                            MochaEase is flexible. Our core engine can be tailored for any complex operational setup. Let's talk.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/contact" className="px-10 py-5 rounded-full bg-[#C3EB7A] text-black font-black text-lg hover:brightness-110 shadow-[0_0_40px_rgba(195,235,122,0.4)] active:scale-95 transition-all flex items-center gap-3">
                                Get in Touch <ChevronRight className="w-5 h-5" />
                            </Link>
                            <Link href="/demo" className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-black text-lg hover:bg-white/10 transition-all">
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
