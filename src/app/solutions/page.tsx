import { Metadata } from 'next';
import SolutionsClient from './SolutionsClient';

export const metadata: Metadata = {
    title: 'MochaEase Solutions | Industry-Specific POS Systems',
    description: 'Explore MochaEase POS solutions tailored for cafes, retail, restaurants, and enterprise businesses. AI-powered specialty retail and hospitality tech.',
    openGraph: {
        title: 'MochaEase Solutions | Industry-Specific POS Systems',
        description: 'Explore MochaEase POS solutions tailored for cafes, retail, restaurants, and enterprise businesses.',
        type: 'website',
    }
};

export default function SolutionsHub() {
    return <SolutionsClient />;
}
