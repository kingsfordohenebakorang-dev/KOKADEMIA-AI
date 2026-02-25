"use client";
import React, { useState } from "react";
import { Search, Filter, MoreVertical, UserCheck, UserX, ArrowUpDown, Download, ChevronDown } from "lucide-react";

const mockUsers = [
    { id: 1, name: "Kwame Asante", email: "kwame@ug.edu.gh", plan: "Semester Pro", status: "Active", role: "Student", queries: 342, docs: 28, lastLogin: "2h ago", joined: "Oct 12, 2025", examLevel: "SOA", riskScore: "Low" },
    { id: 2, name: "Ama Mensah", email: "ama@knust.edu.gh", plan: "Analyst", status: "Active", role: "Student", queries: 128, docs: 15, lastLogin: "5h ago", joined: "Nov 3, 2025", examLevel: "IFoA", riskScore: "Low" },
    { id: 3, name: "Kofi Boateng", email: "kofi@ucc.edu.gh", plan: "Foundation", status: "Active", role: "Student", queries: 8, docs: 2, lastLogin: "1d ago", joined: "Jan 15, 2026", examLevel: "SOA", riskScore: "Low" },
    { id: 4, name: "Abena Owusu", email: "abena@upsa.edu.gh", plan: "Semester Pro", status: "Expired", role: "Student", queries: 567, docs: 45, lastLogin: "3d ago", joined: "Sep 1, 2025", examLevel: "IFoA", riskScore: "Medium" },
    { id: 5, name: "Yaw Darko", email: "yaw@legon.ug.edu.gh", plan: "Analyst", status: "Active", role: "Student", queries: 89, docs: 12, lastLogin: "6h ago", joined: "Dec 20, 2025", examLevel: "SOA", riskScore: "Low" },
    { id: 6, name: "Efua Asiedu", email: "efua@ug.edu.gh", plan: "Foundation", status: "Suspended", role: "Student", queries: 1200, docs: 3, lastLogin: "2w ago", joined: "Aug 5, 2025", examLevel: "N/A", riskScore: "High" },
    { id: 7, name: "Nana Yeboah", email: "nana@knust.edu.gh", plan: "Semester Pro", status: "Active", role: "Student", queries: 456, docs: 38, lastLogin: "1h ago", joined: "Oct 28, 2025", examLevel: "SOA", riskScore: "Low" },
    { id: 8, name: "Adjoa Frimpong", email: "adjoa@ucc.edu.gh", plan: "Analyst", status: "Active", role: "Lecturer", queries: 67, docs: 55, lastLogin: "3h ago", joined: "Jul 10, 2025", examLevel: "N/A", riskScore: "Low" },
];

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [filterPlan, setFilterPlan] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const filtered = mockUsers.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchPlan = filterPlan === "All" || u.plan === filterPlan;
        const matchStatus = filterStatus === "All" || u.status === filterStatus;
        return matchSearch && matchPlan && matchStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-sm text-gray-500 mt-1">{mockUsers.length} total users • {mockUsers.filter(u => u.status === "Active").length} active</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-all">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px] max-w-md">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <select value={filterPlan} onChange={e => setFilterPlan(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none cursor-pointer">
                    <option value="All">All Plans</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Semester Pro">Semester Pro</option>
                </select>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none cursor-pointer">
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Suspended">Suspended</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                <th className="text-left px-5 py-3">User</th>
                                <th className="text-left px-3 py-3">Plan</th>
                                <th className="text-left px-3 py-3">Status</th>
                                <th className="text-left px-3 py-3">Exam Level</th>
                                <th className="text-right px-3 py-3">Queries</th>
                                <th className="text-right px-3 py-3">Docs</th>
                                <th className="text-left px-3 py-3">Last Login</th>
                                <th className="text-left px-3 py-3">Risk</th>
                                <th className="text-center px-3 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u) => (
                                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-xs font-bold text-white">
                                                {u.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{u.name}</div>
                                                <div className="text-xs text-gray-500">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${u.plan === "Semester Pro" ? "bg-indigo-500/10 text-indigo-400" :
                                                u.plan === "Analyst" ? "bg-blue-500/10 text-blue-400" :
                                                    "bg-gray-500/10 text-gray-400"
                                            }`}>{u.plan}</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`text-xs flex items-center gap-1 w-fit ${u.status === "Active" ? "text-green-400" :
                                                u.status === "Suspended" ? "text-red-400" :
                                                    "text-yellow-400"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-green-400" :
                                                    u.status === "Suspended" ? "bg-red-400" :
                                                        "bg-yellow-400"
                                                }`} />
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-xs text-gray-400">{u.examLevel}</td>
                                    <td className="text-right px-3 py-3 text-sm text-gray-300 font-mono">{u.queries}</td>
                                    <td className="text-right px-3 py-3 text-sm text-gray-400 font-mono">{u.docs}</td>
                                    <td className="px-3 py-3 text-xs text-gray-500">{u.lastLogin}</td>
                                    <td className="px-3 py-3">
                                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${u.riskScore === "High" ? "bg-red-500/10 text-red-400" :
                                                u.riskScore === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                                                    "bg-green-500/10 text-green-400"
                                            }`}>{u.riskScore}</span>
                                    </td>
                                    <td className="text-center px-3 py-3">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setSelectedUser(selectedUser === u.id ? null : u.id)}
                                                className="p-1 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                            {selectedUser === u.id && (
                                                <div className="absolute right-0 mt-1 w-44 bg-[#14141f] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2">
                                                        <UserCheck className="w-3 h-3" /> View Profile
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2">
                                                        <ArrowUpDown className="w-3 h-3" /> Change Plan
                                                    </button>
                                                    {u.status === "Active" ? (
                                                        <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                                                            <UserX className="w-3 h-3" /> Suspend User
                                                        </button>
                                                    ) : (
                                                        <button className="w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-green-500/10 flex items-center gap-2">
                                                            <UserCheck className="w-3 h-3" /> Activate User
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
