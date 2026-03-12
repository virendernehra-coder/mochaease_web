'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CyberGrid = () => {
    const [nodes, setNodes] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

    useEffect(() => {
        setNodes([...Array(20)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5
        })));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="absolute inset-0 bg-[#050505]" />
            {/* Animated Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(hsla(0,0%,100%,0.05)_1px,transparent_1px),linear-gradient(90deg,hsla(0,0%,100%,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Random Data Nodes - Only rendered on client after mount */}
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: node.duration,
                        repeat: Infinity,
                        delay: node.delay
                    }}
                    className="absolute w-1 h-1 bg-[#C3EB7A] rounded-full blur-[1px]"
                    style={{
                        top: node.top,
                        left: node.left
                    }}
                />
            ))}
        </div>
    );
};

export default CyberGrid;
