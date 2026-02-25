"use client";
import React from "react";
import { Database, Search } from "lucide-react";

const questions = [
    { title: "Present Value of Annuity-Due (10-year)", discipline: "Actuarial", difficulty: "Medium", attempts: 3, lastAccuracy: "92%" },
    { title: "Eigenvalue Decomposition of 3×3 Matrix", discipline: "Mathematics", difficulty: "Hard", attempts: 1, lastAccuracy: "67%" },
    { title: "Survival Function Derivation", discipline: "Actuarial", difficulty: "Hard", attempts: 2, lastAccuracy: "75%" },
    { title: "Integration by Parts (Definite)", discipline: "Mathematics", difficulty: "Easy", attempts: 5, lastAccuracy: "98%" },
    { title: "Hypothesis Testing (Two-Tailed)", discipline: "Statistics", difficulty: "Medium", attempts: 2, lastAccuracy: "80%" },
    { title: "Laplace Transform of ODE", discipline: "Mathematics", difficulty: "Hard", attempts: 0, lastAccuracy: "—" },
];

export default function QuestionsPage() {
    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-6">
                <div>
                    <h1 className="text-lg font-semibold text-gray-200">Question Bank</h1>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono">Browse and practice verified problems</p>
                </div>

                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-gray-700" />
                    <input type="text" placeholder="Search questions..." className="w-full bg-[#0d0d14] border border-white/[0.04] rounded-lg pl-9 pr-3 py-2 text-[12px] text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-indigo-500/20" />
                </div>

                <div className="space-y-1">
                    {questions.map((q, i) => (
                        <div key={i} className="bg-[#0d0d14] border border-white/[0.04] rounded-lg px-4 py-3 hover:bg-white/[0.02] transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] text-gray-300">{q.title}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${q.discipline === "Actuarial" ? "bg-indigo-500/8 text-indigo-500" :
                                        q.discipline === "Mathematics" ? "bg-cyan-500/8 text-cyan-500" :
                                            "bg-purple-500/8 text-purple-500"
                                    }`}>{q.discipline}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${q.difficulty === "Easy" ? "text-emerald-500" : q.difficulty === "Medium" ? "text-yellow-500" : "text-red-400"
                                    }`}>{q.difficulty}</span>
                            </div>
                            <span className={`text-[11px] font-mono ${q.lastAccuracy !== "—" ? "text-gray-400" : "text-gray-700"}`}>{q.lastAccuracy}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
