'use client';
import { useEffect, useState } from "react";
import type { Container, Engine } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function NetworkBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            // load slim version to optimize bundle size
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

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
                                    quantity: 4,
                                },
                                grab: {
                                    distance: 140,
                                    links: {
                                        opacity: 0.5
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
                                distance: 150,
                                enable: true,
                                opacity: 0.3,
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
                                    width: 800,
                                },
                                value: 60,
                            },
                            opacity: {
                                value: { min: 0.1, max: 0.6 },
                                animation: {
                                    enable: true,
                                    speed: 1,
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
