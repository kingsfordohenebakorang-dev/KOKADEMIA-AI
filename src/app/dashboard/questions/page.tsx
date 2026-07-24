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
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Course Vault &amp; Question Bank</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Browse and practice verified problem sets</p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by topic, keyword or equation..."
                        className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
                    />
                </div>
            </div>

            <div className="space-y-3">
                {questions.map((q, i) => (
                    <div key={i} className="card-owlearn px-6 py-4 flex items-center justify-between hover:border-indigo-200">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900">{q.title}</span>
                            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                                q.discipline === "Actuarial" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                                q.discipline === "Mathematics" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                                "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            }`}>{q.discipline}</span>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                                q.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" :
                                q.difficulty === "Medium" ? "bg-amber-100 text-amber-800" :
                                "bg-rose-100 text-rose-800"
                            }`}>{q.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-500 font-semibold">{q.attempts} attempts</span>
                            <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{q.lastAccuracy}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
