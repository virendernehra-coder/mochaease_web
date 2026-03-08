import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-10 relative overflow-hidden z-10">
            {/* Background Ambience */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C3EB7A]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#4A90E2]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Top CTA Banner */}
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[40px] p-10 md:p-16 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3EB7A]/10 blur-[80px] rounded-full group-hover:bg-[#C3EB7A]/20 transition-colors duration-500" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Run a Smoother Business?</h2>
                        <p className="text-white/60 text-lg md:text-xl max-w-xl">Join thousands of businesses managing their daily chaos with MochaEase.</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                        <Link href="/register" className="inline-flex px-8 py-4 rounded-full bg-[#C3EB7A] text-black font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)] gap-2 group/btn">
                            Start Free Trial <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center group mb-6 inline-flex">
                            <div className="text-[#C3EB7A] font-extrabold text-4xl tracking-tighter shrink-0 m-0 leading-none group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(195,235,122,0.5)]">m</div>
                            <div className="text-white font-extrabold text-4xl tracking-tighter shrink-0 m-0 leading-none">E.</div>
                        </Link>
                        <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                            The all-in-one, AI-powered POS platform built for modern businesses across every vertical. Stop guessing. Start dominating.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/#features" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Features</Link></li>
                            <li><Link href="/#pricing" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Pricing</Link></li>
                            <li><Link href="/demo" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Book a Demo</Link></li>
                            <li><Link href="/calculator" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Savings Calculator</Link></li>
                        </ul>
                    </div>

                    {/* Use Cases */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Use Cases</h4>
                        <ul className="space-y-4">
                            <li><Link href="/use-cases/cafe" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Cafe & Coffee Shops</Link></li>
                            <li><Link href="/use-cases/qsr" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Quick Service (QSR)</Link></li>
                            <li><Link href="/use-cases/fashion" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Fashion & Boutique</Link></li>
                            <li><Link href="/use-cases/enterprise" className="text-white/50 hover:text-[#4A90E2] text-sm font-bold transition-colors">Enterprise Chains</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Blog</Link></li>
                            <li><Link href="/support" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Support Center</Link></li>
                            <li><Link href="/contact" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm font-medium">
                        &copy; {new Date().getFullYear()} MochaEase Tech Private Limited. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors">Terms of Service</Link>
                        <div className="flex items-center gap-1 text-white/30 hover:text-white/70 transition-colors cursor-pointer group">
                            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-xs font-bold">English (US)</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
