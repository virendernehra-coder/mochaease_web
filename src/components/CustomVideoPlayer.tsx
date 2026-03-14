'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import Image from 'next/image';

interface CustomVideoPlayerProps {
    src: string;
    poster?: string;
}

export default function CustomVideoPlayer({ src, poster }: CustomVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);

    // Auto-hide controls after 3 seconds of inactivity while playing
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isPlaying) {
            timeout = setTimeout(() => setShowControls(false), 2000);
        } else {
            setShowControls(true);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setProgress((current / total) * 100);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (videoRef.current) {
            const bounds = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const percentage = Math.max(0, Math.min(100, (x / bounds.width) * 100));
            const newTime = (percentage / 100) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
            setProgress(percentage);
        }
    };

    const toggleFullScreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-3xl bg-black border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(74,144,226,0.15)] group cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onMouseMove={() => setShowControls(true)}
            onClick={togglePlay}
        >
            {/* Native Video Element */}
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover relative z-10"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onCanPlay={() => setIsBuffering(false)}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                playsInline
                preload="none"
            />

            {/* Optimized Poster Image with Lazy Loading */}
            {poster && !isPlaying && (
                <div className="absolute inset-0 z-20">
                    <Image
                        src={poster}
                        alt="Video Poster"
                        fill
                        className="object-cover"
                        priority={false}
                        loading="lazy"
                    />
                </div>
            )}

            {/* Dark Gradient Overlay for Controls */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Center Big Play/Pause/Buffer Button */}
            <AnimatePresence>
                {(!isPlaying || showControls || isBuffering) && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                        <div className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-110 hover:bg-white/20">
                            {/* Outer Glow */}
                            <div className="absolute inset-0 rounded-full bg-[#C3EB7A]/20 blur-xl -z-10" />
                            {isBuffering ? (
                                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            ) : isPlaying ? (
                                <Pause className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" />
                            ) : (
                                <Play className="w-10 h-10 md:w-12 md:h-12 ml-2" fill="currentColor" />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Controls Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col gap-4 z-20"
                        onClick={(e) => e.stopPropagation()} // Prevent playing video when interacting with controls
                    >
                        {/* Progress Scrubber */}
                        <div
                            className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden group/scrubber"
                            onClick={handleSeek}
                        >
                            <div
                                className="h-full bg-gradient-to-r from-[#4A90E2] to-[#C3EB7A] relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/scrubber:opacity-100 transition-opacity translate-x-2" />
                            </div>
                        </div>

                        {/* Bottom Tools */}
                        <div className="flex items-center justify-between">
                            {/* Left Side: Play/State Text */}
                            <div className="flex items-center gap-4">
                                <div className="text-white/80 font-medium text-sm">
                                    {isPlaying ? 'Playing' : 'Paused'}
                                </div>
                            </div>

                            {/* Right Side: Volume & Fullscreen */}
                            <div className="flex items-center gap-4">
                                <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                </button>
                                <button onClick={toggleFullScreen} className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                                    <Maximize className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
