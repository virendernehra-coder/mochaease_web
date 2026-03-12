'use client';

import { create } from 'zustand';
import { startOfMonth, endOfMonth, subDays, startOfWeek, subMonths, endOfWeek } from 'date-fns';

export const presets = [
    { label: 'Today', getValue: () => ({ from: new Date(), to: new Date() }) },
    { label: 'Yesterday', getValue: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
    { label: 'This Week', getValue: () => ({ from: startOfWeek(new Date()), to: new Date() }) },
    { label: 'Last Week', getValue: () => {
        const start = startOfWeek(subDays(new Date(), 7));
        return { from: start, to: endOfWeek(start) };
    }},
    { label: 'This Month', getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
    { label: 'Last Month', getValue: () => {
        const start = startOfMonth(subMonths(new Date(), 1));
        return { from: start, to: endOfMonth(start) };
    }},
];

interface DateRange {
    from: Date;
    to: Date;
}

interface FilterState {
    selectedRange: DateRange;
    activePreset: string;
    setDateRange: (range: DateRange, preset: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    selectedRange: presets[4].getValue(), // Default to This Month
    activePreset: 'This Month',
    setDateRange: (range, preset) => set({ selectedRange: range, activePreset: preset }),
}));
