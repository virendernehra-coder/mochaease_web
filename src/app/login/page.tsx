import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
    title: 'Login | MochaEase',
    description: 'Sign in to your MochaEase dashboard.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function LoginPage() {
    return <LoginClient />;
}
