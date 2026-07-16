"use client"
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
    const columns = [
        {
            title: "Platform",
            links: [
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "Academic Coverage", href: "#coverage" },
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "Documentation", href: "#" },
                { label: "Tutorials", href: "#" },
                { label: "Blog", href: "#" },
                { label: "API Reference", href: "#" },
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "mailto:support@kokademia.com" },
                { label: "Press Kit", href: "#" },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Security Audit", href: "#" },
                { label: "GDPR Compliance", href: "#" },
            ]
        }
    ];

    return (
        <footer className="bg-ivory border-t border-border-subtle py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="text-[20px] font-bold tracking-[-0.02em] text-rich-black">
                                Koka
                                <span className="relative inline-block">
                                    d
                                    <span className="absolute -top-[2px] right-[1px] w-[5.5px] h-[5.5px] bg-gold rounded-[1.2px]" />
                                </span>
                                emia
                            </span>
                        </Link>
                        <p className="text-[13px] text-muted-text max-w-xs leading-relaxed">
                            The first Neuro-Symbolic AI learning platform built exclusively for Actuarial and Mathematical Sciences students.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-rich-black transition-colors" aria-label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a href="https://github.com/kingsfordohenebakorang-dev/KOKADEMIA-AI" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-rich-black transition-colors" aria-label="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                </svg>
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-rich-black transition-colors" aria-label="X (Twitter)">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Columns */}
                    {columns.map((column) => (
                        <div key={column.title} className="space-y-4">
                            <h4 className="text-[12px] font-bold uppercase tracking-wider text-rich-black">
                                {column.title}
                            </h4>
                            <ul className="space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-[13px] text-muted-text hover:text-rich-black transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-muted-light">
                        © 2026 Kokademia. Built for serious actuarial and mathematics students.
                    </span>
                    <div className="flex items-center gap-6 text-[11px] text-muted-light">
                        <span>All calculations verified symbolically.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
