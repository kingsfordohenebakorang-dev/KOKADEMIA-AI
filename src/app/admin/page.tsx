"use client";
import React from "react";
import {
    Users, CreditCard, TrendingUp, Activity, Zap, ShieldCheck,
    ArrowUp, ArrowDown, DollarSign, BookOpen
} from "lucide-react";

// ─── Mock Data ───
const metrics = [
    { title: "Total Users", value: "2,847", change: "+12.5%", up: true, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Active Subscriptions", value: "1,283", change: "+8.2%", up: true, icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Monthly Revenue", value: "GH₵ 52,430", change: "+23.1%", up: true, icon: DollarSign, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "AI Queries Today", value: "14,892", change: "-3.4%", up: false, icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Free vs Paid", value: "1,564 / 1,283", change: "45% paid", up: true, icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { title: "System Status", value: "All Online", change: "99.9% uptime", up: true, icon: ShieldCheck, color: "text-green-400", bg: "bg-green-500/10" },
];

const recentUsers = [
    { name: "Kwame Asante", email: "kwame@ug.edu.gh", plan: "Semester Pro", status: "Active", queries: 342, joined: "2 hours ago" },
    { name: "Ama Mensah", email: "ama@knust.edu.gh", plan: "Analyst", status: "Active", queries: 128, joined: "5 hours ago" },
    { name: "Kofi Boateng", email: "kofi@ucc.edu.gh", plan: "Foundation", status: "Active", queries: 8, joined: "1 day ago" },
    { name: "Abena Owusu", email: "abena@upsa.edu.gh", plan: "Semester Pro", status: "Expired", queries: 567, joined: "3 days ago" },
    { name: "Yaw Darko", email: "yaw@legon.ug.edu.gh", plan: "Analyst", status: "Active", queries: 89, joined: "5 days ago" },
];

const recentActivity = [
    { action: "New user registered", detail: "kofi@ucc.edu.gh signed up (Foundation)", time: "2m ago", type: "user" },
    { action: "Subscription upgraded", detail: "ama@knust.edu.gh → Analyst Plan", time: "15m ago", type: "billing" },
    { action: "Math engine error", detail: "SymPy timeout on eigenvalue computation", time: "1h ago", type: "error" },
    { action: "Boost Pack purchased", detail: "Query Boost (GH₵20) by kwame@ug.edu.gh", time: "2h ago", type: "billing" },
    { action: "Mock exam generated", detail: "Probability exam (25 questions) created", time: "3h ago", type: "content" },
    { action: "Trust Layer flag", detail: "Low confidence (72%) on integral computation", time: "4h ago", type: "warning" },
];

// Chart-like bars (simplified visual)
const chartData = {
    userGrowth: [40, 55, 62, 58, 75, 82, 90, 95, 88, 102, 115, 128],
    revenue: [15, 22, 28, 35, 32, 45, 52, 48, 58, 62, 68, 75],
    queries: [200, 350, 280, 420, 510, 380, 450, 620, 580, 700, 650, 780],
    errors: [8, 5, 12, 3, 7, 2, 4, 6, 3, 5, 2, 4],
};

function MiniChart({ data, color, label }: { data: number[]; color: string; label: string }) {
    const max = Math.max(...data);
    return (
        <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className={`text-xs font-mono ${color}`}>{data[data.length - 1]}</span>
            </div>
            <div className="flex items-end gap-1 h-16">
                {data.map((v, i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-t transition-all hover:opacity-100 ${i === data.length - 1 ? "opacity-100" : "opacity-50"}`}
                        style={{
                            height: `${(v / max) * 100}%`,
                            backgroundColor: color === "text-blue-400" ? "#3b82f6" :
                                color === "text-emerald-400" ? "#10b981" :
                                    color === "text-purple-400" ? "#8b5cf6" :
                                        "#ef4444",
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-600">
                <span>Jan</span>
                <span>Dec</span>
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-sm text-gray-500 mt-1">Platform health, metrics, and activity at a glance.</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/[0.07] transition-all group">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <m.icon className={`w-4 h-4 ${m.color}`} />
                            </div>
                            <span className={`text-xs font-mono flex items-center gap-0.5 ${m.up ? "text-green-400" : "text-red-400"}`}>
                                {m.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {m.change}
                            </span>
                        </div>
                        <div className="text-lg font-bold text-white">{m.value}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{m.title}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <MiniChart data={chartData.userGrowth} color="text-blue-400" label="📈 User Growth" />
                <MiniChart data={chartData.revenue} color="text-emerald-400" label="💰 Revenue Trend" />
                <MiniChart data={chartData.queries} color="text-purple-400" label="📊 AI Query Volume" />
                <MiniChart data={chartData.errors} color="text-red-400" label="📉 Computation Errors" />
            </div>

            {/* Two Column: Recent Users + Activity Feed */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-semibold text-white text-sm">Recent Users</h3>
                        <a href="/admin/users" className="text-xs text-indigo-400 hover:underline">View all →</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px]">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                    <th className="text-left px-5 py-3">User</th>
                                    <th className="text-left px-3 py-3">Plan</th>
                                    <th className="text-left px-3 py-3">Status</th>
                                    <th className="text-right px-5 py-3">Queries</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((u, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="text-sm font-medium text-white">{u.name}</div>
                                            <div className="text-xs text-gray-500">{u.email}</div>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className={`text-xs px-2 py-1 rounded-md font-medium ${u.plan === "Semester Pro" ? "bg-indigo-500/10 text-indigo-400" :
                                                    u.plan === "Analyst" ? "bg-blue-500/10 text-blue-400" :
                                                        "bg-gray-500/10 text-gray-400"
                                                }`}>{u.plan}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className={`text-xs flex items-center gap-1.5 ${u.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-green-400" : "bg-red-400"}`} />
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="text-right px-5 py-3 text-sm text-gray-300 font-mono">{u.queries}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/5">
                        <h3 className="font-semibold text-white text-sm">Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="px-5 py-3 hover:bg-white/5 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-sm text-white font-medium flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${a.type === "error" ? "bg-red-400" :
                                                    a.type === "warning" ? "bg-yellow-400" :
                                                        a.type === "billing" ? "bg-emerald-400" :
                                                            a.type === "content" ? "bg-purple-400" :
                                                                "bg-blue-400"
                                                }`} />
                                            {a.action}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">{a.detail}</div>
                                    </div>
                                    <span className="text-xs text-gray-600 whitespace-nowrap">{a.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
