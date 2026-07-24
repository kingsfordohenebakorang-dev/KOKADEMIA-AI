"use client";
import React from "react";
import Link from "next/link";
import { FileText, Clock, ChevronRight, Plus, Filter } from "lucide-react";

const exams = [
    { name: "Probability Mock Exam (SOA P)", questions: 30, duration: "3 hours", attempts: 3, bestScore: "78%", lastAttempt: "2 days ago" },
    { name: "Financial Mathematics Final", questions: 25, duration: "2.5 hours", attempts: 1, bestScore: "82%", lastAttempt: "1 week ago" },
    { name: "Linear Algebra Midterm", questions: 20, duration: "2 hours", attempts: 0, bestScore: "—", lastAttempt: "Not attempted" },
    { name: "Calculus II Comprehensive", questions: 35, duration: "3 hours", attempts: 2, bestScore: "71%", lastAttempt: "3 days ago" },
];

export default function ExamsPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mock Exam Simulations</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Timed SOA/IFoA exam simulations &amp; practice tests</p>
                </div>
                <Link href="/exams" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-indigo-200">
                    <Plus className="w-4 h-4" /> Generate New Exam
                </Link>
            </div>

            <div className="space-y-4">
                {exams.map((e, i) => (
                    <div key={i} className="card-owlearn p-6 hover:border-indigo-200 transition-colors group">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{e.name}</h3>
                                <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-500">
                                    <span>{e.questions} questions</span>
                                    <span>•</span>
                                    <span>{e.duration}</span>
                                    <span>•</span>
                                    <span>{e.attempts} attempt{e.attempts !== 1 ? "s" : ""}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-base font-extrabold ${e.bestScore !== "—" ? "text-indigo-600" : "text-slate-400"}`}>{e.bestScore}</div>
                                <div className="text-xs font-medium text-slate-400 mt-1">{e.lastAttempt}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
