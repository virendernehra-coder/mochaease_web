'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import {
    PlayCircle, Clock, BookOpen, CheckCircle2,
    Trophy, Lock, Globe, MapPin, ChevronRight, Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';

// Raw video data
const ALL_TUTORIALS = [
    {
        id: '1',
        title: 'Best POS Software for Cafés & Restaurants | AI Billing & Operations',
        description: 'See how MochaEase powers Cafés and Restaurants with intelligent billing and comprehensive AI operations.',
        videoId: 'NLLMpGqX2F8',
        duration: '2:23',
        category: 'Getting Started',
        region: 'Global',
        icon: <BookOpen className="w-5 h-5" />
    },
    {
        id: '2',
        title: 'MochaEase Intro Indonesia',
        description: 'An introduction to MochaEase tailored specifically for our partners and businesses in Indonesia.',
        videoId: 'PiXTPLPDGcU',
        duration: '1:42',
        category: 'Localization',
        region: 'Indonesia',
        icon: <MapPin className="w-5 h-5" />
    },
    {
        id: '3',
        title: 'MochaEase Business Management System Introduction',
        description: 'Discover the full capabilities of the MochaEase Business Management suite for scaling your brand.',
        videoId: 'ZQ9y0LJpnxc',
        duration: '1:37',
        category: 'Overview',
        region: 'Global',
        icon: <Globe className="w-5 h-5" />
    },
    {
        id: '4',
        title: 'Video 6: Payroll & Expense Insights',
        description: 'Learn how to automatically audit payroll and gain deep insights into where your expenses are going.',
        videoId: 'Opqig249ACY',
        duration: '0:50',
        category: 'Analytics',
        region: 'Global',
        icon: <Clock className="w-5 h-5" />
    },
    {
        id: '5',
        title: 'Video 5: Sales & Business Health Dashboard',
        description: 'A walkthrough of the Sales & Business Health Dashboard and how to interpret your Weekly Health Score.',
        videoId: '--bCsSeyw5Q',
        duration: '0:49',
        category: 'Enterprise',
        region: 'Global',
        icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
        id: '6',
        title: 'Video 4: Inventory & Stock Alerts',
        description: 'How to monitor real-time stock levels, prevent spillage, and set up automated low-inventory alerts.',
        videoId: 'wKjVVDvs32k',
        duration: '0:55',
        category: 'Automation',
        region: 'Global',
        icon: <Trophy className="w-5 h-5" />
    }
];

export default function GuidesPage() {
    // State
    const [region, setRegion] = useState<'Global' | 'Indonesia'>('Global');
    const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
    const [activeVideoId, setActiveVideoId] = useState<string>('1');

    // Filter tutorials based on region selection
    const visibleTutorials = useMemo(() => {
        return ALL_TUTORIALS.filter(t => t.region === 'Global' || t.region === region);
    }, [region]);

    // Calculate progress
    const progressPercentage = (completedIds.size / visibleTutorials.length) * 100;
    const isFullyCompleted = completedIds.size === visibleTutorials.length && visibleTutorials.length > 0;

    // Derived active index & item
    const activeIndex = visibleTutorials.findIndex(t => t.id === activeVideoId);
    const activeTutorial = visibleTutorials[activeIndex] || visibleTutorials[0];

    // Handlers
    const handleComplete = (id: string) => {
        setCompletedIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });

        // Auto-advance to the next incomplete video
        const nextIncomplete = visibleTutorials.find(t => t.id !== id && !completedIds.has(t.id));
        if (nextIncomplete) {
            setActiveVideoId(nextIncomplete.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSelectVideo = (id: string, index: number) => {
        // Can only click if it's the first uncompleted one OR it's already completed OR it's the exact next one to do
        const isCompleted = completedIds.has(id);
        const isNextUnlock = index === 0 || completedIds.has(visibleTutorials[index - 1].id);

        if (isCompleted || isNextUnlock) {
            setActiveVideoId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Only run on client side
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A] selection:text-black font-sans pb-32">
            <Navbar />

            {/* Gamification Confetti */}
            {isFullyCompleted && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        colors={['#C3EB7A', '#4A90E2', '#E040FB', '#FF9500']}
                        numberOfPieces={500}
                        recycle={false}
                        gravity={0.15}
                    />
                </div>
            )}

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#C3EB7A]/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4A90E2]/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-40">

                {/* Header & Region Selector */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 mb-6 backdrop-blur-md"
                        >
                            <Award className="w-4 h-4 text-[#C3EB7A]" />
                            MochaEase Mastery Path
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Onboarding</span> Journey
                        </h1>
                        <p className="text-white/50 text-lg max-w-xl">
                            Unlock your business's full potential. Watch the guides step-by-step to master the AI capabilities.
                        </p>
                    </div>

                    {/* Region Toggle */}
                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Select Your Region</label>
                        <div className="bg-[#111] p-1.5 rounded-xl border border-white/10 flex">
                            <button
                                onClick={() => setRegion('Global')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${region === 'Global'
                                    ? 'bg-[#C3EB7A] text-black shadow-[0_0_20px_rgba(195,235,122,0.3)]'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                Global (US/UK/IN)
                            </button>
                            <button
                                onClick={() => setRegion('Indonesia')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${region === 'Indonesia'
                                    ? 'bg-[#4A90E2] text-white shadow-[0_0_20px_rgba(74,144,226,0.3)]'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                Indonesia
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="mb-12 bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                    {/* Confetti / Glow effect if completed */}
                    {isFullyCompleted && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-[#C3EB7A]/20 to-[#4A90E2]/20 blur-xl pointer-events-none"
                        />
                    )}

                    <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-2 border-white/10 flex items-center justify-center flex-shrink-0 relative z-10">
                        {isFullyCompleted ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                                <Trophy className="w-8 h-8 text-[#C3EB7A]" />
                            </motion.div>
                        ) : (
                            <span className="text-xl font-black text-white/80">{Math.round(progressPercentage)}%</span>
                        )}
                    </div>

                    <div className="flex-grow w-full relative z-10">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    {isFullyCompleted ? "Mastery Achieved!" : "Course Progress"}
                                </h3>
                                <p className="text-sm text-white/50">
                                    {completedIds.size} of {visibleTutorials.length} modules completed
                                </p>
                            </div>
                            {isFullyCompleted && (
                                <span className="text-[#C3EB7A] font-bold text-sm tracking-widest uppercase">Certified Pofessional</span>
                            )}
                        </div>
                        <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Active Video Player (Left Side - 8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTutorial.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
                            >
                                {/* Video Container */}
                                <div className="relative w-full pt-[56.25%] bg-black border-b border-white/10">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${activeTutorial.videoId}?rel=0&modestbranding=1&autoplay=1&mute=1`}
                                        title={activeTutorial.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                {/* Active Video Details */}
                                <div className="p-8 md:p-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#4A90E2]/10 text-[#4A90E2] uppercase tracking-wider backdrop-blur-md">
                                            Module {activeIndex + 1}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-white/40 text-sm font-medium">
                                            <Clock className="w-4 h-4" />
                                            {activeTutorial.duration}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                                        {activeTutorial.title}
                                    </h2>
                                    <p className="text-white/60 text-lg leading-relaxed mb-10">
                                        {activeTutorial.description}
                                    </p>

                                    {/* Action Button */}
                                    {!completedIds.has(activeTutorial.id) ? (
                                        <button
                                            onClick={() => handleComplete(activeTutorial.id)}
                                            className="w-full sm:w-auto bg-white/10 hover:bg-white text-white hover:text-black font-bold text-lg px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 group"
                                        >
                                            <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <div className="w-2.5 h-2.5 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            Mark as Completed
                                        </button>
                                    ) : (
                                        <div className="inline-flex items-center gap-3 bg-[#C3EB7A]/10 text-[#C3EB7A] font-bold text-lg px-8 py-4 rounded-xl border border-[#C3EB7A]/20">
                                            <CheckCircle2 className="w-6 h-6" />
                                            Module Completed
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Playlist / Journey Map (Right Side - 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-white mb-2 pl-2">Curriculum Sequence</h3>

                        {visibleTutorials.map((tutorial, index) => {
                            const isCompleted = completedIds.has(tutorial.id);
                            const isActive = activeVideoId === tutorial.id;
                            const isLocked = !isCompleted && index > 0 && !completedIds.has(visibleTutorials[index - 1].id);

                            return (
                                <motion.div
                                    key={tutorial.id}
                                    layout
                                    onClick={() => !isLocked && handleSelectVideo(tutorial.id, index)}
                                    className={`relative p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${isLocked
                                        ? 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed hidden md:flex'
                                        : isActive
                                            ? 'bg-[#1A1A1A] border-[#C3EB7A]/30 shadow-[0_0_30px_rgba(195,235,122,0.05)] cursor-pointer'
                                            : 'bg-[#111] border-white/5 hover:border-white/20 cursor-pointer'
                                        }`}
                                >
                                    {/* Vertical connecting line */}
                                    {index !== visibleTutorials.length - 1 && (
                                        <div className="absolute left-[38px] top-[52px] bottom-[-20px] w-0.5 bg-white/5 z-0 hidden md:block" />
                                    )}

                                    {/* Status Icon */}
                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted
                                        ? 'bg-[#C3EB7A] text-black shadow-[0_0_15px_rgba(195,235,122,0.4)]'
                                        : isActive
                                            ? 'bg-[#1A1A1A] border-2 border-[#C3EB7A] text-[#C3EB7A]'
                                            : isLocked
                                                ? 'bg-black border border-white/10 text-white/30'
                                                : 'bg-white/10 text-white'
                                        }`}>
                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" />
                                            : isLocked ? <Lock className="w-4 h-4" />
                                                : isActive ? <PlayCircle className="w-5 h-5 ml-0.5" />
                                                    : <span className="text-sm font-bold">{index + 1}</span>}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col flex-grow min-w-0 pt-0.5">
                                        <h4 className={`text-sm font-bold truncate mb-1 transition-colors ${isActive || isCompleted ? 'text-white' : 'text-white/60'
                                            }`}>
                                            {tutorial.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-xs font-medium text-white/40">
                                            <span>{tutorial.duration}</span>
                                            {isCompleted && <span className="text-[#C3EB7A]">Completed</span>}
                                            {isActive && <span className="text-[#4A90E2] animate-pulse">Now Playing</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
