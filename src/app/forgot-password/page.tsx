import { Metadata } from 'next';
import ForgotClient from './ForgotClient';

export const metadata: Metadata = {
    title: 'Reset Password | MochaEase',
    description: 'Recover your MochaEase account access.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function ForgotPasswordPage() {
    return <ForgotClient />;
}
