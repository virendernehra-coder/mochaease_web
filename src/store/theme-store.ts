import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            primaryColor: '#A855F7', // Default MochaEase Purple
            setPrimaryColor: (color) => set({ primaryColor: color }),
        }),
        {
            name: 'mochaease-theme-storage',
        }
    )
);

export const THEME_COLORS = [
    { name: 'Mocha Purple', value: '#A855F7' },
    { name: 'Electric Blue', value: '#3B82F6' },
    { name: 'Emerald Green', value: '#10B981' },
    { name: 'Sunset Orange', value: '#F59E0B' },
    { name: 'Rose Pink', value: '#F43F5E' },
    { name: 'Cyan Neon', value: '#06B6D4' },
];
