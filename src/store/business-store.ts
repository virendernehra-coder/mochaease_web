'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'mochaease-business-vault-2026';

export interface BusinessOutlet {
    id: number;
    outlet_id: string;
    outlet_name: string;
    outlet_address: string;
    outlet_phone: number;
    business_id: string;
}

interface BusinessState {
    outlets: BusinessOutlet[];
    activeContextId: string;
    activeContextName: string;
    activeContextType: string;
    setOutlets: (outlets: BusinessOutlet[]) => void;
    setActiveContext: (id: string, name: string, type: string) => void;
    clearBusinessData: () => void;
}

const encryptedStorage = {
    getItem: (name: string): string | null => {
        const encryptedValue = sessionStorage.getItem(name);
        if (!encryptedValue) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('Failed to decrypt business state:', error);
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

export const useBusinessStore = create<BusinessState>()(
    persist(
        (set) => ({
            outlets: [],
            activeContextId: 'business',
            activeContextName: 'Global Business',
            activeContextType: 'Level 1',
            setOutlets: (outlets) => set({ outlets }),
            setActiveContext: (id, name, type) => set({ 
                activeContextId: id, 
                activeContextName: name, 
                activeContextType: type 
            }),
            clearBusinessData: () => set({ 
                outlets: [], 
                activeContextId: 'business',
                activeContextName: 'Global Business',
                activeContextType: 'Level 1'
            }),
        }),
        {
            name: 'me-business-vault',
            storage: createJSONStorage(() => encryptedStorage),
        }
    )
);
