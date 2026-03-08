'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';
import { Clock, ArrowRight, User, Calendar, BookOpen, Send, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Chatbot from '@/components/Chatbot';

// Placeholder Blog Data
const FEATURED_POST = {
    id: '1',
    title: 'How AI is Rewriting the Future of Multi-Outlet Inventory Management',
    excerpt: 'Discover how predictive forecasting is reducing stockouts by 40% and cutting perishables waste in half across Asian F&B chains.',
    category: 'Product Updates',
    readTime: '8 min read',
    date: 'Oct 12, 2024',
    author: 'Sarah Chen, Product Lead',
    slug: '/blog/ai-future-inventory',
    color: 'from-blue-500/20 to-[#4A90E2]/10',
    blob: 'bg-[#4A90E2]/20'
};

const BLOG_POSTS = [
    {
        id: '2', title: '5 Reasons Your Cafe Needs an Offline-First POS', excerpt: 'Internet drops shouldn’t mean pausing your business. Here is why an offline-first POS architecture is non-negotiable for high-volume cafes.',
        category: 'Cafe Management', readTime: '5 min read', date: 'Oct 05, 2024', author: 'Rahul Gupta', color: 'from-orange-500/20 to-amber-500/10'
    },
    {
        id: '3', title: 'Building a Loyalty Program That Actually Works', excerpt: 'Stop using physical stamp cards. Learn how to leverage digital CRM and automated WhatsApp campaigns to turn walk-ins into regulars.',
        category: 'Retail Tips', readTime: '6 min read', date: 'Sep 28, 2024', author: 'Tina Agarwal', color: 'from-pink-500/20 to-rose-500/10'
    },
    {
        id: '4', title: 'MochaEase 2.0: The Ecosystem Approach', excerpt: 'We rebuilt our core architecture to seamlessly sync iOS, Android, and Web backoffice in real-time. Here is a look under the hood.',
        category: 'Product Updates', readTime: '10 min read', date: 'Sep 15, 2024', author: 'Vikram Singh, CTO', color: 'from-[#C3EB7A]/20 to-emerald-500/10'
    },
    {
        id: '5', title: 'Managing Gen Z Staff in the QSR Industry', excerpt: 'Retention is the new recruitment. Practical frameworks for onboarding, scheduling, and retaining young talent in fast-paced environments.',
        category: 'Retail Tips', readTime: '7 min read', date: 'Sep 02, 2024', author: 'Maya Patel', color: 'from-purple-500/20 to-indigo-500/10'
    },
    {
        id: '6', title: 'Demystifying Franchise Royalty Reports', excerpt: 'Manual royalty calculations cause friction between HQ and franchisees. See how automated gross-sales reporting restores trust.',
        category: 'Enterprise', readTime: '12 min read', date: 'Aug 20, 2024', author: 'Arjun Reddy', color: 'from-cyan-500/20 to-blue-500/10'
    },
];

const CATEGORIES = ['All', 'Product Updates', 'Cafe Management', 'Retail Tips', 'Enterprise'];

export default function Blog() {
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const filteredPosts = activeCategory === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((post) => post.category === activeCategory);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000); // Reset after 3 seconds
            setEmail('');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
            <div className="absolute top-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-black/20 to-transparent pointer-events-none" />

            {/* Header Section */}
            <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-12 flex flex-col z-10">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
                    <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-xs font-bold text-white tracking-wide uppercase">MochaEase Journal</span>
                    </motion.div>
                    <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                        Insights for the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Modern Merchant.</span>
                    </motion.h1>
                    <motion.p variants={fadeUpVariant} className="text-xl text-white/50 max-w-2xl font-medium">
                        Product updates, industry trends, and practical guides for running profitable retail and F&B operations.
                    </motion.p>
                </motion.div>

                {/* Featured Post Hero */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full">
                    <Link href={FEATURED_POST.slug} className="group block relative w-full rounded-[40px] p-[1px] bg-gradient-to-br from-white/20 to-transparent hover:from-white/40 transition-all duration-700 overflow-hidden">
                        <div className="absolute inset-0 bg-[#0A0A0A] rounded-[40px] -z-10" />
                        <div className={`absolute -top-32 -right-32 w-96 h-96 ${FEATURED_POST.blob} blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-1000`} />

                        <div className="relative p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center z-10">
                            {/* Abstract Graphic representing the featured image */}
                            <div className={`w-full md:w-1/2 aspect-[4/3] rounded-3xl bg-gradient-to-br ${FEATURED_POST.color} border border-white/10 overflow-hidden relative flex items-center justify-center group-hover:shadow-[0_0_50px_rgba(74,144,226,0.15)] transition-shadow duration-700`}>
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                                <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center relative overlow-hidden group-hover:scale-110 transition-transform duration-700">
                                    <div className="absolute inset-2 bg-gradient-to-tr from-[#4A90E2] to-transparent rounded-full blur-[10px] opacity-50"></div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/10">{FEATURED_POST.category}</span>
                                    <div className="flex items-center gap-1 text-white/40 text-xs font-medium">
                                        <Clock className="w-3 h-3" /> {FEATURED_POST.readTime}
                                    </div>
                                    <div className="flex items-center gap-1 text-white/40 text-xs font-medium">
                                        <Calendar className="w-3 h-3" /> {FEATURED_POST.date}
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#4A90E2] transition-colors duration-500">
                                    {FEATURED_POST.title}
                                </h2>
                                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                    {FEATURED_POST.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/20 flex items-center justify-center">
                                            <User className="w-4 h-4 text-white/50" />
                                        </div>
                                        <span className="text-sm font-bold text-white">{FEATURED_POST.author}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#4A90E2] group-hover:border-[#4A90E2] transition-colors duration-500">
                                        <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-black group-hover:-rotate-45 transition-all duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </section>

            {/* Blog Grid Section */}
            <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 z-10 relative">

                {/* Categories Filter */}
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Posts Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={post.id}
                                className="group h-full"
                            >
                                <Link href={`/blog/post-${post.id}`} className="block h-full p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/30 transition-all duration-500 overflow-hidden">
                                    <div className="h-full bg-[#0A0A0A] rounded-3xl flex flex-col relative z-10 overflow-hidden">

                                        {/* Abstract Cover Image Area */}
                                        <div className={`w-full h-48 bg-gradient-to-br ${post.color} relative overflow-hidden flex items-center justify-center border-b border-white/5 group-hover:brightness-110 transition-all duration-500`}>
                                            <div className="w-16 h-16 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                                        </div>

                                        <div className="p-6 md:p-8 flex flex-col flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                                <span className="px-2.5 py-1 rounded-md bg-white/5 text-white/80 text-[10px] font-black uppercase tracking-wider">{post.category}</span>
                                                <div className="flex items-center gap-1 text-white/30 text-xs font-medium">
                                                    <Clock className="w-3 h-3" /> {post.readTime}
                                                </div>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#C3EB7A] transition-colors">{post.title}</h3>
                                            <p className="text-white/50 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>

                                            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                                <span className="text-xs font-medium text-white/40">{post.date}</span>
                                                <div className="flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                                                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-[#C3EB7A] transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPosts.length === 0 && (
                    <div className="w-full py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <BookOpen className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No posts found</h3>
                        <p className="text-white/50">Check back later for updates in this category.</p>
                        <button onClick={() => setActiveCategory('All')} className="mt-6 text-[#4A90E2] font-bold hover:underline">View all articles</button>
                    </div>
                )}
            </section>

            {/* Newsletter Subscription CTA */}
            <section className="w-full z-10 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
                    <div className="relative p-[1px] rounded-[40px] bg-gradient-to-r from-[#C3EB7A]/30 via-[#4A90E2]/30 to-purple-500/30 overflow-hidden">
                        <div className="absolute inset-0 bg-[#0A0A0A] rounded-[40px] -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(195,235,122,0.1),_transparent_70%)] pointer-events-none" />

                        <div className="relative p-10 md:p-16 text-center z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C3EB7A] to-[#4A90E2] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(195,235,122,0.3)]">
                                <Mail className="w-8 h-8 text-black" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Never Miss an Update</h2>
                            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                                Join 10,000+ founders receiving our weekly insights on managing modern retail and hospitality businesses.
                            </p>

                            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@company.com"
                                    required
                                    className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C3EB7A] focus:bg-white/10 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 rounded-full bg-[#C3EB7A] text-black font-black hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.2)] flex items-center justify-center gap-2"
                                >
                                    Subscribe <Send className="w-4 h-4" />
                                </button>

                                <AnimatePresence>
                                    {subscribed && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-12 left-0 right-0 text-[#C3EB7A] text-sm font-bold flex items-center justify-center gap-2"
                                        >
                                            <span className="w-4 h-4 rounded-full bg-[#C3EB7A] text-black flex items-center justify-center text-[10px]">✓</span> Check your inbox to confirm!
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Chatbot />
        </main>
    );
}
