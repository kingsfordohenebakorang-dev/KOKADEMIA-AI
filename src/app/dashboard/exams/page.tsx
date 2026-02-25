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
        <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-200">Exams</h1>
                        <p className="text-xs text-gray-600 mt-0.5 font-mono">Mock exam simulations & practice tests</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 text-indigo-400 rounded-lg text-xs font-medium border border-indigo-500/20 hover:bg-indigo-600/30 transition-all">
                        <Plus className="w-3 h-3" /> Generate Exam
                    </button>
                </div>

                <div className="space-y-2">
                    {exams.map((e, i) => (
                        <div key={i} className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5 hover:bg-white/[0.02] transition-colors group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-[13px] font-medium text-gray-300 group-hover:text-white transition-colors">{e.name}</h3>
                                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-600">
                                        <span>{e.questions} questions</span>
                                        <span>•</span>
                                        <span>{e.duration}</span>
                                        <span>•</span>
                                        <span>{e.attempts} attempt{e.attempts !== 1 ? "s" : ""}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[13px] font-mono font-medium ${e.bestScore !== "—" ? "text-indigo-400" : "text-gray-700"}`}>{e.bestScore}</div>
                                    <div className="text-[9px] text-gray-700 mt-0.5">{e.lastAttempt}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
