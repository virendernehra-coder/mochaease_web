'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mochaease.com',
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: item.href ? `https://mochaease.com${item.href}` : undefined,
            })),
        ],
    };

    return (
        <div className={`w-full ${className}`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em]">
                    <li className="flex items-center">
                        <Link 
                            href="/" 
                            className="text-white/30 hover:text-[#C3EB7A] transition-all flex items-center gap-1.5 group"
                        >
                            <Home className="w-3 h-3 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                    </li>
                    
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-2.5 h-2.5 text-white/10" />
                            {item.href && index !== items.length - 1 ? (
                                <Link 
                                    href={item.href} 
                                    className="text-white/30 hover:text-[#C3EB7A] transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-[#C3EB7A]/80 tracking-widest">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}
