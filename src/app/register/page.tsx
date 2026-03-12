import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
    title: 'Register | MochaEase',
    description: 'Create your MochaEase account.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function RegisterPage() {
    return <RegisterClient />;
}
