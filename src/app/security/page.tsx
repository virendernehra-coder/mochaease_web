import React from 'react';
import SecurityClient from './SecurityClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security & Compliance | MochaEase Vault',
    description: 'Bank-grade security protocols, PCI-DSS compliance, and enterprise-level reliability for global commerce.',
};

export default function SecurityPage() {
    return <SecurityClient />;
}
