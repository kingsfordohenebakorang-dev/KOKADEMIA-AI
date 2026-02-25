"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, BrainCircuit, FileText, Database, BarChart3,
    CreditCard, Settings, ChevronDown, Shield, Zap, LogOut
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Tutor AI", href: "/dashboard/tutor", icon: BrainCircuit },
    { label: "Exams", href: "/dashboard/exams", icon: FileText },
    { label: "Question Bank", href: "/dashboard/questions", icon: Database },
    { label: "Performance", href: "/dashboard/performance", icon: BarChart3 },
    { label: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Mock user data
    const plan = "Analyst";
    const queriesUsed = 87;
    const queriesTotal = 150;
    const queryPct = Math.round((queriesUsed / queriesTotal) * 100);

    return (
        <div className="h-screen flex bg-[#08080c] text-white overflow-hidden">
            {/* ─── Left Sidebar ─── */}
            <aside className={`hidden lg:flex flex-col border-r border-white/[0.04] bg-[#0a0a10] transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}>
                {/* Logo */}
                <div className="h-14 flex items-center gap-2.5 px-4 border-b border-white/[0.04]">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                    {!collapsed && (
                        <span className="font-bold text-xs tracking-tight text-gray-200">KOK TRUST AI</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${isActive
                                        ? "bg-indigo-500/[0.08] text-indigo-400 border border-indigo-500/[0.12]"
                                        : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent"
                                    }`}
                            >
                                <item.icon className="w-4 h-4 flex-shrink-0" />
                                {!collapsed && item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Plan & Usage */}
                {!collapsed && (
                    <div className="px-3 py-3 border-t border-white/[0.04] space-y-3">
                        {/* Plan Badge */}
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">Plan</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${plan === "Semester Pro" ? "bg-indigo-500/10 text-indigo-400" :
                                    plan === "Analyst" ? "bg-blue-500/10 text-blue-400" :
                                        "bg-gray-500/10 text-gray-500"
                                }`}>{plan}</span>
                        </div>

                        {/* Usage Bar */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-gray-600">AI Queries</span>
                                <span className="text-[10px] text-gray-500 font-mono">{queriesUsed}/{queriesTotal}</span>
                            </div>
                            <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all ${queryPct > 85 ? "bg-red-500" : queryPct > 60 ? "bg-yellow-500" : "bg-indigo-500"}`}
                                    style={{ width: `${queryPct}%` }}
                                />
                            </div>
                        </div>

                        {/* Sign Out */}
                        <Link href="/" className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-gray-600 hover:text-red-400 hover:bg-red-500/5 transition-all">
                            <LogOut className="w-3 h-3" />
                            Sign Out
                        </Link>
                    </div>
                )}
            </aside>

            {/* ─── Main Content ─── */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
