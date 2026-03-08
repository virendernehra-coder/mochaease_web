"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Coffee, ShoppingBag, Zap, Building, Scissors, Dumbbell, Map, Users, Receipt, Box, LineChart, ChevronDown,
    HeartHandshake, Truck, Smartphone, QrCode, ChefHat, Globe, Megaphone, ShieldAlert, Monitor, Star, Factory, FileText, Link as LinkIcon, CalendarDays, UserCircle, Ticket, Lock, Target, Trophy
} from 'lucide-react';
import Link from 'next/link';

import { ROLES, CONTENT, type Role } from '@/data/experience';

interface ExperienceJourneyProps {
    role: Exclude<Role, null>;
    onBack?: () => void;
    hideBackButton?: boolean;
}

export default function ExperienceJourney({ role, onBack, hideBackButton = false }: ExperienceJourneyProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Framer Motion Scroll tracking for the main interactive section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <motion.section
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative z-10"
        >
            {/* Intro Header for the selected role */}
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
                {!hideBackButton && onBack && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        onClick={onBack}
                        className="mb-8 px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm font-bold hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                    >
                        &larr; Change Business Type
                    </motion.button>
                )}

                <motion.div
                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-4xl mx-auto flex flex-col gap-6"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 leading-tight">
                        {CONTENT[role].headline}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mx-auto">
                        {CONTENT[role].subheadline}
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 mt-8 animate-bounce opacity-50">
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-white">Scroll to explore</span>
                        <ChevronDown className="w-5 h-5 text-[#C3EB7A]" />
                    </div>
                </motion.div>
            </div>

            {/* ScrollyTelling Container */}
            <div ref={containerRef} className="relative h-[1100vh] w-full">
                <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

                        {/* Left Side: Dynamic Text mapped to Scroll % */}
                        <div className="flex flex-col justify-center h-full relative">
                            {CONTENT[role].steps.map((step, index) => {
                                const start = index * 0.1;
                                const end = start + 0.1;
                                return (
                                    <StepContent
                                        key={index}
                                        step={step}
                                        index={index}
                                        progress={scrollYProgress}
                                        start={start}
                                        end={end}
                                    />
                                );
                            })}
                        </div>

                        {/* Right Side: Dynamic UI/Visuals mapped to Scroll % */}
                        <div className="hidden lg:flex flex-col justify-center h-full relative perspective-[1000px]">
                            {CONTENT[role].steps.map((step, index) => {
                                const start = index * 0.1;
                                const end = start + 0.1;
                                return (
                                    <StepVisual
                                        key={index}
                                        step={step}
                                        index={index}
                                        progress={scrollYProgress}
                                        start={start}
                                        end={end}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA at the end of the journey */}
            <div className="h-[40vh] flex items-center justify-center -mt-[20vh] relative z-20 pb-20">
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]),
                        y: useTransform(scrollYProgress, [0.8, 0.9], [50, 0])
                    }}
                    className="text-center"
                >
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-8">Ready to transform your {role.toLowerCase()}?</h3>
                    <Link href="/demo" className="px-10 py-5 rounded-full bg-[#C3EB7A] text-black font-black text-xl hover:brightness-110 active:scale-95 transition-all inline-block shadow-[0_0_30px_rgba(195,235,122,0.4)]">
                        Book a Free Demo
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

function StepContent({ step, index, progress, start, end }: any) {
    // Reveal text between start and midpoint, hide after midpoint
    const midpoint = start + (end - start) / 2;
    const opacity = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [0, 1, 1, 0, 0]);
    const y = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [50, 0, 0, -50, -50]);
    const pointerEvents = useTransform(progress, (v: number) => (v >= start && v < end) ? "auto" : "none");

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col"
        >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-inner">
                <step.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="text-[#C3EB7A] font-black font-mono text-xl">
                    PHASE {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{step.title}</h3>
            <p className="text-xl md:text-2xl text-white/50 font-medium leading-relaxed max-w-xl">
                {step.desc}
            </p>
        </motion.div>
    );
}

function StepVisual({ step, index, progress, start, end }: any) {
    const midpoint = start + (end - start) / 2;
    const opacity = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [0, 1, 1, 0, 0]);
    const scale = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [0.8, 1, 1, 1.2, 1.2]);
    const rotateX = useTransform(progress, [start, midpoint, end], [20, 0, -20]);

    return (
        <motion.div
            style={{ opacity, scale, rotateX }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="w-full aspect-square max-h-[500px] relative">
                {/* Visual Glass Card */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Dynamic Gradient Background */}
                    <div className={`absolute -inset-20 bg-gradient-to-br ${step.imageGradient} opacity-20 blur-[50px] animate-pulse`} />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <step.icon className="w-40 h-40 text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                    </div>

                    {/* Mocked UI Elements in the card */}
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                            <span className="text-white font-bold font-mono">N</span>
                        </div>
                        <div className="w-24 h-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_currentColor] text-white">
                            <Users className="w-10 h-10" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
