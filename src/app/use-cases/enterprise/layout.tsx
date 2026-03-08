import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Enterprise Restaurant POS & Chain Management | MochaEase',
    description: 'Scale your operations globally with MochaEase Enterprise. Multi-location POS, central kitchen dispatch, consolidated franchise analytics, and robust API integrations.',
    keywords: ['enterprise restaurant POS', 'multi-location POS system', 'restaurant chain management', 'franchise POS software', 'central kitchen software'],
};

export default function EnterpriseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
