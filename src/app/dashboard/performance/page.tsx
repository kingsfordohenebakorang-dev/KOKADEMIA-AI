"use client";
import React from "react";
import { BarChart3, TrendingUp, TrendingDown, Target } from "lucide-react";

const weeklyScores = [62, 68, 71, 65, 78, 74, 81];
const topicBreakdown = [
    { topic: "Time Value of Money", score: 95, trend: "up" },
    { topic: "Integration", score: 88, trend: "up" },
    { topic: "Probability", score: 82, trend: "stable" },
    { topic: "Annuities", score: 76, trend: "up" },
    { topic: "Linear Algebra", score: 68, trend: "down" },
    { topic: "Survival Models", score: 62, trend: "stable" },
    { topic: "Differential Equations", score: 54, trend: "down" },
    { topic: "Ruin Probability", score: 41, trend: "down" },
];

export default function PerformancePage() {
    const max = Math.max(...weeklyScores);
    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-8">
                <div>
                    <h1 className="text-lg font-semibold text-gray-200">Performance</h1>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono">Track your progress across all subjects</p>
                </div>

                {/* Weekly Trend */}
                <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Weekly Score Trend</h3>
                    <div className="flex items-end gap-2 h-24">
                        {weeklyScores.map((s, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <span className="text-[9px] text-gray-600 font-mono">{s}%</span>
                                <div className="w-full bg-indigo-500/30 rounded-t" style={{ height: `${(s / max) * 100}%` }} />
                                <span className="text-[8px] text-gray-700">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Topic Breakdown */}
                <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Topic Breakdown</h3>
                    <div className="space-y-3">
                        {topicBreakdown.map((t, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-[11px] text-gray-400 w-44 truncate">{t.topic}</span>
                                <div className="flex-1 h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${t.score >= 80 ? "bg-emerald-500/50" : t.score >= 60 ? "bg-yellow-500/50" : "bg-red-500/50"}`} style={{ width: `${t.score}%` }} />
                                </div>
                                <span className={`text-[11px] font-mono w-8 text-right ${t.score >= 80 ? "text-emerald-400" : t.score >= 60 ? "text-yellow-400" : "text-red-400"}`}>{t.score}</span>
                                {t.trend === "up" ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : t.trend === "down" ? <TrendingDown className="w-3 h-3 text-red-400" /> : <Target className="w-3 h-3 text-gray-600" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
