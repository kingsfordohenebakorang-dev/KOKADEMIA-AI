"use client";
import React, { useState } from "react";
import { Settings, Shield, Users, Bell, Key, FileText, Download, Save } from "lucide-react";

const adminRoles = [
    { name: "Kingsford Oheneba", email: "admin@koktrust.ai", role: "Super Admin", permissions: ["All Access"], lastLogin: "Now", status: "Active" },
    { name: "Academic Admin", email: "academic@koktrust.ai", role: "Academic Admin", permissions: ["Content", "Analytics", "AI Monitor"], lastLogin: "1h ago", status: "Active" },
    { name: "Support Admin", email: "support@koktrust.ai", role: "Support Admin", permissions: ["Users", "Subscriptions"], lastLogin: "3h ago", status: "Active" },
    { name: "Finance Admin", email: "finance@koktrust.ai", role: "Finance Admin", permissions: ["Subscriptions", "Analytics"], lastLogin: "1d ago", status: "Active" },
];

const auditLogs = [
    { admin: "Super Admin", action: "Suspended user efua@ug.edu.gh", target: "Users", timestamp: "Feb 25, 2026 18:45", ip: "102.176.xx.xx" },
    { admin: "Academic Admin", action: "Published question: Ruin Probability", target: "Content", timestamp: "Feb 25, 2026 16:30", ip: "197.251.xx.xx" },
    { admin: "Finance Admin", action: "Processed refund GH₵39 to kofi.adu@ug.edu.gh", target: "Billing", timestamp: "Feb 25, 2026 14:12", ip: "154.160.xx.xx" },
    { admin: "Super Admin", action: "Updated Analyst plan query limit to 150/mo", target: "Settings", timestamp: "Feb 24, 2026 20:00", ip: "102.176.xx.xx" },
    { admin: "Support Admin", action: "Activated user abena@upsa.edu.gh", target: "Users", timestamp: "Feb 24, 2026 15:30", ip: "197.251.xx.xx" },
];

const notifications = [
    { id: 1, label: "Server downtime alerts", enabled: true, channel: "Email + SMS" },
    { id: 2, label: "Payment gateway issues", enabled: true, channel: "Email + SMS" },
    { id: 3, label: "AI computation failures", enabled: true, channel: "Email" },
    { id: 4, label: "Suspicious usage behavior", enabled: true, channel: "Email" },
    { id: 5, label: "Subscription expiration reminders", enabled: false, channel: "Email" },
    { id: 6, label: "New user registrations", enabled: false, channel: "Dashboard" },
    { id: 7, label: "Monthly revenue summary", enabled: true, channel: "Email" },
    { id: 8, label: "Trust Layer flagged outputs", enabled: true, channel: "Email + Dashboard" },
];

export default function SettingsPage() {
    const [tab, setTab] = useState<"roles" | "security" | "notifications">("roles");
    const [notifs, setNotifs] = useState(notifications);

    const toggle = (id: number) => {
        setNotifs(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Settings className="w-6 h-6 text-gray-400" />
                    Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">Admin roles, security configuration, and notification preferences.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
                {([
                    { key: "roles" as const, label: "Roles & Permissions", icon: Users },
                    { key: "security" as const, label: "Security & Audit", icon: Shield },
                    { key: "notifications" as const, label: "Notifications", icon: Bell },
                ]).map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${tab === t.key ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <t.icon className="w-3.5 h-3.5" /> {t.label}
                    </button>
                ))}
            </div>

            {/* Roles & Permissions */}
            {tab === "roles" && (
                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead>
                                    <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                        <th className="text-left px-5 py-3">Admin</th>
                                        <th className="text-left px-3 py-3">Role</th>
                                        <th className="text-left px-3 py-3">Permissions</th>
                                        <th className="text-left px-3 py-3">Last Login</th>
                                        <th className="text-left px-3 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminRoles.map((r, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="text-sm font-medium text-white">{r.name}</div>
                                                <div className="text-xs text-gray-500">{r.email}</div>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className={`text-xs px-2 py-1 rounded-md font-medium ${r.role === "Super Admin" ? "bg-red-500/10 text-red-400" :
                                                        r.role === "Academic Admin" ? "bg-purple-500/10 text-purple-400" :
                                                            r.role === "Support Admin" ? "bg-blue-500/10 text-blue-400" :
                                                                "bg-emerald-500/10 text-emerald-400"
                                                    }`}>{r.role}</span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {r.permissions.map((p, j) => (
                                                        <span key={j} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-400">{p}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 text-xs text-gray-500">{r.lastLogin}</td>
                                            <td className="px-3 py-3">
                                                <span className="text-xs text-green-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                        <h3 className="font-semibold text-white text-sm mb-3">Permission Matrix</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs min-w-[500px]">
                                <thead>
                                    <tr className="text-gray-500 border-b border-white/5">
                                        <th className="text-left py-2">Module</th>
                                        <th className="text-center py-2">Super Admin</th>
                                        <th className="text-center py-2">Academic</th>
                                        <th className="text-center py-2">Support</th>
                                        <th className="text-center py-2">Finance</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    {["Dashboard", "Users", "Subscriptions", "Content", "AI Monitor", "Analytics", "Settings"].map(mod => (
                                        <tr key={mod} className="border-b border-white/5">
                                            <td className="py-2 text-white">{mod}</td>
                                            <td className="text-center py-2 text-green-400">✓</td>
                                            <td className="text-center py-2">{["Dashboard", "Content", "AI Monitor", "Analytics"].includes(mod) ? <span className="text-green-400">✓</span> : <span className="text-gray-600">—</span>}</td>
                                            <td className="text-center py-2">{["Dashboard", "Users", "Subscriptions"].includes(mod) ? <span className="text-green-400">✓</span> : <span className="text-gray-600">—</span>}</td>
                                            <td className="text-center py-2">{["Dashboard", "Subscriptions", "Analytics"].includes(mod) ? <span className="text-green-400">✓</span> : <span className="text-gray-600">—</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Security & Audit */}
            {tab === "security" && (
                <div className="space-y-6">
                    {/* Security Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold text-white text-sm flex items-center gap-2"><Key className="w-4 h-4 text-yellow-400" /> Authentication</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">2FA Required</span>
                                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Enabled</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Session Timeout</span>
                                    <span className="text-xs text-gray-300 font-mono">8 hours</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">JWT Secret (set)</span>
                                    <span className="text-xs text-green-400">••••••••</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Password Policy</span>
                                    <span className="text-xs text-gray-300">Min 8 chars, mixed case</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold text-white text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-indigo-400" /> IP & Access</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">IP Logging</span>
                                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Rate Limiting</span>
                                    <span className="text-xs text-gray-300 font-mono">30 req/min</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">CORS Policy</span>
                                    <span className="text-xs text-gray-300">Strict</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">SSL/TLS</span>
                                    <span className="text-xs text-green-400">Enforced</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Audit Trail */}
                    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-400" /> Audit Trail
                            </h3>
                            <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 transition-all">
                                <Download className="w-3 h-3" /> Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead>
                                    <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                        <th className="text-left px-5 py-3">Admin</th>
                                        <th className="text-left px-3 py-3">Action</th>
                                        <th className="text-left px-3 py-3">Module</th>
                                        <th className="text-left px-3 py-3">Timestamp</th>
                                        <th className="text-left px-3 py-3">IP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auditLogs.map((l, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-3 text-sm text-white">{l.admin}</td>
                                            <td className="px-3 py-3 text-sm text-gray-300">{l.action}</td>
                                            <td className="px-3 py-3 text-xs text-gray-500">{l.target}</td>
                                            <td className="px-3 py-3 text-xs text-gray-500">{l.timestamp}</td>
                                            <td className="px-3 py-3 text-xs text-gray-600 font-mono">{l.ip}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications */}
            {tab === "notifications" && (
                <div className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                    <h3 className="font-semibold text-white text-sm mb-4">Alert Configuration</h3>
                    {notifs.map(n => (
                        <div key={n.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                            <div>
                                <div className="text-sm text-white">{n.label}</div>
                                <div className="text-xs text-gray-500 mt-0.5">Channel: {n.channel}</div>
                            </div>
                            <button
                                onClick={() => toggle(n.id)}
                                className={`relative w-11 h-6 rounded-full transition-colors ${n.enabled ? "bg-indigo-600" : "bg-white/10"}`}
                            >
                                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${n.enabled ? "left-[22px]" : "left-0.5"}`} />
                            </button>
                        </div>
                    ))}
                    <button className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Save Notification Preferences
                    </button>
                </div>
            )}
        </div>
    );
}
