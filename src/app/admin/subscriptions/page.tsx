"use client";
import React, { useState } from "react";
import { CreditCard, DollarSign, AlertTriangle, RefreshCw, TrendingUp, ArrowUp, Settings } from "lucide-react";

const subscriptions = [
    { id: 1, user: "Kwame Asante", email: "kwame@ug.edu.gh", plan: "Semester Pro", amount: "GH₵ 149", period: "Semester", status: "Active", nextBilling: "Aug 15, 2026", method: "MTN MoMo" },
    { id: 2, user: "Ama Mensah", email: "ama@knust.edu.gh", plan: "Analyst", amount: "GH₵ 39", period: "Monthly", status: "Active", nextBilling: "Mar 3, 2026", method: "Card" },
    { id: 3, user: "Yaw Darko", email: "yaw@legon.ug.edu.gh", plan: "Analyst", amount: "GH₵ 39", period: "Monthly", status: "Active", nextBilling: "Mar 20, 2026", method: "Card" },
    { id: 4, user: "Abena Owusu", email: "abena@upsa.edu.gh", plan: "Semester Pro", amount: "GH₵ 149", period: "Semester", status: "Failed", nextBilling: "Overdue", method: "MTN MoMo" },
    { id: 5, user: "Nana Yeboah", email: "nana@knust.edu.gh", plan: "Semester Pro", amount: "GH₵ 149", period: "Semester", status: "Active", nextBilling: "Jul 28, 2026", method: "Card" },
];

const failedPayments = [
    { user: "Abena Owusu", email: "abena@upsa.edu.gh", amount: "GH₵ 149", date: "Feb 15, 2026", reason: "Insufficient funds", retries: 3 },
    { user: "Kofi Adu", email: "kofi.adu@ug.edu.gh", amount: "GH₵ 39", date: "Feb 22, 2026", reason: "Card expired", retries: 1 },
];

const planConfig = [
    { name: "Foundation", price: "GH₵ 0", queries: "10/day", docs: "5/month", exams: "1", tokens: "800 I/O", editable: true },
    { name: "Analyst", price: "GH₵ 39/mo", queries: "150/month", docs: "50", exams: "Basic", tokens: "2000/1500", editable: true },
    { name: "Semester Pro", price: "GH₵ 149/sem", queries: "600/sem", docs: "150", exams: "Full", tokens: "Opus", editable: true },
];

const revenueMonths = [
    { month: "Sep '25", revenue: 12400 },
    { month: "Oct '25", revenue: 18700 },
    { month: "Nov '25", revenue: 24300 },
    { month: "Dec '25", revenue: 31500 },
    { month: "Jan '26", revenue: 42100 },
    { month: "Feb '26", revenue: 52430 },
];

export default function SubscriptionsPage() {
    const [tab, setTab] = useState<"active" | "failed" | "config">("active");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Subscriptions & Billing</h1>
                <p className="text-sm text-gray-500 mt-1">Manage subscriptions, payments, and plan configuration.</p>
            </div>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm text-gray-400">Monthly Revenue</span>
                    </div>
                    <div className="text-2xl font-bold text-white">GH₵ 52,430</div>
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1"><ArrowUp className="w-3 h-3" /> +23.1% from last month</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-400">Active Subs</span>
                    </div>
                    <div className="text-2xl font-bold text-white">1,283</div>
                    <div className="text-xs text-gray-500 mt-1">across all tiers</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-gray-400">Failed Payments</span>
                    </div>
                    <div className="text-2xl font-bold text-white">2</div>
                    <div className="text-xs text-red-400 mt-1">requires attention</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-400">Boost Packs Sold</span>
                    </div>
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="text-xs text-gray-500 mt-1">GH₵ 1,340 this month</div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Revenue Trend</h3>
                <div className="flex items-end gap-3 h-32">
                    {revenueMonths.map((m, i) => {
                        const max = Math.max(...revenueMonths.map(x => x.revenue));
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="text-[10px] text-emerald-400 font-mono">GH₵{(m.revenue / 1000).toFixed(1)}k</div>
                                <div
                                    className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all hover:opacity-80"
                                    style={{ height: `${(m.revenue / max) * 100}%` }}
                                />
                                <div className="text-[10px] text-gray-500">{m.month}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
                {(["active", "failed", "config"] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {t === "active" ? "Active Subscriptions" : t === "failed" ? "Failed Payments" : "Plan Config"}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {tab === "active" && (
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                    <th className="text-left px-5 py-3">User</th>
                                    <th className="text-left px-3 py-3">Plan</th>
                                    <th className="text-left px-3 py-3">Amount</th>
                                    <th className="text-left px-3 py-3">Status</th>
                                    <th className="text-left px-3 py-3">Next Billing</th>
                                    <th className="text-left px-3 py-3">Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map(s => (
                                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="text-sm font-medium text-white">{s.user}</div>
                                            <div className="text-xs text-gray-500">{s.email}</div>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-gray-300">{s.plan}</td>
                                        <td className="px-3 py-3 text-sm text-white font-mono">{s.amount}</td>
                                        <td className="px-3 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${s.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                                }`}>{s.status}</span>
                                        </td>
                                        <td className="px-3 py-3 text-xs text-gray-400">{s.nextBilling}</td>
                                        <td className="px-3 py-3 text-xs text-gray-500">{s.method}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {tab === "failed" && (
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                    <th className="text-left px-5 py-3">User</th>
                                    <th className="text-left px-3 py-3">Amount</th>
                                    <th className="text-left px-3 py-3">Date</th>
                                    <th className="text-left px-3 py-3">Reason</th>
                                    <th className="text-center px-3 py-3">Retries</th>
                                    <th className="text-center px-3 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {failedPayments.map((f, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="text-sm font-medium text-white">{f.user}</div>
                                            <div className="text-xs text-gray-500">{f.email}</div>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-red-400 font-mono">{f.amount}</td>
                                        <td className="px-3 py-3 text-xs text-gray-400">{f.date}</td>
                                        <td className="px-3 py-3 text-xs text-yellow-400">{f.reason}</td>
                                        <td className="text-center px-3 py-3 text-xs text-gray-400">{f.retries}</td>
                                        <td className="text-center px-3 py-3">
                                            <button className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-all flex items-center gap-1 mx-auto">
                                                <RefreshCw className="w-3 h-3" /> Retry
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {tab === "config" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {planConfig.map((p, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white">{p.name}</h3>
                                <span className="text-xs text-indigo-400 font-mono">{p.price}</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-400"><span>Queries</span><span className="text-white font-mono">{p.queries}</span></div>
                                <div className="flex justify-between text-gray-400"><span>Documents</span><span className="text-white font-mono">{p.docs}</span></div>
                                <div className="flex justify-between text-gray-400"><span>Exams</span><span className="text-white font-mono">{p.exams}</span></div>
                                <div className="flex justify-between text-gray-400"><span>Tokens</span><span className="text-white font-mono">{p.tokens}</span></div>
                            </div>
                            <button className="w-full py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-1">
                                <Settings className="w-3 h-3" /> Edit Limits
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
