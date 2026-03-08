import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Retail POS & Boutique Management System | MochaEase',
    description: 'Elevate your retail business with MochaEase. Features omnichannel inventory sync, barcode scanning, loyalty programs, and a beautiful hardware experience.',
    keywords: ['retail POS', 'boutique inventory management', 'apparel POS system', 'omnichannel retail software', 'clothing store POS'],
};

export default function FashionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
