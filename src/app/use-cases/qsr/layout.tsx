import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'High-Volume QSR & Fast Casual POS System | MochaEase',
    description: 'Scale your fast-casual chain with MochaEase. Cut queues with self-order kiosks, manage kitchen display systems (KDS), and analyze multi-store performance.',
    keywords: ['QSR POS system', 'fast casual restaurant software', 'kitchen display system KDS', 'self-order kiosks QSR', 'restaurant chain management'],
};

export default function QsrLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
