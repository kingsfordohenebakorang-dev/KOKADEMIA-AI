"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, BrainCircuit, FileText, Database, BarChart3,
    CreditCard, Settings, Shield, LogOut, TerminalSquare
} from "lucide-react";

const navItems = [
    { label: "Analytic Console", href: "/dashboard", icon: LayoutDashboard },
    { label: "Tutor AI", href: "/dashboard/tutor", icon: BrainCircuit },
    { label: "Examination Config", href: "/dashboard/exams", icon: FileText },
    { label: "Corpus Database", href: "/dashboard/questions", icon: Database },
    { label: "Performance Matrix", href: "/dashboard/performance", icon: BarChart3 },
    { label: "License & Usage", href: "/dashboard/subscription", icon: CreditCard },
    { label: "System Parameters", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Mock user data
    const plan = "ACADEMIC RESEARCH TIER";
    const queriesUsed = 87;
    const queriesTotal = 150;
    const queryPct = Math.round((queriesUsed / queriesTotal) * 100);

    return (
        <div className="h-screen flex bg-[#050914] text-slate-300 font-sans overflow-hidden">
            {/* ─── Left Sidebar ─── */}
            <aside className={`hidden lg:flex flex-col border-r border-[#1e293b]/50 bg-[#020617] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
                {/* Logo */}
                <div className="h-16 flex items-center gap-3 px-5 border-b border-[#1e293b]/50">
                    <div className="w-6 h-6 border border-slate-600 bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <TerminalSquare className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                    {!collapsed && (
                        <span className="font-serif text-[15px] tracking-wide text-slate-200">KOK TRUST AI</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`flex items-center gap-3 px-3 py-2 rounded-sm text-[12px] transition-colors border ${isActive
                                    ? "bg-slate-800/60 text-slate-200 border-slate-700/50 shadow-sm"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border-transparent"
                                    }`}
                            >
                                <item.icon className="w-4 h-4 flex-shrink-0" />
                                {!collapsed && <span className={isActive ? "font-serif tracking-wide" : "font-serif tracking-wide text-slate-400 block"}>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Plan & Usage */}
                {!collapsed && (
                    <div className="px-4 py-4 border-t border-[#1e293b]/50 space-y-4">
                        {/* Plan Badge */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">Active License</span>
                            <span className="text-[10px] text-slate-300 border border-slate-700 bg-slate-900/50 px-2 py-1 inline-flex w-fit rounded-sm font-mono">{plan}</span>
                        </div>

                        {/* Usage Bar */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Query Allocation</span>
                                <span className="text-[10px] text-slate-400 font-mono">{queriesUsed}/{queriesTotal}</span>
                            </div>
                            <div className="h-[2px] bg-slate-800 w-full overflow-hidden">
                                <div
                                    className={`h-full transition-all ${queryPct > 85 ? "bg-[#8b4131]" : queryPct > 60 ? "bg-[#c9a05b]" : "bg-slate-500"}`}
                                    style={{ width: `${queryPct}%` }}
                                />
                            </div>
                        </div>

                        {/* Sign Out */}
                        <Link href="/" className="flex items-center gap-2 pt-2 text-[10px] uppercase font-mono tracking-widest text-slate-500 hover:text-slate-300 transition-colors">
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out Protocol
                        </Link>
                    </div>
                )}
            </aside>

            {/* ─── Main Content ─── */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[#050914]">
                {children}
            </main>
        </div>
    );
}
