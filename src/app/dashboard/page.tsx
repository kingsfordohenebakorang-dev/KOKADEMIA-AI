"use client";
import React from "react";
import Link from "next/link";
import {
    BarChart3, Clock, Target, BookOpen, FileText,
    BrainCircuit, AlertCircle, ChevronRight, Zap, ShieldCheck, Database, Cpu, Sparkles, Star, TrendingUp, CheckCircle, ArrowRight
} from "lucide-react";

export default function DashboardPage() {
    const stats = [
        { label: "Exam Readiness Score", value: "94.2%", change: "+4.5% this week", icon: Target, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "SymPy Verification Accuracy", value: "99.8%", change: "100% Deterministic", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Active Study Hours", value: "32.5 hrs", change: "12 sessions completed", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Verified Solutions Solved", value: "187 Problems", change: "+24 today", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    const activeCourses = [
        { title: "SOA Exam P — Probability & Survival Models", category: "Actuarial Science", progress: 85, lessons: "18/24 Lessons", color: "bg-indigo-600" },
        { title: "Financial Mathematics & TVM", category: "Actuarial Science", progress: 92, lessons: "16/18 Lessons", color: "bg-purple-600" },
        { title: "Multivariable Calculus", category: "Mathematical Sciences", progress: 74, lessons: "20/28 Lessons", color: "bg-emerald-600" },
        { title: "Linear Algebra & Matrix Theory", category: "Mathematical Sciences", progress: 60, lessons: "12/20 Lessons", color: "bg-amber-500" },
    ];

    const recentLogs = [
        { query: "Variance of whole life annuity-due (ä_x)", status: "Verified SymPy", time: "10m ago", accuracy: "100%" },
        { query: "Eigenvalue Decomposition of 3x3 Matrix", status: "Verified SymPy", time: "1h ago", accuracy: "100%" },
        { query: "Definite Integral ∫₀^∞ x²e^(-x) dx", status: "Verified SymPy", time: "5h ago", accuracy: "100%" },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="card-owlearn p-8 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Welcome back, Kingsford!
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight">Your SOA Exam P Readiness is up by 4.5%</h1>
                    <p className="text-sm text-indigo-100 mt-2 leading-relaxed font-medium">
                        You have completed 187 verified problems. Keep up your streak to reach top 5% actuarial performance.
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                        <Link href="/dashboard/tutor" className="px-6 py-2.5 bg-white text-indigo-700 hover:bg-slate-100 rounded-full text-xs font-bold transition-all shadow-md">
                            Ask AI Tutor
                        </Link>
                        <Link href="/dashboard/exams" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all border border-white/20">
                            Start Mock Exam
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stat Cards Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="card-owlearn p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                            <div className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Active Courses Progress Grid & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Courses */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Active Courses &amp; Modules</h2>
                            <p className="text-xs text-slate-500">Track your verified learning progress</p>
                        </div>
                        <Link href="/dashboard/questions" className="text-xs font-bold text-indigo-600 hover:underline">
                            View All →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {activeCourses.map((c) => (
                            <div key={c.title} className="card-owlearn p-6 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                                        {c.category}
                                    </span>
                                    <h3 className="text-base font-bold text-slate-900 mt-3 leading-snug">{c.title}</h3>
                                    <span className="text-xs text-slate-500 block mt-1 font-medium">{c.lessons}</span>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                                        <span>Progress</span>
                                        <span className="text-slate-900 font-bold">{c.progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div className={`h-full ${c.color}`} style={{ width: `${c.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Verification Logs */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">SymPy Computation Logs</h2>
                            <p className="text-xs text-slate-500">Recent verified calculations</p>
                        </div>
                    </div>

                    <div className="card-owlearn p-6 divide-y divide-slate-100">
                        {recentLogs.map((log, i) => (
                            <div key={i} className="py-3.5 first:pt-0 last:pb-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{log.query}</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                        ✓ {log.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-slate-500">
                                    <span>{log.time}</span>
                                    <span className="font-semibold text-slate-700">Accuracy: {log.accuracy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
