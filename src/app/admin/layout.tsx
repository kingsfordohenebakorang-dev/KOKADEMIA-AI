"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, CreditCard, BookOpen, BrainCircuit,
    BarChart3, Settings, Bell, Search, ChevronDown, LogOut,
    Activity, Shield, Menu, X, Tag
} from "lucide-react";

const sidebarItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Discount Codes", href: "/admin/discounts", icon: Tag },
    { label: "Content", href: "/admin/content", icon: BookOpen },
    { label: "AI Monitor", href: "/admin/ai-monitor", icon: BrainCircuit },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const notifications = [
        { id: 1, text: "Payment gateway latency detected", time: "2m ago", type: "warning" },
        { id: 2, text: "3 new user registrations", time: "15m ago", type: "info" },
        { id: 3, text: "Math engine computation failure", time: "1h ago", type: "error" },
        { id: 4, text: "Monthly revenue target reached", time: "3h ago", type: "success" },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex">
            {/* ─── Sidebar ─── */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d14] border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Logo */}
                <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <div className="font-bold text-sm tracking-tight">Kokademia</div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Admin Console</div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* System Status */}
                <div className="px-4 py-4 border-t border-white/5">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">System Status</div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">LLM Engine</span>
                            <span className="flex items-center gap-1.5 text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Online
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Math Engine</span>
                            <span className="flex items-center gap-1.5 text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Online
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Database</span>
                            <span className="flex items-center gap-1.5 text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <div className="px-3 py-3 border-t border-white/5">
                    <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* ─── Main Content ─── */}
            <div className="flex-1 lg:ml-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search users, subscriptions..."
                                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 w-64 lg:w-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* System Status Indicator */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                            <Activity className="w-3 h-3" />
                            All Systems Operational
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>

                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-[#14141f] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                                    <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-semibold">Notifications</div>
                                    {notifications.map((n) => (
                                        <div key={n.id} className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors">
                                            <div className="text-sm text-gray-200">{n.text}</div>
                                            <div className="text-xs text-gray-500 mt-1">{n.time}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                                    KO
                                </div>
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-medium">Super Admin</div>
                                    <div className="text-[10px] text-gray-500">admin@kokademia.com</div>
                                </div>
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#14141f] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                                    <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Settings</Link>
                                    <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Audit Logs</Link>
                                    <hr className="border-white/5 my-1" />
                                    <Link href="/login" className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">Sign Out</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    );
}
