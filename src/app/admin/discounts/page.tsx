"use client";
import React, { useState } from "react";
import {
    Tag, Plus, Search, Copy, Check, X, Trash2, Power, PowerOff,
    Calendar, Users, Percent, DollarSign, Clock, AlertCircle,
    CheckSquare, Square, XCircle
} from "lucide-react";

interface DiscountCode {
    id: number;
    code: string;
    type: "percentage" | "fixed";
    value: number;
    appliesTo: string;
    maxUses: number | null;
    usedCount: number;
    minPurchase: string | null;
    validFrom: string;
    validUntil: string;
    status: "active" | "inactive" | "expired";
    createdAt: string;
}

const initialCodes: DiscountCode[] = [
    {
        id: 1, code: "WELCOME25", type: "percentage", value: 25, appliesTo: "All Plans",
        maxUses: 500, usedCount: 187, minPurchase: null,
        validFrom: "2026-01-01", validUntil: "2026-06-30",
        status: "active", createdAt: "Jan 1, 2026"
    },
    {
        id: 2, code: "KNUST2026", type: "percentage", value: 15, appliesTo: "Semester Pro",
        maxUses: 200, usedCount: 43, minPurchase: null,
        validFrom: "2026-02-01", validUntil: "2026-04-30",
        status: "active", createdAt: "Feb 1, 2026"
    },
    {
        id: 3, code: "FIRSTMONTH", type: "fixed", value: 20, appliesTo: "Analyst",
        maxUses: null, usedCount: 312, minPurchase: null,
        validFrom: "2025-11-01", validUntil: "2026-03-31",
        status: "active", createdAt: "Nov 1, 2025"
    },
    {
        id: 4, code: "EARLYBIRD50", type: "percentage", value: 50, appliesTo: "All Plans",
        maxUses: 100, usedCount: 100, minPurchase: null,
        validFrom: "2025-09-01", validUntil: "2025-12-31",
        status: "expired", createdAt: "Sep 1, 2025"
    },
    {
        id: 5, code: "STUDYGROUP10", type: "percentage", value: 10, appliesTo: "All Plans",
        maxUses: 1000, usedCount: 0, minPurchase: null,
        validFrom: "2026-03-01", validUntil: "2026-08-31",
        status: "inactive", createdAt: "Feb 20, 2026"
    },
];

export default function DiscountCodesPage() {
    const [codes, setCodes] = useState<DiscountCode[]>(initialCodes);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "expired">("all");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    // New code form state
    const [newCode, setNewCode] = useState({
        code: "", type: "percentage" as "percentage" | "fixed", value: "",
        appliesTo: "All Plans", maxUses: "", validFrom: "", validUntil: "",
    });

    const filtered = codes.filter(c => {
        const matchSearch = c.code.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const stats = {
        total: codes.length,
        active: codes.filter(c => c.status === "active").length,
        totalRedemptions: codes.reduce((sum, c) => sum + c.usedCount, 0),
        avgDiscount: Math.round(codes.filter(c => c.type === "percentage").reduce((sum, c) => sum + c.value, 0) / codes.filter(c => c.type === "percentage").length),
    };

    const handleCopy = (id: number, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleToggleStatus = (id: number) => {
        setCodes(prev => prev.map(c =>
            c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
        ));
    };

    const handleDelete = (id: number) => {
        setCodes(prev => prev.filter(c => c.id !== id));
        setSelected(prev => { const next = new Set(prev); next.delete(id); return next; });
    };

    // ── Batch operations ──
    const toggleSelect = (id: number) => {
        setSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selected.size === filtered.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(filtered.map(c => c.id)));
        }
    };

    const batchActivate = () => {
        setCodes(prev => prev.map(c =>
            selected.has(c.id) && c.status !== "expired" ? { ...c, status: "active" } : c
        ));
        setSelected(new Set());
    };

    const batchDeactivate = () => {
        setCodes(prev => prev.map(c =>
            selected.has(c.id) && c.status !== "expired" ? { ...c, status: "inactive" } : c
        ));
        setSelected(new Set());
    };

    const batchDelete = () => {
        setCodes(prev => prev.filter(c => !selected.has(c.id)));
        setSelected(new Set());
    };

    const batchCopy = () => {
        const selectedCodes = codes.filter(c => selected.has(c.id)).map(c => c.code).join(", ");
        navigator.clipboard.writeText(selectedCodes);
    };

    const handleCreate = () => {
        if (!newCode.code || !newCode.value || !newCode.validFrom || !newCode.validUntil) return;
        const newEntry: DiscountCode = {
            id: Date.now(),
            code: newCode.code.toUpperCase().replace(/\s/g, ""),
            type: newCode.type,
            value: parseFloat(newCode.value),
            appliesTo: newCode.appliesTo,
            maxUses: newCode.maxUses ? parseInt(newCode.maxUses) : null,
            usedCount: 0,
            minPurchase: null,
            validFrom: newCode.validFrom,
            validUntil: newCode.validUntil,
            status: "active",
            createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };
        setCodes(prev => [newEntry, ...prev]);
        setNewCode({ code: "", type: "percentage", value: "", appliesTo: "All Plans", maxUses: "", validFrom: "", validUntil: "" });
        setShowCreateModal(false);
    };

    const generateCode = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "";
        for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
        setNewCode(prev => ({ ...prev, code: result }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Discount Codes</h1>
                    <p className="text-sm text-gray-500 mt-1">Create, manage, and activate promotional discount codes for student sign-ups.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
                >
                    <Plus className="w-4 h-4" /> Create Code
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Tag className="w-5 h-5 text-indigo-400" />
                        <span className="text-sm text-gray-400">Total Codes</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Power className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-gray-400">Active</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.active}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-400">Total Redemptions</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.totalRedemptions}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Percent className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-400">Avg Discount</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.avgDiscount}%</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search codes..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                    {(["all", "active", "inactive", "expired"] as const).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${filterStatus === s ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Codes Table */}
            <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                <th className="w-10 px-3 py-3">
                                    <button onClick={toggleSelectAll} className="text-gray-500 hover:text-white transition-colors">
                                        {filtered.length > 0 && selected.size === filtered.length
                                            ? <CheckSquare className="w-4 h-4 text-indigo-400" />
                                            : <Square className="w-4 h-4" />}
                                    </button>
                                </th>
                                <th className="text-left px-3 py-3">Code</th>
                                <th className="text-left px-3 py-3">Discount</th>
                                <th className="text-left px-3 py-3">Applies To</th>
                                <th className="text-left px-3 py-3">Usage</th>
                                <th className="text-left px-3 py-3">Valid Period</th>
                                <th className="text-center px-3 py-3">Status</th>
                                <th className="text-center px-3 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${selected.has(c.id) ? "bg-indigo-500/[0.04]" : ""}`}>
                                    {/* Checkbox */}
                                    <td className="w-10 px-3 py-3">
                                        <button onClick={() => toggleSelect(c.id)} className="text-gray-500 hover:text-white transition-colors">
                                            {selected.has(c.id)
                                                ? <CheckSquare className="w-4 h-4 text-indigo-400" />
                                                : <Square className="w-4 h-4" />}
                                        </button>
                                    </td>

                                    {/* Code */}
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2">
                                            <code className="bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-lg text-sm font-mono font-bold tracking-wide">
                                                {c.code}
                                            </code>
                                            <button
                                                onClick={() => handleCopy(c.id, c.code)}
                                                className="p-1 rounded hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                                                title="Copy code"
                                            >
                                                {copiedId === c.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </td>

                                    {/* Discount */}
                                    <td className="px-3 py-3">
                                        <span className="text-sm font-mono text-white">
                                            {c.type === "percentage" ? `${c.value}%` : `GH₵ ${c.value}`}
                                        </span>
                                        <span className="text-[10px] text-gray-600 ml-1.5">{c.type === "percentage" ? "off" : "off"}</span>
                                    </td>

                                    {/* Applies To */}
                                    <td className="px-3 py-3 text-sm text-gray-300">{c.appliesTo}</td>

                                    {/* Usage */}
                                    <td className="px-3 py-3">
                                        <div className="text-sm text-white font-mono">
                                            {c.usedCount}{c.maxUses ? ` / ${c.maxUses}` : ""}
                                        </div>
                                        {c.maxUses && (
                                            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                                                <div
                                                    className={`h-full rounded-full ${c.usedCount / c.maxUses > 0.9 ? "bg-red-500" :
                                                        c.usedCount / c.maxUses > 0.6 ? "bg-yellow-500" : "bg-indigo-500"
                                                        }`}
                                                    style={{ width: `${Math.min((c.usedCount / c.maxUses) * 100, 100)}%` }}
                                                />
                                            </div>
                                        )}
                                        {!c.maxUses && <div className="text-[10px] text-gray-600">Unlimited</div>}
                                    </td>

                                    {/* Valid Period */}
                                    <td className="px-3 py-3">
                                        <div className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-gray-600" />
                                            {c.validFrom} → {c.validUntil}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="text-center px-3 py-3">
                                        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${c.status === "active" ? "bg-green-500/10 text-green-400" :
                                            c.status === "inactive" ? "bg-gray-500/10 text-gray-400" :
                                                "bg-red-500/10 text-red-400"
                                            }`}>
                                            {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-center px-3 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            {c.status !== "expired" && (
                                                <button
                                                    onClick={() => handleToggleStatus(c.id)}
                                                    className={`p-1.5 rounded-lg transition-colors ${c.status === "active"
                                                        ? "text-yellow-400 hover:bg-yellow-500/10"
                                                        : "text-green-400 hover:bg-green-500/10"
                                                        }`}
                                                    title={c.status === "active" ? "Deactivate" : "Activate"}
                                                >
                                                    {c.status === "active" ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="py-12 text-center text-gray-600 text-sm">
                        No discount codes found matching your criteria.
                    </div>
                )}
            </div>

            {/* ─── Batch Action Bar ─── */}
            {selected.size > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 px-6 py-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-indigo-400">{selected.size}</span>
                        </div>
                        <span className="text-sm text-gray-300">
                            {selected.size === 1 ? "code" : "codes"} selected
                        </span>
                    </div>

                    <div className="w-px h-6 bg-white/10" />

                    <button
                        onClick={batchActivate}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-green-400 hover:bg-green-500/10 transition-all"
                    >
                        <Power className="w-3.5 h-3.5" /> Activate
                    </button>
                    <button
                        onClick={batchDeactivate}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-yellow-400 hover:bg-yellow-500/10 transition-all"
                    >
                        <PowerOff className="w-3.5 h-3.5" /> Deactivate
                    </button>
                    <button
                        onClick={batchCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                        <Copy className="w-3.5 h-3.5" /> Copy All
                    </button>

                    <div className="w-px h-6 bg-white/10" />

                    <button
                        onClick={batchDelete}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Delete {selected.size}
                    </button>

                    <button
                        onClick={() => setSelected(new Set())}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all ml-1"
                        title="Clear selection"
                    >
                        <XCircle className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* ─── Create Code Modal ─── */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
                    <div className="relative bg-[#14141f] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Tag className="w-5 h-5 text-indigo-400" /> Create Discount Code
                            </h2>
                            <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Code Input */}
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Code</label>
                            <div className="flex gap-2">
                                <input
                                    value={newCode.code}
                                    onChange={e => setNewCode(prev => ({ ...prev, code: e.target.value.toUpperCase().replace(/\s/g, "") }))}
                                    placeholder="e.g. SUMMER2026"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                />
                                <button
                                    onClick={generateCode}
                                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>

                        {/* Discount Type + Value */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Type</label>
                                <select
                                    value={newCode.type}
                                    onChange={e => setNewCode(prev => ({ ...prev, type: e.target.value as "percentage" | "fixed" }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none"
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (GH₵)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Value</label>
                                <input
                                    type="number"
                                    value={newCode.value}
                                    onChange={e => setNewCode(prev => ({ ...prev, value: e.target.value }))}
                                    placeholder={newCode.type === "percentage" ? "e.g. 25" : "e.g. 20"}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                />
                            </div>
                        </div>

                        {/* Applies To + Max Uses */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Applies To</label>
                                <select
                                    value={newCode.appliesTo}
                                    onChange={e => setNewCode(prev => ({ ...prev, appliesTo: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none"
                                >
                                    <option value="All Plans">All Plans</option>
                                    <option value="Analyst">Analyst Only</option>
                                    <option value="Semester Pro">Semester Pro Only</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Max Uses</label>
                                <input
                                    type="number"
                                    value={newCode.maxUses}
                                    onChange={e => setNewCode(prev => ({ ...prev, maxUses: e.target.value }))}
                                    placeholder="Leave empty for unlimited"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                />
                            </div>
                        </div>

                        {/* Valid Period */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Valid From</label>
                                <input
                                    type="date"
                                    value={newCode.validFrom}
                                    onChange={e => setNewCode(prev => ({ ...prev, validFrom: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5 block">Valid Until</label>
                                <input
                                    type="date"
                                    value={newCode.validUntil}
                                    onChange={e => setNewCode(prev => ({ ...prev, validUntil: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        {newCode.code && newCode.value && (
                            <div className="bg-indigo-500/[0.05] border border-indigo-500/10 rounded-xl p-3 flex items-center gap-3">
                                <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                <span className="text-xs text-indigo-300">
                                    Code <code className="font-mono font-bold">{newCode.code}</code> will give{" "}
                                    {newCode.type === "percentage" ? `${newCode.value}% off` : `GH₵ ${newCode.value} off`}{" "}
                                    on <strong>{newCode.appliesTo}</strong>.
                                    {newCode.maxUses ? ` Limited to ${newCode.maxUses} uses.` : " Unlimited uses."}
                                </span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 border border-white/10 hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={!newCode.code || !newCode.value || !newCode.validFrom || !newCode.validUntil}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:text-gray-500 text-white transition-all"
                            >
                                Create & Activate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
