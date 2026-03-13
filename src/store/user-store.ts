'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

// The key used for AES encryption. 
// In a production environment, this should be an environment variable.
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'mochaease-secure-vault-2026';

export type UserRole = 'owner' | 'employee' | 'admin' | null;

export interface SessionUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    business_id?: string;
    business_name?: string;
    outlet_id?: string;
    outlet_name?: string;
    profile_pic?: string;
    // Add other fields as needed from the schemas
    account_status?: string;
    phone_number?: string;
}

export interface BusinessConfig {
    currency: string;
    monthly_revenue_goal: number;
}

interface UserState {
    user: SessionUser | null;
    isAuthenticated: boolean;
    lastChecked: number | null;
    businessConfig: BusinessConfig;
    setUser: (user: SessionUser | null) => void;
    setBusinessConfig: (config: Partial<BusinessConfig>) => void;
    clearSession: () => void;
}

// Custom Encrypted Storage Wrapper
const encryptedStorage = {
    getItem: (name: string): string | null => {
        const encryptedValue = sessionStorage.getItem(name);
        if (!encryptedValue) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('Failed to decrypt session state:', error);
            return null;
        }
    },
    setItem: (name: string, value: string): void => {
        const encryptedValue = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
        sessionStorage.setItem(name, encryptedValue);
    },
    removeItem: (name: string): void => {
        sessionStorage.removeItem(name);
    },
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            lastChecked: null,
            businessConfig: {
                currency: 'USD',
                monthly_revenue_goal: 0
            },
            setUser: (user) => set({ 
                user, 
                isAuthenticated: !!user, 
                lastChecked: Date.now() 
            }),
            setBusinessConfig: (config) => set((state) => ({
                businessConfig: { ...state.businessConfig, ...config }
            })),
            clearSession: () => set({ 
                user: null, 
                isAuthenticated: false, 
                lastChecked: null,
                businessConfig: {
                    currency: 'USD',
                    monthly_revenue_goal: 0
                }
            }),
        }),
        {
            name: 'me-session-vault',
            storage: createJSONStorage(() => encryptedStorage),
        }
    )
);
