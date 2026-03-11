'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Server,
    Database,
    Zap,
    Cpu,
    Eye,
    Activity,
    ArrowUpRight,
    Search,
    Fingerprint,
    ShieldAlert,
    Scan,
    FileText
} from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CyberGrid = dynamic(() => import('./CyberGrid'), { ssr: false });

// --- Premium Components ---

const ScanningOverlay = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('INIT_SECURE_VAULT_HANDSHAKE');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        const statusMessages = [
            'AUTH_USER_ENCRYPTION_KEY',
            'DECRYPTING_SECURITY_PROTOCOLS',
            'ESTABLISHING_BANK_GRADE_TUNNEL',
            'VERIFYING_PCI_DSS_LEVEL_1',
            'SYNCING_MULTI_REGION_NODES',
            'ACCESS_GRANTED'
        ];

        let msgIdx = 0;
        const msgTimer = setInterval(() => {
            msgIdx = (msgIdx + 1) % statusMessages.length;
            setStatus(statusMessages[msgIdx]);
        }, 800);

        return () => {
            clearInterval(timer);
            clearInterval(msgTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_70%)]" />
                <div className="w-full h-full bg-[linear-gradient(rgba(195,235,122,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(195,235,122,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative space-y-8 text-center"
            >
                <div className="relative inline-block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 rounded-full border-2 border-dashed border-[#C3EB7A]/20"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-32 h-32 rounded-full border-2 border-dashed border-[#4A90E2]/20 scale-125"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Scan className="w-12 h-12 text-[#C3EB7A] animate-pulse" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-white/40 italic">System Authentication</h2>
                    <div className="font-mono text-[10px] text-[#C3EB7A] h-4">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={status}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {status}... {progress}%
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

const CursorGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-30 mix-blend-screen overflow-hidden"
            animate={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(195,235,122,0.03), transparent 80%)`
            }}
        />
    );
};

const SecurityDetailCard = ({ pillar, idx, isMobile = false, isClient = false }: { pillar: any, idx: number, isMobile?: boolean, isClient?: boolean }) => {
    // Stability defaults for server/hydration
    const xOffset = isClient && !isMobile ? 50 : 0;
    const yOffset = isClient && isMobile ? 20 : 0;
    const exitX = isClient && !isMobile ? -50 : 0;
    const exitY = isClient && isMobile ? -20 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: xOffset, y: yOffset }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: exitX, y: exitY }}
            className={`rounded-[2.5rem] md:rounded-[4.5rem] bg-gradient-to-br from-[#1A1A1A] to-[#050505] border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative perspective-1000 overflow-hidden ${isMobile ? 'p-8 mt-4 mb-8' : 'p-16'}`}
        >
            <div
                className="absolute top-0 right-0 w-full h-full opacity-10 blur-[150px] pointer-events-none"
                style={{ backgroundColor: pillar.color }}
            />

            <div className="flex items-center gap-4 mb-12 opacity-40">
                <Fingerprint className="w-6 h-6" />
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">Protocol_ID::VERIFIED</span>
            </div>

            <h4 className="text-3xl md:text-5xl font-black mb-12 tracking-tight italic">
                Security <span className="text-[#C3EB7A]">Deep-Scan</span>
            </h4>

            <div className="grid grid-cols-1 gap-6 md:gap-8 flex-1">
                {pillar.details.map((detail: string, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 md:gap-6 group"
                    >
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#C3EB7A] transition-colors shrink-0">
                            <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:text-black" />
                        </div>
                        <span className="text-lg md:text-2xl text-white/50 font-bold group-hover:text-white transition-colors leading-tight">{detail}</span>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 md:mt-16 pt-8 md:pt-16 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white/20 italic font-mono text-[10px] md:text-xs tracking-tighter">
                    <Eye className="w-3 h-3 md:w-4 md:h-4" /> SEC_LAYER_0{idx + 1}_UPTIME: 99.99%
                </div>
                <div className="w-16 md:w-24 h-1 bg-white/5 rounded-full overflow-hidden text-clip">
                    <motion.div
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="h-full w-10 bg-[#C3EB7A] blur-[2px]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

// --- Data ---

const SECURITY_PILLARS = [
    {
        title: 'Payment Security',
        icon: <Zap className="w-6 h-6" />,
        color: '#C3EB7A',
        accent: 'rgba(195,235,122,0.2)',
        description: 'Industry-leading encryption for every transaction.',
        details: [
            'PCI-DSS Level 1 Compliance',
            'End-to-End Encryption (E2EE)',
            'Tokenized Payment Processing',
            'Point-to-Point Encryption (P2PE)'
        ]
    },
    {
        title: 'Data Reliability',
        icon: <Database className="w-6 h-6" />,
        color: '#4A90E2',
        accent: 'rgba(74,144,226,0.2)',
        description: 'Global data sovereignty and 24/7 mirroring.',
        details: [
            'GDPR & CCPA Compliant',
            'AES-256 Cloud Encryption',
            'Automated Hourly Backups',
            'SOC 2 Type II Audited'
        ]
    },
    {
        title: 'Cloud Persistence',
        icon: <Server className="w-6 h-6" />,
        color: '#C3EB7A',
        accent: 'rgba(195,235,122,0.2)',
        description: '99.99% uptime with automated self-healing.',
        details: [
            '99.99% Guaranteed SLA',
            'Multi-Region Failover',
            'Real-time Threat Mitigation',
            'Offline Mode Support'
        ]
    },
    {
        title: 'Deep Intelligence',
        icon: <Cpu className="w-6 h-6" />,
        color: '#4A90E2',
        accent: 'rgba(74,144,226,0.2)',
        description: 'AI-driven threat detection and monitoring.',
        details: [
            'AI Security Operations',
            'Anomaly Detection Engine',
            'RBAC Permissions Matrix',
            'Continuous External Audits'
        ]
    }
];
export default function SecurityClient() {
    const [isLoading, setIsLoading] = useState(true);
    const [activePillar, setActivePillar] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
    const detailScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
        // We'll let the ScanningOverlay handle the completion
    }, []);

    const handlePillarClick = (idx: number) => {
        setActivePillar(idx);
        // Desktop scroll to detail view
        if (isClient && window.innerWidth >= 1024) {
            detailScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (isClient) {
            // Mobile scroll to the pillar itself so the accordion is visible
            setTimeout(() => {
                pillarRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 overflow-x-hidden">
            <AnimatePresence>
                {isLoading && <ScanningOverlay onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && <CursorGlow />}
            <CyberGrid />

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10"
            >
                {/* Hero Section */}
                <section className="relative pt-40 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col items-center text-center space-y-8 mb-32">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#C3EB7A] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C3EB7A]">Shield Encryption Active</span>
                            </motion.div>

                            <div className="relative">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl leading-[1.1] relative z-10"
                                >
                                    Banking-Grade Security. <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)] italic">Built for Modern Commerce.</span>
                                </motion.h1>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="absolute bottom-4 left-0 h-[20%] bg-[#C3EB7A]/20 blur-2xl -z-10"
                                />
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl text-white/40 max-w-3xl font-medium leading-relaxed italic"
                            >
                                Architecture engineered for 100% data integrity and zero-trust verification. Secure your commerce lifecycle with the MochaEase vault.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-48 relative">
                            <div className="space-y-6">
                                {SECURITY_PILLARS.map((pillar, idx) => (
                                    <div key={pillar.title} ref={el => { pillarRefs.current[idx] = el; }}>
                                        <motion.button
                                            onClick={() => handlePillarClick(idx)}
                                            className={`w-full group relative p-10 rounded-[2.5rem] border-2 text-left transition-all duration-700 overflow-hidden ${activePillar === idx
                                                ? 'bg-white/[0.03] border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
                                                : 'bg-transparent border-transparent hover:bg-white/[0.01]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-8 relative z-10">
                                                <div
                                                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 scale-125 md:scale-100 ${activePillar === idx ? 'shadow-[0_0_30px_rgba(195,235,122,0.3)]' : ''
                                                        }`}
                                                    style={{
                                                        backgroundColor: activePillar === idx ? pillar.color : 'rgba(255,255,255,0.03)',
                                                        color: activePillar === idx ? 'black' : 'white'
                                                    }}
                                                >
                                                    {pillar.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className={`text-3xl font-black transition-colors ${activePillar === idx ? 'text-white' : 'text-white/30'}`}>
                                                            {pillar.title}
                                                        </h3>
                                                        {activePillar === idx && <Activity className="w-5 h-5 text-[#C3EB7A] animate-pulse" />}
                                                    </div>
                                                    <p className="text-white/40 text-base font-medium max-w-xs">{pillar.description}</p>
                                                </div>
                                            </div>

                                            {/* Hover/Active Scanning Lines */}
                                            <AnimatePresence>
                                                {activePillar === idx && (
                                                    <motion.div
                                                        initial={{ top: '-100%' }}
                                                        animate={{ top: '200%' }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C3EB7A]/5 to-transparent h-1/2 pointer-events-none"
                                                    />
                                                )}
                                            </AnimatePresence>

                                            {activePillar === idx && (
                                                <motion.div
                                                    layoutId="active-shield"
                                                    className="absolute inset-0 border-2 border-[#C3EB7A]/20 rounded-[2.5rem] pointer-events-none"
                                                />
                                            )}
                                        </motion.button>

                                        {/* Inline Mobile Details */}
                                        <div className="lg:hidden">
                                            <AnimatePresence>
                                                {activePillar === idx && isClient && (
                                                    <SecurityDetailCard pillar={pillar} idx={idx} isMobile={true} isClient={isClient} />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Sticky Detail Card */}
                            <div
                                ref={detailScrollRef}
                                className="hidden lg:block sticky top-40 h-fit"
                            >
                                <AnimatePresence mode="wait">
                                    {isClient && (
                                        <SecurityDetailCard
                                            key={activePillar}
                                            pillar={SECURITY_PILLARS[activePillar]}
                                            idx={activePillar}
                                            isClient={isClient}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Certification Grid - HIDDEN FOR NOW AS PER USER REQUEST */}
                        {/*
                        <div className="pt-32 border-t border-white/5">
                            ...
                        </div>
                        */}
                    </div>
                </section>

                {/* Bottom Disclaimer Footer */}
                <footer className="py-24 px-6 border-t border-white/5 bg-[#080808]">
                    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-16">
                        <div className="flex flex-wrap items-center justify-center gap-12 py-6 px-12 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <span className="text-sm font-black uppercase tracking-[0.3em]">SECURE_CLOUD</span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">AES_256_ACTIVE</span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">TLS_1.3_ENFORCED</span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">ZERO_TRUST</span>
                        </div>

                        <div className="text-center space-y-4">
                            <p className="text-white/20 font-mono text-xs uppercase tracking-[0.5em]">System Architecture Version 11.20.94</p>
                            <p className="text-white/10 font-mono text-[9px] max-w-2xl mx-auto leading-relaxed">
                                WARNING: UNAUTHORIZED DATA EXTRACTION ATTEMPTS ARE LOGGED AND AUTOMATICALLY TRANSMITTED TO THE SECURITY OPERATIONS CENTER. MOCHAEASE EMPLOYS PROACTIVE COUNTER-MITIGATION PROTOCOLS.
                            </p>
                        </div>
                    </div>
                </footer>
            </motion.div>
        </main >
    );
}
