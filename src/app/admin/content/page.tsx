"use client";
import React, { useState } from "react";
import { BookOpen, Plus, Tag, BarChart3, FileText, Settings, Search, ChevronRight, ShieldCheck } from "lucide-react";

const questions = [
    { id: 1, title: "Present Value of Annuity-Due (10-year)", subject: "Financial Mathematics", discipline: "Actuarial", difficulty: "Medium", uses: 234, accuracy: "87%", status: "Published" },
    { id: 2, title: "Eigenvalue Decomposition of 3x3 Matrix", subject: "Linear Algebra", discipline: "Mathematics", difficulty: "Hard", uses: 156, accuracy: "72%", status: "Published" },
    { id: 3, title: "Survival Function Derivation", subject: "Survival Models", discipline: "Actuarial", difficulty: "Hard", uses: 189, accuracy: "68%", status: "Published" },
    { id: 4, title: "Integration by Parts (Definite)", subject: "Calculus", discipline: "Mathematics", difficulty: "Easy", uses: 412, accuracy: "91%", status: "Published" },
    { id: 5, title: "Hypothesis Testing (Two-Tailed)", subject: "Statistics", discipline: "Statistics", difficulty: "Medium", uses: 278, accuracy: "79%", status: "Draft" },
    { id: 6, title: "Ruin Probability (Cramér-Lundberg)", subject: "Risk Theory", discipline: "Actuarial", difficulty: "Hard", uses: 98, accuracy: "54%", status: "Published" },
    { id: 7, title: "Laplace Transform of ODE", subject: "Differential Equations", discipline: "Mathematics", difficulty: "Hard", uses: 134, accuracy: "66%", status: "Published" },
    { id: 8, title: "Compound Poisson Distribution", subject: "Loss Models", discipline: "Actuarial", difficulty: "Medium", uses: 167, accuracy: "75%", status: "Published" },
];

const examTemplates = [
    { name: "Probability Mock Exam (SOA P)", questions: 30, duration: "3 hours", lastUsed: "2d ago", attempts: 145 },
    { name: "Financial Maths Final", questions: 25, duration: "2.5 hours", lastUsed: "1w ago", attempts: 89 },
    { name: "Linear Algebra Midterm", questions: 20, duration: "2 hours", lastUsed: "3d ago", attempts: 67 },
    { name: "Calculus II Comprehensive", questions: 35, duration: "3 hours", lastUsed: "5d ago", attempts: 112 },
];

const trustLogs = [
    { query: "∫ x²e^x dx", method: "Integration by Parts", confidence: 98, sympy: "✓ Verified", time: "0.3s", source: "Calculus Ch.7" },
    { query: "ä_{10|} at i=5%", method: "Annuity Formula", confidence: 99, sympy: "✓ Verified", time: "0.2s", source: "Bowers Ch.4" },
    { query: "eigenvalues of [[2,1],[1,3]]", method: "Characteristic Poly", confidence: 97, sympy: "✓ Verified", time: "0.4s", source: "Strang Ch.6" },
    { query: "Prove √2 is irrational", method: "Proof by Contradiction", confidence: 72, sympy: "⚠ No numeric verify", time: "1.2s", source: "Analysis Ch.1" },
];

export default function ContentPage() {
    const [tab, setTab] = useState<"questions" | "exams" | "trust">("questions");
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Content & Academic Control</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage question bank, mock exams, and Trust Layer configuration.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm text-white font-medium transition-all">
                    <Plus className="w-4 h-4" /> Add Question
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
                {(["questions", "exams", "trust"] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${tab === t ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {t === "questions" && <><BookOpen className="w-3.5 h-3.5" /> Question Bank</>}
                        {t === "exams" && <><FileText className="w-3.5 h-3.5" /> Mock Exams</>}
                        {t === "trust" && <><ShieldCheck className="w-3.5 h-3.5" /> Trust Layer Logs</>}
                    </button>
                ))}
            </div>

            {tab === "questions" && (
                <>
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                        <th className="text-left px-5 py-3">Question</th>
                                        <th className="text-left px-3 py-3">Subject</th>
                                        <th className="text-left px-3 py-3">Discipline</th>
                                        <th className="text-center px-3 py-3">Difficulty</th>
                                        <th className="text-right px-3 py-3">Uses</th>
                                        <th className="text-right px-3 py-3">Accuracy</th>
                                        <th className="text-left px-3 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.filter(q => q.title.toLowerCase().includes(search.toLowerCase())).map(q => (
                                        <tr key={q.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                            <td className="px-5 py-3 text-sm font-medium text-white">{q.title}</td>
                                            <td className="px-3 py-3">
                                                <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">{q.subject}</span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className={`text-xs px-2 py-1 rounded-md font-medium ${q.discipline === "Actuarial" ? "bg-indigo-500/10 text-indigo-400" :
                                                        q.discipline === "Mathematics" ? "bg-cyan-500/10 text-cyan-400" :
                                                            "bg-purple-500/10 text-purple-400"
                                                    }`}>{q.discipline}</span>
                                            </td>
                                            <td className="text-center px-3 py-3">
                                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${q.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                                                        q.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                                                            "bg-red-500/10 text-red-400"
                                                    }`}>{q.difficulty}</span>
                                            </td>
                                            <td className="text-right px-3 py-3 text-sm text-gray-400 font-mono">{q.uses}</td>
                                            <td className="text-right px-3 py-3 text-sm font-mono">
                                                <span className={parseInt(q.accuracy) > 80 ? "text-green-400" : parseInt(q.accuracy) > 60 ? "text-yellow-400" : "text-red-400"}>
                                                    {q.accuracy}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className={`text-xs ${q.status === "Published" ? "text-green-400" : "text-gray-500"}`}>{q.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {tab === "exams" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {examTemplates.map((e, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-5 hover:bg-white/[0.07] transition-all cursor-pointer group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{e.name}</h3>
                                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                        <span>{e.questions} questions</span>
                                        <span>{e.duration}</span>
                                        <span>{e.attempts} attempts</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                            <div className="mt-3 text-xs text-gray-600">Last used: {e.lastUsed}</div>
                        </div>
                    ))}
                    <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-5 flex items-center justify-center cursor-pointer hover:bg-white/[0.07] transition-all group">
                        <div className="text-center">
                            <Plus className="w-8 h-8 text-gray-600 mx-auto mb-2 group-hover:text-indigo-400 transition-colors" />
                            <span className="text-sm text-gray-500 group-hover:text-white transition-colors">Create New Mock Exam</span>
                        </div>
                    </div>
                </div>
            )}

            {tab === "trust" && (
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-semibold text-white">Trust Layer — Recent Computations</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                    <th className="text-left px-5 py-3">Query</th>
                                    <th className="text-left px-3 py-3">Method</th>
                                    <th className="text-center px-3 py-3">Confidence</th>
                                    <th className="text-center px-3 py-3">SymPy</th>
                                    <th className="text-right px-3 py-3">Time</th>
                                    <th className="text-left px-3 py-3">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trustLogs.map((l, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-3 text-sm text-white font-mono">{l.query}</td>
                                        <td className="px-3 py-3 text-xs text-gray-400">{l.method}</td>
                                        <td className="text-center px-3 py-3">
                                            <span className={`text-xs font-mono font-bold ${l.confidence >= 90 ? "text-green-400" : l.confidence >= 75 ? "text-yellow-400" : "text-red-400"}`}>
                                                {l.confidence}%
                                            </span>
                                        </td>
                                        <td className="text-center px-3 py-3">
                                            <span className={`text-xs ${l.sympy.includes("✓") ? "text-green-400" : "text-yellow-400"}`}>{l.sympy}</span>
                                        </td>
                                        <td className="text-right px-3 py-3 text-xs text-gray-500 font-mono">{l.time}</td>
                                        <td className="px-3 py-3 text-xs text-gray-500">{l.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
