"use client";
import React from "react";
import { CreditCard, Zap, FileText, BookOpen, ArrowRight } from "lucide-react";

export default function SubscriptionPage() {
    const plan = "Analyst";
    const usage = {
        queries: { used: 87, total: 150 },
        docs: { used: 23, total: 50 },
        exams: { used: 2, total: 5 },
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto p-6 lg:p-8 space-y-8">
                <div>
                    <h1 className="text-lg font-semibold text-gray-200">Subscription</h1>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono">Plan details & usage</p>
                </div>

                {/* Current Plan */}
                <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Current Plan</div>
                            <div className="text-lg font-bold text-blue-400">{plan}</div>
                        </div>
                        <span className="text-[12px] text-gray-400 font-mono">GH₵ 49 / month</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: "AI Queries", icon: Zap, ...usage.queries },
                            { label: "Documents", icon: FileText, ...usage.docs },
                            { label: "Exams Generated", icon: BookOpen, ...usage.exams },
                        ].map((s, i) => {
                            const pct = Math.round((s.used / s.total) * 100);
                            return (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[11px] text-gray-400 flex items-center gap-1.5"><s.icon className="w-3 h-3 text-gray-600" />{s.label}</span>
                                        <span className="text-[11px] text-gray-500 font-mono">{s.used}/{s.total}</span>
                                    </div>
                                    <div className="h-1 bg-white/[0.03] rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${pct > 85 ? "bg-red-500/60" : pct > 60 ? "bg-yellow-500/40" : "bg-indigo-500/40"}`} style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upgrade */}
                <div className="bg-indigo-500/[0.04] border border-indigo-500/10 rounded-xl p-5 flex items-center justify-between">
                    <div>
                        <div className="text-[12px] font-medium text-indigo-400">Upgrade to Semester Pro</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">600 queries, 150 docs, offline mode, verified solutions</div>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[11px] font-medium hover:bg-indigo-500 transition-all">
                        Upgrade <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                {/* Boost Packs */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Boost Packs</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { name: "Query Boost", price: "GH₵ 20", desc: "+100 queries" },
                            { name: "Verification", price: "GH₵ 30", desc: "+5 verified solutions" },
                            { name: "Exam Pack", price: "GH₵ 40", desc: "3 mock exams" },
                        ].map((p, i) => (
                            <div key={i} className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-4 text-center hover:bg-white/[0.02] transition-colors cursor-pointer">
                                <div className="text-[12px] font-medium text-gray-300">{p.name}</div>
                                <div className="text-[11px] text-indigo-400 font-mono mt-1">{p.price}</div>
                                <div className="text-[9px] text-gray-600 mt-1">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
