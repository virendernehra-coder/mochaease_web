'use client';
import { useEffect, useState } from "react";
import type { Container, Engine } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function NetworkBackground() {
    const [init, setInit] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Skip particles entirely on mobile — saves ~100KB JS + GPU load
        if (window.innerWidth < 768) {
            return () => window.removeEventListener('resize', checkMobile);
        }

        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

    if (isMobile) return null;

    if (init) {
        return (
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    className="w-full h-full"
                    options={{
                        fullScreen: { enable: false },
                        background: {
                            color: {
                                value: "transparent",
                            },
                        },
                        fpsLimit: 60,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "grab",
                                },
                            },
                            modes: {
                                push: {
                                    quantity: 2,
                                },
                                grab: {
                                    distance: 120,
                                    links: {
                                        opacity: 0.4
                                    }
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: ["#4A90E2", "#C3EB7A", "#ffffff"],
                            },
                            links: {
                                color: "#334155", // slate-700
                                distance: 100,
                                enable: true,
                                opacity: 0.2,
                                width: 1,
                            },
                            collisions: {
                                enable: false,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: true,
                                speed: 0.5,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    width: 1000,
                                },
                                value: 40,
                            },
                            opacity: {
                                value: { min: 0.1, max: 0.4 },
                                animation: {
                                    enable: true,
                                    speed: 0.5,
                                    sync: false
                                }
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 3 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>
        );
    }
    return <div className="absolute inset-0 z-0 pointer-events-none" />;
}
