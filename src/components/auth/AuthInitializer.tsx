'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserStore, SessionUser } from '@/store/user-store';
import { getUserProfile, getEmployeeProfile } from '@/utils/supabase/queries-client';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { setUser, clearSession } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const userId = session.user.id;
                
                // 1. Try fetching Owner Profile
                const ownerProfile = await getUserProfile(userId);
                if (ownerProfile) {
                    const userData: SessionUser = {
                        id: userId,
                        email: session.user.email!,
                        first_name: ownerProfile.first_name || '',
                        last_name: ownerProfile.last_name || '',
                        role: 'owner',
                        business_id: ownerProfile.business_id || ownerProfile.id || userId,
                        business_name: ownerProfile.business_name,
                        account_status: ownerProfile.account_status,
                    };
                    setUser(userData);
                    if (pathname === '/login' || pathname === '/') {
                        router.push('/dashboard');
                    }
                    return;
                }

                // 2. Try fetching Employee Profile
                const empProfile = await getEmployeeProfile(userId);
                if (empProfile) {
                    const userData: SessionUser = {
                        id: userId,
                        email: session.user.email!,
                        first_name: empProfile.first_name || '',
                        last_name: empProfile.last_name || '',
                        role: 'employee',
                        business_id: empProfile.business_id,
                        business_name: empProfile.business_name,
                        outlet_id: empProfile.outlet_id,
                        outlet_name: empProfile.outlet_name,
                        profile_pic: empProfile.profile_pic,
                    };
                    setUser(userData);
                    if (pathname === '/login' || pathname === '/') {
                        // Default employee redirect to Schedules per previous suggestion
                        // User can clarify if a different module is preferred
                        router.push('/dashboard/schedules');
                    }
                    return;
                }
            } else if (event === 'SIGNED_OUT') {
                clearSession();
                if (pathname.startsWith('/dashboard')) {
                    router.push('/login');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase, setUser, clearSession, router, pathname]);

    return <>{children}</>;
}
