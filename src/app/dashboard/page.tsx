"use client";
import React from "react";
import Link from "next/link";
import {
    BarChart3, TrendingUp, Clock, Target, BookOpen, FileText,
    BrainCircuit, AlertCircle, ChevronRight, Zap
} from "lucide-react";

// ─── Mock Data ───
const performanceScore = 74;
const studyHours = 32.5;
const problemsSolved = 187;
const avgAccuracy = 78;

const topicMastery = [
    { topic: "Time Value of Money", mastery: 92, discipline: "Actuarial" },
    { topic: "Integration", mastery: 85, discipline: "Mathematics" },
    { topic: "Probability Distributions", mastery: 81, discipline: "Statistics" },
    { topic: "Annuities", mastery: 76, discipline: "Actuarial" },
    { topic: "Linear Algebra", mastery: 68, discipline: "Mathematics" },
    { topic: "Survival Models", mastery: 62, discipline: "Actuarial" },
    { topic: "Differential Equations", mastery: 54, discipline: "Mathematics" },
    { topic: "Ruin Probability", mastery: 41, discipline: "Actuarial" },
];

const recentActivity = [
    { query: "Variance of whole life annuity-due", type: "Computation", time: "10m ago", verified: true },
    { query: "Eigenvalues of symmetric matrix", type: "Computation", time: "1h ago", verified: true },
    { query: "What is the force of mortality?", type: "Conceptual", time: "3h ago", verified: false },
    { query: "∫₀^∞ x²e^(-x) dx", type: "Computation", time: "5h ago", verified: true },
    { query: "Prove convergence of p-series", type: "Proof", time: "1d ago", verified: false },
];

const upcomingExams = [
    { name: "Probability Mock (SOA P)", date: "Mar 2, 2026", questions: 30, duration: "3h" },
    { name: "Financial Maths Midterm", date: "Mar 8, 2026", questions: 25, duration: "2.5h" },
];

const usageStats = {
    queriesUsed: 87,
    queriesTotal: 150,
    docsUploaded: 23,
    docsTotal: 50,
    examsGenerated: 2,
    examsTotal: 5,
    verifiedSolutions: 3,
};

export default function DashboardPage() {
    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-200">Dashboard</h1>
                        <p className="text-xs text-gray-600 mt-0.5 font-mono">Academic Performance Center</p>
                    </div>
                    <Link href="/dashboard/tutor" className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 text-indigo-400 rounded-lg text-xs font-medium border border-indigo-500/20 hover:bg-indigo-600/30 transition-all">
                        <BrainCircuit className="w-3 h-3" /> Open Tutor
                    </Link>
                </div>

                {/* Performance Score + Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Main Score */}
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5 flex flex-col items-center justify-center">
                        <div className="relative w-20 h-20 mb-2">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2.5" />
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#6366f1" strokeWidth="2.5"
                                    strokeDasharray={`${performanceScore} ${100 - performanceScore}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-white">{performanceScore}</span>
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Performance</span>
                    </div>

                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-4">
                        <Clock className="w-4 h-4 text-blue-400/60 mb-2" />
                        <div className="text-xl font-bold text-gray-200">{studyHours}h</div>
                        <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">Study Hours</div>
                    </div>
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-4">
                        <Target className="w-4 h-4 text-emerald-400/60 mb-2" />
                        <div className="text-xl font-bold text-gray-200">{problemsSolved}</div>
                        <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">Problems Solved</div>
                    </div>
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-4">
                        <BarChart3 className="w-4 h-4 text-purple-400/60 mb-2" />
                        <div className="text-xl font-bold text-gray-200">{avgAccuracy}%</div>
                        <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">Avg Accuracy</div>
                    </div>
                </div>

                {/* Two Column: Topic Mastery + Activity */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Topic Mastery */}
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Topic Mastery</h3>
                            <span className="text-[10px] text-gray-600">Weakest first ↑</span>
                        </div>
                        <div className="space-y-3">
                            {[...topicMastery].sort((a, b) => a.mastery - b.mastery).map((t, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] text-gray-300">{t.topic}</span>
                                            <span className={`text-[9px] px-1 py-0.5 rounded font-medium ${t.discipline === "Actuarial" ? "bg-indigo-500/8 text-indigo-500" :
                                                    t.discipline === "Mathematics" ? "bg-cyan-500/8 text-cyan-500" :
                                                        "bg-purple-500/8 text-purple-500"
                                                }`}>{t.discipline.slice(0, 4)}</span>
                                        </div>
                                        <span className={`text-[11px] font-mono font-medium ${t.mastery >= 80 ? "text-emerald-400" : t.mastery >= 60 ? "text-yellow-400" : "text-red-400"
                                            }`}>{t.mastery}%</span>
                                    </div>
                                    <div className="h-1 bg-white/[0.03] rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all ${t.mastery >= 80 ? "bg-emerald-500/50" : t.mastery >= 60 ? "bg-yellow-500/50" : "bg-red-500/50"
                                            }`} style={{ width: `${t.mastery}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Activity</h3>
                            <Link href="/dashboard/tutor" className="text-[10px] text-indigo-500 hover:text-indigo-400">View all →</Link>
                        </div>
                        <div className="space-y-2">
                            {recentActivity.map((a, i) => (
                                <div key={i} className="flex items-start gap-3 py-2 border-b border-white/[0.02] last:border-0">
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.verified ? "bg-emerald-500" : "bg-gray-600"}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[11px] text-gray-300 truncate">{a.query}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] text-gray-600">{a.type}</span>
                                            <span className="text-[9px] text-gray-700">•</span>
                                            <span className="text-[9px] text-gray-600">{a.time}</span>
                                            {a.verified && <span className="text-[9px] text-emerald-600">✓ Verified</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Exams + Usage */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Upcoming Exams */}
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Upcoming Mock Exams</h3>
                        <div className="space-y-2">
                            {upcomingExams.map((e, i) => (
                                <Link key={i} href="/dashboard/exams" className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white/[0.02] transition-colors group border border-transparent hover:border-white/[0.04]">
                                    <div>
                                        <div className="text-[12px] text-gray-300 font-medium group-hover:text-white transition-colors">{e.name}</div>
                                        <div className="text-[10px] text-gray-600 mt-0.5">{e.questions} questions • {e.duration}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-600 font-mono">{e.date}</span>
                                        <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-gray-400 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* AI Usage Statistics */}
                    <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">AI Usage This Month</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Queries", used: usageStats.queriesUsed, total: usageStats.queriesTotal, icon: Zap },
                                { label: "Documents", used: usageStats.docsUploaded, total: usageStats.docsTotal, icon: FileText },
                                { label: "Exams Generated", used: usageStats.examsGenerated, total: usageStats.examsTotal, icon: BookOpen },
                            ].map((s, i) => {
                                const pct = Math.round((s.used / s.total) * 100);
                                return (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
                                                <s.icon className="w-3 h-3 text-gray-600" /> {s.label}
                                            </span>
                                            <span className="text-[11px] text-gray-500 font-mono">{s.used} / {s.total}</span>
                                        </div>
                                        <div className="h-1 bg-white/[0.03] rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${pct > 85 ? "bg-red-500/60" : pct > 60 ? "bg-yellow-500/40" : "bg-indigo-500/40"}`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {usageStats.queriesUsed / usageStats.queriesTotal > 0.5 && (
                            <div className="mt-4 flex items-start gap-2 p-2.5 rounded-lg bg-yellow-500/[0.04] border border-yellow-500/10">
                                <AlertCircle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-[10px] text-yellow-500/80 leading-relaxed">
                                    You have used {Math.round((usageStats.queriesUsed / usageStats.queriesTotal) * 100)}% of your monthly queries.
                                    Consider upgrading or purchasing a Query Boost.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
