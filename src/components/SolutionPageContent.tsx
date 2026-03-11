'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, ArrowRight, ChevronDown, Plus, Minus,
    Calendar, User, Clock,
    Map, Users, Receipt, ChefHat, Box, QrCode, Smartphone, Truck, HeartHandshake, LineChart,
    Zap, Monitor, CalendarDays, UserCircle, Ticket, Star, ShieldAlert, Globe, Scissors, Target,
    FileText, Factory, Lock, Link as LinkIcon, Trophy, Scale,
    AlertOctagon, EyeOff, Wallet, TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import NetworkBackground from '@/components/NetworkBackground';
import ExperienceJourney from '@/components/ExperienceJourney';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SolutionData } from '@/data/solutions';
import { BlogPostSummary } from '@/app/blog/BlogClient';

interface SolutionPageContentProps {
    solution: SolutionData;
    industryContent: {
        headline: string;
        subheadline: string;
        steps: Array<{
            title: string;
            desc: string;
            iconName: string;
            imageGradient: string;
        }>;
    };
    relevantBlogs: BlogPostSummary[];
}

const ICON_MAP: Record<string, any> = {
    'Map': Map, 'Users': Users, 'Receipt': Receipt, 'ChefHat': ChefHat, 'Box': Box, 
    'QrCode': QrCode, 'Smartphone': Smartphone, 'Truck': Truck, 'HeartHandshake': HeartHandshake, 
    'LineChart': LineChart, 'Zap': Zap, 'Monitor': Monitor, 'CalendarDays': CalendarDays, 
    'UserCircle': UserCircle, 'Ticket': Ticket, 'Star': Star, 'ShieldAlert': ShieldAlert, 
    'Globe': Globe, 'Scissors': Scissors, 'Target': Target, 'FileText': FileText, 
    'Factory': Factory, 'Lock': Lock, 'LinkIcon': LinkIcon, 'Trophy': Trophy,
    'AlertOctagon': AlertOctagon, 'EyeOff': EyeOff, 'Wallet': Wallet, 'TrendingDown': TrendingDown,
    'Clock': Clock, 'Scale': Scale
};

export default function SolutionPageContent({ 
    solution, 
    industryContent, 
    relevantBlogs 
}: SolutionPageContentProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="flex min-h-screen flex-col bg-[#050505] selection:bg-[#C3EB7A]/30 font-sans">
            <NetworkBackground />
            
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none -z-0" />
            <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#C3EB7A]/5 blur-[120px] rounded-full pointer-events-none -z-0" />
            
            {/* Decorative Grid Pattern */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-10" />
            <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none z-10" />

            {/* Structured Data (JSON-LD) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        'name': `${solution.title} POS Solution`,
                        'description': solution.metaDescription,
                        'provider': {
                            '@type': 'Organization',
                            'name': 'MochaEase',
                            'url': 'https://mochaease.com'
                        },
                        'areaServed': 'Global',
                        'hasOfferCatalog': {
                            '@type': 'OfferCatalog',
                            'name': 'POS Features',
                            'itemListElement': (solution.features || industryContent.steps).map((step: any, idx: number) => ({
                                '@type': 'Offer',
                                'itemOffered': {
                                    '@type': 'Service',
                                    'name': step.title,
                                    'description': step.desc
                                }
                            }))
                        }
                    })
                }}
            />
            {solution.faqs && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            'mainEntity': solution.faqs.map((faq) => ({
                                '@type': 'Question',
                                'name': faq.question,
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': faq.answer
                                }
                            }))
                        })
                    }}
                />
            )}

            {/* Hero Section */}
            <section className="relative w-full max-w-6xl mx-auto px-6 pt-44 pb-24 z-10 text-center">
                <Breadcrumbs 
                    items={[
                        { label: 'Solutions', href: '/solutions' },
                        { label: solution.title }
                    ]} 
                    className="mb-12 flex justify-center"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-[#C3EB7A] animate-pulse" />
                    <span className="text-xs font-black text-white/60 tracking-widest uppercase">Solution for {solution.title}</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
                >
                    {solution.heroHeadline.split(' ').map((word, i) => (
                        <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]" : ""}>
                            {word}{' '}
                        </span>
                    ))}
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-medium mb-12 leading-relaxed"
                >
                    {solution.heroSubheadline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/demo" className="px-10 py-5 rounded-full bg-[#C3EB7A] text-black font-black text-lg hover:brightness-110 hover:shadow-[0_0_40px_rgba(195,235,122,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 group">
                        Book a Live Demo
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/pricing" className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center">
                        View Pricing
                    </Link>
                </motion.div>
            </section>

            {/* Core Capabilities Grid */}
            <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Everything You Need.</h2>
                    <p className="text-white/40 text-lg font-medium">10+ features engineered specifically for {solution.title.toLowerCase()}.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(solution.features || industryContent.steps).map((step: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                            className="group relative p-1 rounded-[32px] overflow-hidden"
                        >
                            {/* Animated Border */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.imageGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                            
                            <div className="relative h-full p-8 rounded-[31px] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/5 group-hover:bg-[#0A0A0A]/50 transition-all duration-500">
                                {/* Decorative elements inside card */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.imageGradient} opacity-5 blur-[40px] group-hover:opacity-20 transition-opacity duration-500`} />
                                
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 group-hover:rotate-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                        {(() => {
                                            const Icon = ICON_MAP[step.iconName] || Zap;
                                            return <Icon className="w-8 h-8 text-white group-hover:text-[#C3EB7A] transition-colors" />;
                                        })()}
                                    </div>
                                    
                                    <div className="mb-4 flex items-center gap-2">
                                        <div className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${step.imageGradient}`} />
                                        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#C3EB7A] transition-colors">{step.title}</h3>
                                    </div>
                                    
                                    <p className="text-white/40 leading-relaxed font-medium group-hover:text-white/70 transition-colors text-lg">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#C3EB7A]/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Pain Points Section */}
            {solution.painPoints && (
                <section className="w-full max-w-7xl mx-auto px-6 py-32 z-10 relative">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">What's Holding You Back?</h2>
                        <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                            The biggest challenges {solution.title.toLowerCase()} owners face today, solved by MochaEase.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solution.painPoints.map((item, i) => {
                            const Icon = ICON_MAP[item.iconName] || AlertOctagon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/10 p-8 transition-all duration-500 group ${item.border} ${item.glow}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <Icon className={`w-7 h-7 ${item.text}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                                        <p className="text-white/40 text-lg leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Highlight Section */}
            {solution.highlight && (
                <section className="w-full max-w-6xl mx-auto px-6 py-32 z-10 relative">
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[40px] border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C3EB7A]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#C3EB7A]/10 transition-colors duration-700" />
                        
                        <div className="md:w-1/2 relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{solution.highlight.title}</h2>
                            <ul className="space-y-6">
                                {solution.highlight.checklist.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-[#C3EB7A] shrink-0 mt-0.5" />
                                        <span className="text-lg text-white/60 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {solution.highlight.dashboard && (
                            <div className="md:w-1/2 relative z-10 bg-black/50 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-white font-bold">{solution.highlight.dashboard.title}</h4>
                                    <span className="px-3 py-1 bg-[#C3EB7A]/20 text-[#C3EB7A] text-xs font-bold rounded-full">{solution.highlight.dashboard.tag}</span>
                                </div>
                                <div className="space-y-4">
                                    {solution.highlight.dashboard.items.map((item, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                            <div>
                                                <p className="text-white/40 text-xs mb-1 uppercase tracking-wider font-bold">{item.label}</p>
                                                <p className="text-white font-bold text-lg">{item.value}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`${item.statusColor} text-xs mb-1 font-bold`}>{item.status}</p>
                                                <p className="text-white/40 text-xs">{item.subtext}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Interactive Experience Journey */}
            <section className="w-full relative z-20 border-y border-white/5 bg-black/50">
                <div className="max-w-7xl mx-auto px-6 pt-24 mb-12 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4">The MochaEase Experience</h2>
                    <p className="text-white/40 text-lg font-medium">Take a guided tour through your industry-specific workflow.</p>
                </div>
                <ExperienceJourney role={solution.id!} hideBackButton />
            </section>

            {/* Testimonial Section */}
            {solution.testimonial && (
                <section className="w-full max-w-4xl mx-auto px-6 py-40 z-10 text-center">
                    <svg className="w-12 h-12 text-[#C3EB7A] mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed italic">
                        "{solution.testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                        <div className="font-bold text-white text-lg">{solution.testimonial.author}</div>
                        <div className="text-[#C3EB7A] text-sm font-bold uppercase tracking-widest">{solution.testimonial.role}</div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="relative w-full max-w-4xl mx-auto px-6 py-32 z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Questions?</h2>
                    <p className="text-white/40 text-lg font-medium">The most common things {solution.title.toLowerCase()} owners ask us.</p>
                </div>

                <div className="space-y-4">
                    {solution.faqs.map((faq, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
                        >
                            <button 
                                onClick={() => toggleFaq(i)}
                                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-bold text-white">{faq.question}</span>
                                <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${openFaq === i ? 'rotate-180 bg-[#C3EB7A] border-[#C3EB7A]' : ''}`}>
                                    <ChevronDown className={`w-4 h-4 ${openFaq === i ? 'text-black' : 'text-white'}`} />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/5"
                                    >
                                        <div className="p-6 text-white/50 leading-relaxed font-medium">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Relevant Blogs */}
            {relevantBlogs.length > 0 && (
                <section className="relative w-full max-w-7xl mx-auto px-6 py-32 z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="text-left">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Insights for {solution.title}.</h2>
                            <p className="text-white/40 text-lg font-medium">Deep dives into the future of your industry.</p>
                        </div>
                        <Link href="/blog" className="text-[#C3EB7A] font-bold flex items-center gap-2 group hover:gap-3 transition-all">
                            View all articles <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relevantBlogs.map((post, i) => (
                            <Link 
                                key={post.id} 
                                href={`/blog/${post.slug}`}
                                className="group bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden hover:border-[#C3EB7A]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(195,235,122,0.1)]"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img 
                                        src={post.featured_image || ''} 
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-[#C3EB7A] tracking-wider border border-white/10">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read_time}</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-[#C3EB7A] transition-colors">{post.title}</h3>
                                    <p className="text-sm text-white/40 line-clamp-2 mb-6 font-medium">{post.excerpt}</p>
                                    <div className="flex items-center gap-2 text-xs font-black text-white group-hover:text-[#C3EB7A] transition-colors">
                                        Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

        </main>
    );
}
