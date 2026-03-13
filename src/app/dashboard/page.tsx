"use client";
import React from "react";
import Link from "next/link";
import {
    BarChart3, Clock, Target, BookOpen, FileText,
    BrainCircuit, AlertCircle, ChevronRight, Zap, ShieldCheck, Database, Cpu
} from "lucide-react";

// ─── Mock Data ───
const performanceMetrics = {
    score: 74.2,
    percentile: 82,
    studyHours: 32.5,
    problemsSolved: 187,
    avgAccuracy: 78.4,
    confidenceInterval: "±2.1%"
};

const topicMastery = [
    { topic: "Time Value of Money", mastery: 92.4, discipline: "ACTUARIAL" },
    { topic: "Integration", mastery: 85.1, discipline: "MATH" },
    { topic: "Probability Distributions", mastery: 81.0, discipline: "STATS" },
    { topic: "Annuities", mastery: 76.8, discipline: "ACTUARIAL" },
    { topic: "Linear Algebra", mastery: 68.5, discipline: "MATH" },
    { topic: "Survival Models", mastery: 62.3, discipline: "ACTUARIAL" },
    { topic: "Differential Equations", mastery: 54.9, discipline: "MATH" },
    { topic: "Ruin Probability", mastery: 41.2, discipline: "ACTUARIAL" },
];

const recentActivity = [
    { query: "Variance of whole life annuity-due", type: "COMPUTATION", time: "10m ago", verified: true },
    { query: "Eigenvalues of symmetric matrix", type: "COMPUTATION", time: "1h ago", verified: true },
    { query: "What is the force of mortality?", type: "CONCEPTUAL", time: "3h ago", verified: false },
    { query: "∫₀^∞ x²e^(-x) dx", type: "COMPUTATION", time: "5h ago", verified: true },
    { query: "Prove convergence of p-series", type: "PROOF", time: "1d ago", verified: false },
];

const upcomingExams = [
    { name: "Probability Mock (SOA P)", date: "2026-03-02", questions: 30, duration: "180m" },
    { name: "Financial Maths Midterm", date: "2026-03-08", questions: 25, duration: "150m" },
];

const usageStats = {
    queriesUsed: 87,
    queriesTotal: 150,
    docsUploaded: 23,
    docsTotal: 50,
    examsGenerated: 2,
    examsTotal: 5,
};

export default function DashboardPage() {
    return (
        <div className="h-full overflow-y-auto bg-[#050914] text-slate-300">
            <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-6">

                {/* Header & System Indicators */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b mx-1 border-slate-800/80 pb-4 gap-4">
                    <div>
                        <h1 className="text-2xl font-serif tracking-tight text-slate-100">Analytics Console</h1>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1.5">Actuarial Research Platform</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Trust Layer v1.2 Active</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5 text-slate-600" />
                            <span>Symbolic Engine Verified</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-slate-600" />
                            <span>Computation Audit Enabled</span>
                        </div>
                    </div>
                </div>

                {/* Top Statistics Matrix */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-sm overflow-hidden bg-opacity-50">
                    <div className="bg-[#090b14] p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Overall Index</span>
                            <Target className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-serif text-slate-100">{performanceMetrics.score.toFixed(1)}</div>
                            <div className="text-[10px] text-[#c9a05b] font-mono mt-1">PERCENTILE: {performanceMetrics.percentile}th</div>
                        </div>
                    </div>

                    <div className="bg-[#090b14] p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Accuracy Variance</span>
                            <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-serif text-slate-100">{performanceMetrics.avgAccuracy}%</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">CI: {performanceMetrics.confidenceInterval}</div>
                        </div>
                    </div>

                    <div className="bg-[#090b14] p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Time Invested</span>
                            <Clock className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-serif text-slate-100">{performanceMetrics.studyHours}h</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">ACTIVE SESSIONS</div>
                        </div>
                    </div>

                    <div className="bg-[#090b14] p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Problem Volume</span>
                            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-serif text-slate-100">{performanceMetrics.problemsSolved}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">SYSTEM ITERATIONS</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2">

                    {/* Mastery Matrix (Replacing Topic Mastery) */}
                    <div className="border border-slate-800/80 bg-[#090b14] rounded-sm flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between bg-[#0b0e1a]">
                            <h3 className="text-[11px] font-serif tracking-wide text-slate-300">MASTERY MATRIX</h3>
                            <span className="text-[9px] font-mono text-slate-500">Sorted by index asc</span>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800/50">
                                        <th className="px-5 py-2 text-[9px] font-mono text-slate-500 font-normal">CLASSIFICATION</th>
                                        <th className="px-5 py-2 text-[9px] font-mono text-slate-500 font-normal">TOPIC IDENTIFIER</th>
                                        <th className="px-5 py-2 text-[9px] font-mono text-slate-500 font-normal text-right">INDEX</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...topicMastery].sort((a, b) => a.mastery - b.mastery).map((t, i) => (
                                        <tr key={i} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/10 transition-colors">
                                            <td className="px-5 py-2.5">
                                                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm border ${t.discipline === "ACTUARIAL" ? "text-indigo-400 border-indigo-900/50 bg-indigo-950/20" :
                                                        t.discipline === "MATH" ? "text-cyan-400 border-cyan-900/50 bg-cyan-950/20" :
                                                            "text-emerald-400 border-emerald-900/50 bg-emerald-950/20"
                                                    }`}>{t.discipline}</span>
                                            </td>
                                            <td className="px-5 py-2.5 text-[12px] text-slate-300 font-serif">{t.topic}</td>
                                            <td className="px-5 py-2.5 text-[11px] font-mono text-right font-medium">
                                                <span className={t.mastery >= 80 ? "text-slate-300" : t.mastery >= 60 ? "text-[#c9a05b]" : "text-red-900"}>
                                                    {t.mastery.toFixed(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Computation Ledger (Replacing Recent Activity) */}
                    <div className="border border-slate-800/80 bg-[#090b14] rounded-sm flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between bg-[#0b0e1a]">
                            <h3 className="text-[11px] font-serif tracking-wide text-slate-300">COMPUTATION LEDGER</h3>
                            <Link href="/dashboard/tutor" className="text-[9px] font-mono text-slate-500 hover:text-slate-300 font-medium tracking-wide">EXPLORE LOGS →</Link>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800/50">
                                        <th className="px-5 py-2 text-[9px] font-mono text-slate-500 font-normal">TIMESTAMP</th>
                                        <th className="px-5 py-2 text-[9px] font-mono text-slate-500 font-normal">VERIFICATION</th>
                                        <th className="px-5 py-2 text-[9px] font-mono text-slate-500 font-normal">OPERATION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivity.map((a, i) => (
                                        <tr key={i} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/10 transition-colors">
                                            <td className="px-5 py-2.5 text-[10px] font-mono text-slate-500 whitespace-nowrap">{a.time}</td>
                                            <td className="px-5 py-2.5">
                                                {a.verified ? (
                                                    <span className="text-[9px] font-mono px-1.5 py-0.5 border border-emerald-900/50 text-emerald-500 bg-emerald-950/10 rounded-sm">VERIFIED</span>
                                                ) : (
                                                    <span className="text-[9px] font-mono px-1.5 py-0.5 border border-slate-700 text-slate-500 bg-slate-900/50 rounded-sm">PENDING</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-2.5">
                                                <div className="text-[12px] font-serif text-slate-300 truncate max-w-[200px]">{a.query}</div>
                                                <div className="text-[9px] font-mono text-slate-600 mt-0.5">{a.type}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Upcoming Evaluations & Resource Consumption */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2">

                    {/* Scheduled Evaluations */}
                    <div className="border border-slate-800/80 bg-[#090b14] rounded-sm flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-800/80 bg-[#0b0e1a]">
                            <h3 className="text-[11px] font-serif tracking-wide text-slate-300">SCHEDULED EVALUATIONS</h3>
                        </div>
                        <div className="p-0 divide-y divide-slate-800/30 flex-1">
                            {upcomingExams.map((e, i) => (
                                <Link key={i} href="/dashboard/exams" className="flex items-center justify-between p-4 hover:bg-slate-800/10 transition-colors group">
                                    <div>
                                        <div className="text-[13px] text-slate-200 font-serif group-hover:text-white transition-colors">{e.name}</div>
                                        <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-slate-500">
                                            <span>Q-COUNT: {e.questions}</span>
                                            <span className="w-px h-2.5 bg-slate-700"></span>
                                            <span>DURATION: {e.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-[10px] font-mono text-slate-400">DATE</div>
                                            <div className="text-[11px] font-mono text-slate-300">{e.date}</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-500 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resource Consumption */}
                    <div className="border border-slate-800/80 bg-[#090b14] rounded-sm flex flex-col">
                        <div className="px-5 py-3 border-b border-slate-800/80 bg-[#0b0e1a]">
                            <h3 className="text-[11px] font-serif tracking-wide text-slate-300">RESOURCE ALLOCATION</h3>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-center gap-5">
                            {[
                                { label: "COMPUTATION QUERIES", used: usageStats.queriesUsed, total: usageStats.queriesTotal },
                                { label: "DOCUMENT PARSING", used: usageStats.docsUploaded, total: usageStats.docsTotal },
                                { label: "EXAM GENERATION", used: usageStats.examsGenerated, total: usageStats.examsTotal },
                            ].map((s, i) => (
                                <div key={i}>
                                    <div className="flex items-end justify-between mb-1.5">
                                        <span className="text-[10px] font-mono text-slate-500">{s.label}</span>
                                        <span className="text-[11px] font-mono text-slate-300">{s.used} <span className="text-slate-600">/ {s.total}</span></span>
                                    </div>
                                    <div className="h-[2px] w-full bg-slate-900 overflow-hidden">
                                        <div className="h-full bg-slate-500" style={{ width: `${(s.used / s.total) * 100}%` }} />
                                    </div>
                                </div>
                            ))}

                            {usageStats.queriesUsed / usageStats.queriesTotal > 0.5 && (
                                <div className="mt-2 flex items-start gap-3 p-3 border border-[#3b311e] bg-[#1a1711] rounded-sm">
                                    <AlertCircle className="w-3.5 h-3.5 text-[#c9a05b] mt-0.5 flex-shrink-0" />
                                    <span className="text-[10px] font-mono text-[#c9a05b]/80 leading-relaxed uppercase tracking-wide">
                                        System Alert: Query allocation at {Math.round((usageStats.queriesUsed / usageStats.queriesTotal) * 100)}%. Extended allocation available via configuration protocol.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
