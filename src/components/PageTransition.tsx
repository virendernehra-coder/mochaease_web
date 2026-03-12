'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
            }}
            exit={{
                opacity: 0,
                y: -12,
                filter: 'blur(4px)',
                transition: { duration: 0.25, ease: [0.55, 0.06, 0.68, 0.19] as const },
            }}
        >
            {children}
        </motion.div>
    );
}
