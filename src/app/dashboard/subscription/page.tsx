"use client";
import React from "react";
import { CreditCard, Zap, FileText, BookOpen, ArrowRight } from "lucide-react";

export default function SubscriptionPage() {
    const plan = "Semester Pro Tier";
    const usage = {
        queries: { used: 87, total: 150 },
        docs: { used: 23, total: 50 },
        exams: { used: 2, total: 5 },
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription &amp; Usage</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">Manage your active plan, quotas, and boost add-ons</p>
            </div>

            {/* Current Plan */}
            <div className="card-owlearn p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                        <div className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-1">Active Plan</div>
                        <div className="text-xl font-extrabold text-slate-900">{plan}</div>
                    </div>
                    <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">GH₵ 49 / month</span>
                </div>
                <div className="space-y-4">
                    {[
                        { label: "AI Queries", icon: Zap, ...usage.queries },
                        { label: "Documents", icon: FileText, ...usage.docs },
                        { label: "Exams Generated", icon: BookOpen, ...usage.exams },
                    ].map((s, i) => {
                        const pct = Math.round((s.used / s.total) * 100);
                        return (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
                                    <span className="text-slate-700 flex items-center gap-2"><s.icon className="w-4 h-4 text-indigo-600" />{s.label}</span>
                                    <span className="text-slate-900 font-bold">{s.used}/{s.total}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${pct > 85 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-indigo-600"}`} style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upgrade */}
            <div className="card-owlearn p-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex items-center justify-between">
                <div>
                    <div className="text-lg font-bold">Upgrade to Ultimate Research Tier</div>
                    <div className="text-xs text-indigo-100 mt-1 font-medium">Unlimited queries, 150 docs/mo, full symbolic verification, offline access</div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-full text-xs font-bold hover:bg-slate-100 transition-all shadow-md">
                    Upgrade <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Boost Packs */}
            <div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Add-on Boost Packs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { name: "Query Boost", price: "GH₵ 20", desc: "+100 queries" },
                        { name: "Verification", price: "GH₵ 30", desc: "+5 verified solutions" },
                        { name: "Exam Pack", price: "GH₵ 40", desc: "3 mock exams" },
                    ].map((p, i) => (
                        <div key={i} className="card-owlearn p-5 text-center hover:border-indigo-200 transition-colors cursor-pointer">
                            <div className="text-sm font-bold text-slate-900">{p.name}</div>
                            <div className="text-sm font-extrabold text-indigo-600 mt-1">{p.price}</div>
                            <div className="text-xs font-semibold text-slate-500 mt-1">{p.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
