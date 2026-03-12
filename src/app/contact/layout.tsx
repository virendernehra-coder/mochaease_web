import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact MochaEase | Get in Touch with Our Team',
    description: 'Ready to upgrade your business operations? Contact MochaEase today for sales inquiries, technical support, or to schedule a personalized demo.',
    keywords: ['contact mochaease', 'mochaease support', 'point of sale sales', 'POS customer service'],
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
