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


            {/* ScrollyTelling Container */}
            <div ref={containerRef} className="relative h-[1100vh] w-full">
                {/* Horizontal Progress Bar */}
                <div className="sticky top-[80px] z-[60] w-full px-6 pointer-events-none">
                    <div className="max-w-7xl mx-auto h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] shadow-[0_0_15px_rgba(195,235,122,0.6)]"
                            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                        />
                    </div>
                </div>

                <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full flex items-center overflow-hidden z-20">
                    {/* Vertical Step Indicators */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-40">
                        {CONTENT[role].steps.map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-8 rounded-full bg-white/10"
                                style={{
                                    backgroundColor: useTransform(
                                        scrollYProgress,
                                        [i * 0.1, (i + 1) * 0.1],
                                        ["rgba(255,255,255,0.1)", "#C3EB7A"]
                                    )
                                }}
                            />
                        ))}
                    </div>

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
    const opacity = useTransform(progress, [start, start + 0.01, end - 0.01, end], [0, 1, 1, 0]);
    const y = useTransform(progress, [start, start + 0.01, end - 0.01, end], [30, 0, 0, -30]);
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
    const opacity = useTransform(progress, [start, start + 0.01, end - 0.01, end], [0, 1, 1, 0]);
    const scale = useTransform(progress, [start, start + 0.01, end - 0.01, end], [0.95, 1, 1, 1.05]);
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
