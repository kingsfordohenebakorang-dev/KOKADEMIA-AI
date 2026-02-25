"use client";
import React from "react";
import { BarChart3, TrendingDown, Clock, Award, BookOpen, Target } from "lucide-react";

const difficultTopics = [
    { topic: "Ruin Probability (Cramér-Lundberg)", discipline: "Actuarial", failRate: 46, attempts: 312 },
    { topic: "Laplace Transform of PDE", discipline: "Mathematics", failRate: 38, attempts: 267 },
    { topic: "Survival Function (Force of Mortality)", discipline: "Actuarial", failRate: 32, attempts: 445 },
    { topic: "Real Analysis Proofs (ε-δ)", discipline: "Mathematics", failRate: 30, attempts: 198 },
    { topic: "Compound Poisson Distribution", discipline: "Actuarial", failRate: 25, attempts: 356 },
    { topic: "Eigenvalue Decomposition (3x3+)", discipline: "Mathematics", failRate: 22, attempts: 289 },
    { topic: "Bayesian Estimation", discipline: "Statistics", failRate: 20, attempts: 234 },
    { topic: "Multivariable Integration", discipline: "Mathematics", failRate: 18, attempts: 412 },
];

const queryTypes = [
    { type: "Integration / Calculus", count: 3420, pct: 23 },
    { type: "Annuities & Life Contingencies", count: 2890, pct: 19 },
    { type: "Linear Algebra", count: 2340, pct: 16 },
    { type: "Probability & Statistics", count: 2100, pct: 14 },
    { type: "Differential Equations", count: 1560, pct: 10 },
    { type: "Financial Mathematics", count: 1230, pct: 8 },
    { type: "Proofs & Definitions", count: 890, pct: 6 },
    { type: "Other", count: 570, pct: 4 },
];

const performanceDist = [
    { range: "90-100%", students: 180, color: "bg-emerald-500" },
    { range: "80-89%", students: 420, color: "bg-green-500" },
    { range: "70-79%", students: 650, color: "bg-yellow-500" },
    { range: "60-69%", students: 380, color: "bg-orange-500" },
    { range: "50-59%", students: 210, color: "bg-red-400" },
    { range: "<50%", students: 120, color: "bg-red-600" },
];

export default function AnalyticsPage() {
    const maxStudents = Math.max(...performanceDist.map(p => p.students));
    const maxAttempts = Math.max(...difficultTopics.map(t => t.attempts));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-indigo-400" />
                    Analytics & Intelligence
                </h1>
                <p className="text-sm text-gray-500 mt-1">Strategic insights to improve content, pricing, and student outcomes.</p>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <Clock className="w-5 h-5 text-blue-400 mb-2" />
                    <div className="text-2xl font-bold text-white">1.8s</div>
                    <div className="text-xs text-gray-500">Avg Solution Time</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <Target className="w-5 h-5 text-emerald-400 mb-2" />
                    <div className="text-2xl font-bold text-white">78.4%</div>
                    <div className="text-xs text-gray-500">Avg First-Attempt Accuracy</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <BookOpen className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-2xl font-bold text-white">14,892</div>
                    <div className="text-xs text-gray-500">Questions Answered Today</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <Award className="w-5 h-5 text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold text-white">67%</div>
                    <div className="text-xs text-gray-500">Students Above 70% Accuracy</div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Most Difficult Topics */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <h3 className="font-semibold text-white text-sm">Most Difficult Topics (by Failure Rate)</h3>
                    </div>
                    <div className="space-y-3">
                        {difficultTopics.map((t, i) => (
                            <div key={i} className="group">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-white">{t.topic}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${t.discipline === "Actuarial" ? "bg-indigo-500/10 text-indigo-400" :
                                                t.discipline === "Mathematics" ? "bg-cyan-500/10 text-cyan-400" :
                                                    "bg-purple-500/10 text-purple-400"
                                            }`}>{t.discipline}</span>
                                    </div>
                                    <span className="text-xs text-red-400 font-mono font-bold">{t.failRate}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all" style={{ width: `${t.failRate}%` }} />
                                </div>
                                <div className="text-[10px] text-gray-600 mt-0.5">{t.attempts} attempts</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Asked Question Types */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-5">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        <h3 className="font-semibold text-white text-sm">Most Asked Question Types</h3>
                    </div>
                    <div className="space-y-3">
                        {queryTypes.map((q, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-300">{q.type}</span>
                                    <span className="text-xs text-gray-500 font-mono">{q.count.toLocaleString()} ({q.pct}%)</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-600 to-blue-400 rounded-full transition-all" style={{ width: `${q.pct * 4}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Student Performance Distribution */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                <h3 className="font-semibold text-white text-sm mb-5">Student Performance Distribution</h3>
                <div className="flex items-end gap-4 h-40">
                    {performanceDist.map((p, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="text-xs text-gray-400 font-mono">{p.students}</div>
                            <div
                                className={`w-full ${p.color} rounded-t transition-all hover:opacity-80`}
                                style={{ height: `${(p.students / maxStudents) * 100}%` }}
                            />
                            <div className="text-[10px] text-gray-500 text-center">{p.range}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
