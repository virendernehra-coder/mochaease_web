import { Metadata } from 'next';
import DemoForm from './DemoForm';

export const metadata: Metadata = {
    title: 'Book a Demo - MochaEase',
    description: 'Book a free demo of MochaEase to see how we can streamline your business operations and stop profit leakage.',
};

export default function DemoPage() {
    return <DemoForm />;
}
