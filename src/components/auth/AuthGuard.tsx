'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Only protect /dashboard routes
            if (pathname.startsWith('/dashboard')) {
                // If not authenticated, redirect to login
                if (!isAuthenticated) {
                    router.push('/login');
                    return;
                }
            }
            setIsChecking(false);
        };

        checkAuth();
    }, [isAuthenticated, router, pathname]);

    // Show high-security loading state while verifying
    if (isChecking && pathname.startsWith('/dashboard')) {
        return (
            <main className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3EB7A]/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-[#C3EB7A] animate-spin" />
                        <ShieldAlert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#C3EB7A]/40" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-black text-xs uppercase tracking-[4px] mb-2">Security Verification</p>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[2px]">Decrypting Authorized Session...</p>
                    </div>
                </div>
            </main>
        );
    }

    return <>{children}</>;
}
