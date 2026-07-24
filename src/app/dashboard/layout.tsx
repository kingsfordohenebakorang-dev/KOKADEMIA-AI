"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, BrainCircuit, FileText, Database, BarChart3,
    CreditCard, Settings, LogOut, Search, Bell, Sparkles, User
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "AI Tutor", href: "/dashboard/tutor", icon: BrainCircuit },
    { label: "Mock Exams", href: "/dashboard/exams", icon: FileText },
    { label: "Course Vault", href: "/dashboard/questions", icon: Database },
    { label: "Performance", href: "/dashboard/performance", icon: BarChart3 },
    { label: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const plan = "Semester Pro Tier";
    const queriesUsed = 87;
    const queriesTotal = 150;

    return (
        <div className="h-screen flex bg-[#FAFAFC] text-slate-800 font-sans overflow-hidden">
            {/* ─── Left Sidebar (Owlearn Style) ─── */}
            <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white">
                {/* Logo */}
                <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-indigo-200">
                        K
                    </div>
                    <div>
                        <span className="font-extrabold text-lg text-slate-900 tracking-tight block">Kokademia</span>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">AI Learning</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                        : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60"
                                }`}
                            >
                                <item.icon className="w-4 h-4 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Plan & Usage */}
                <div className="p-4 m-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> {plan}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">PRO</span>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                            <span>Queries</span>
                            <span className="text-slate-900 font-bold">{queriesUsed}/{queriesTotal}</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(queriesUsed / queriesTotal) * 100}%` }} />
                        </div>
                    </div>

                    <Link href="/" className="flex items-center justify-center gap-2 pt-1 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors">
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </Link>
                </div>
            </aside>

            {/* ─── Main Content Area ─── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200/60 w-80">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search courses, exams, formulas..."
                            className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center relative transition-colors">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full" />
                        </button>
                        <div className="h-6 w-px bg-slate-200" />
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                                KO
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-xs font-bold text-slate-900">Kingsford Oheneba</div>
                                <div className="text-[10px] font-medium text-slate-500">Actuarial Science Major</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
