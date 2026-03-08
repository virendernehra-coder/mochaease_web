import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best POS for Cafés & Coffee Shops | MochaEase',
    description: 'Transform your coffee shop operations with MochaEase. Zero-waste inventory, real-time espresso scaling, and lightning-fast POS software designed for modern cafes.',
    keywords: ['cafe POS', 'coffee shop management software', 'cafe inventory tracking', 'zero waste cafe system', 'barista POS'],
};

export default function CafeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
