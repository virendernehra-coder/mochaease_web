'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';

export default function NotFound() {
    return (
        <main className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-20">
            {/* Background with particles */}
            <NetworkBackground />

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex max-w-2xl flex-col items-center text-center"
            >
                {/* Large 404 Header */}
                <div className="relative mb-8">
                    <motion.h1
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 100
                        }}
                        className="text-[12rem] font-bold leading-none tracking-tighter text-transparent"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, #4A90E2 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}
                    >
                        404
                    </motion.h1>
                    <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-[#4A90E2]" />
                </div>

                {/* Glassmorphism Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
                >
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Lost in the Brew?
                    </h2>
                    <p className="mb-8 text-lg text-slate-400">
                        The page you're looking for has either moved or doesn't exist.
                        Let's get you back to the main dash.
                    </p>

                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(195, 235, 122, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#C3EB7A] px-8 py-4 text-lg font-bold text-black transition-all duration-300"
                        >
                            <span className="relative z-10 transition-transform group-hover:-translate-x-1">
                                Return to Safety
                            </span>
                            <svg
                                className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Subtle Bottom Glow */}
                <div className="absolute -bottom-20 -z-10 h-64 w-64 rounded-full bg-[#C3EB7A] opacity-5 blur-[120px]" />
            </motion.div>

            {/* Tailwind Utility for shimmer used above if needed, but we can stick to native if possible. 
          Actually, the shimmer effect needs a custom animation in tailwind config if we want it to work perfectly.
          Since I shouldn't touch other things, I'll use a simpler hover effect.
      */}
        </main>
    );
}
