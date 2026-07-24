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
                { label: "Academic Coverage", href: "#features" },
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
        <footer className="bg-slate-900 text-white pt-20 pb-12 px-6 lg:px-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
                    {/* Brand Info & Newsletter */}
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/30">
                                K
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Kokademia
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            The AI-powered learning platform built exclusively for Actuarial Science and Mathematical Sciences students.
                        </p>

                        <div className="pt-2">
                            <span className="text-xs font-bold text-slate-300 block mb-2">Subscribe to Study Guides &amp; Exam Updates</span>
                            <div className="flex items-center gap-2 max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition-colors shrink-0">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Columns */}
                    {columns.map((column) => (
                        <div key={column.title} className="space-y-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                                {column.title}
                            </h4>
                            <ul className="space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors font-medium">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 font-medium">
                        © 2026 Kokademia. All calculations verified live with SymPy Symbolic Engine.
                    </span>
                    <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
                        <span>SOA / IFoA Exam Aligned</span>
                        <span>•</span>
                        <span>100% Computational Verification</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
