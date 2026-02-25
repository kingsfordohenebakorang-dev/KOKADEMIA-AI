"use client";
import React, { useState } from "react";
import { BrainCircuit, AlertTriangle, RefreshCw, Flag, Code, Zap, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

const llmLogs = [
    { id: 1, timestamp: "19:08:32", model: "Sonnet", query: "Calculate variance of whole life annuity-due", tokens_in: 842, tokens_out: 1340, latency: "1.8s", status: "success", confidence: 96 },
    { id: 2, timestamp: "19:07:15", model: "Haiku", query: "What is the force of mortality?", tokens_in: 245, tokens_out: 680, latency: "0.6s", status: "success", confidence: 99 },
    { id: 3, timestamp: "19:05:44", model: "Sonnet", query: "Find eigenvalues of [[4,2],[1,3]]", tokens_in: 380, tokens_out: 920, latency: "1.2s", status: "success", confidence: 98 },
    { id: 4, timestamp: "19:04:28", model: "Sonnet", query: "Solve the heat equation with Dirichlet BCs", tokens_in: 1200, tokens_out: 1800, latency: "3.4s", status: "success", confidence: 82 },
    { id: 5, timestamp: "19:02:11", model: "Opus", query: "Verify: ∫₀^∞ x²e^(-x) dx = 2", tokens_in: 560, tokens_out: 1100, latency: "2.1s", status: "success", confidence: 100 },
    { id: 6, timestamp: "18:58:03", model: "Sonnet", query: "Prove √2 is irrational using contradiction", tokens_in: 320, tokens_out: 1500, latency: "2.8s", status: "flagged", confidence: 72 },
];

const codeTranslations = [
    { query: "∫ x²sin(x) dx", pythonCode: "from sympy import *\nx = symbols('x')\nresult = integrate(x**2 * sin(x), x)\nprint(latex(result))", output: "-x²cos(x) + 2x·sin(x) + 2cos(x) + C", execTime: "0.3s", status: "verified" },
    { query: "eigenvalues of [[2,1],[1,3]]", pythonCode: "from sympy import Matrix\nA = Matrix([[2,1],[1,3]])\nprint(A.eigenvals())", output: "{(5-√5)/2: 1, (5+√5)/2: 1}", execTime: "0.4s", status: "verified" },
    { query: "d/dx [ln(x²+1)]", pythonCode: "from sympy import *\nx = symbols('x')\nresult = diff(ln(x**2 + 1), x)\nprint(latex(result))", output: "2x/(x²+1)", execTime: "0.1s", status: "verified" },
];

const errorLogs = [
    { timestamp: "18:45:12", query: "Complex matrix eigenvalue (500x500)", error: "SymPy TimeoutError: computation exceeded 30s limit", severity: "high", resolved: false },
    { timestamp: "17:30:08", query: "Triple integral with trig substitution", error: "MemoryError: symbolic expansion too large", severity: "medium", resolved: true },
    { timestamp: "15:12:45", query: "Recursive survival function", error: "RecursionError: maximum recursion depth exceeded", severity: "medium", resolved: true },
];

export default function AIMonitorPage() {
    const [tab, setTab] = useState<"llm" | "code" | "errors">("llm");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <BrainCircuit className="w-6 h-6 text-indigo-400" />
                    AI System Monitor
                </h1>
                <p className="text-sm text-gray-500 mt-1">Trust Layer transparency — LLM requests, code translations, and engine logs.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">LLM Requests (24h)</div>
                    <div className="text-xl font-bold text-white">14,892</div>
                    <div className="text-xs text-green-400 mt-1">99.2% success rate</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">SymPy Executions</div>
                    <div className="text-xl font-bold text-white">8,234</div>
                    <div className="text-xs text-green-400 mt-1">Avg 0.4s latency</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">Avg Confidence</div>
                    <div className="text-xl font-bold text-emerald-400">94.3%</div>
                    <div className="text-xs text-gray-500 mt-1">across all queries</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">Flagged Outputs</div>
                    <div className="text-xl font-bold text-yellow-400">12</div>
                    <div className="text-xs text-gray-500 mt-1">3 unresolved</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
                {([
                    { key: "llm" as const, label: "LLM Request Logs", icon: Zap },
                    { key: "code" as const, label: "Code Translations", icon: Code },
                    { key: "errors" as const, label: "Error Logs", icon: AlertTriangle },
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

            {tab === "llm" && (
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                                    <th className="text-left px-5 py-3">Time</th>
                                    <th className="text-left px-3 py-3">Model</th>
                                    <th className="text-left px-3 py-3">Query</th>
                                    <th className="text-right px-3 py-3">Tokens</th>
                                    <th className="text-right px-3 py-3">Latency</th>
                                    <th className="text-center px-3 py-3">Confidence</th>
                                    <th className="text-center px-3 py-3">Status</th>
                                    <th className="text-center px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {llmLogs.map(l => (
                                    <tr key={l.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-3 text-xs text-gray-500 font-mono">{l.timestamp}</td>
                                        <td className="px-3 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${l.model === "Opus" ? "bg-purple-500/10 text-purple-400" :
                                                    l.model === "Sonnet" ? "bg-blue-500/10 text-blue-400" :
                                                        "bg-gray-500/10 text-gray-400"
                                                }`}>{l.model}</span>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-white max-w-[250px] truncate">{l.query}</td>
                                        <td className="text-right px-3 py-3 text-xs text-gray-400 font-mono">{l.tokens_in}/{l.tokens_out}</td>
                                        <td className="text-right px-3 py-3 text-xs text-gray-400 font-mono">{l.latency}</td>
                                        <td className="text-center px-3 py-3">
                                            <span className={`text-xs font-bold font-mono ${l.confidence >= 90 ? "text-green-400" : l.confidence >= 75 ? "text-yellow-400" : "text-red-400"}`}>
                                                {l.confidence}%
                                            </span>
                                        </td>
                                        <td className="text-center px-3 py-3">
                                            {l.status === "success" ? (
                                                <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                                            ) : (
                                                <Flag className="w-4 h-4 text-yellow-400 mx-auto" />
                                            )}
                                        </td>
                                        <td className="text-center px-3 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition" title="View Details">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition" title="Re-run">
                                                    <RefreshCw className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition" title="Flag">
                                                    <Flag className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {tab === "code" && (
                <div className="space-y-4">
                    {codeTranslations.map((c, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-sm font-medium text-white">{c.query}</div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.execTime}</span>
                                        <span className={`flex items-center gap-1 ${c.status === "verified" ? "text-green-400" : "text-yellow-400"}`}>
                                            <CheckCircle className="w-3 h-3" /> {c.status}
                                        </span>
                                    </div>
                                </div>
                                <button className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3" /> Re-run
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">Generated Python</div>
                                    <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap">{c.pythonCode}</pre>
                                </div>
                                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">Output</div>
                                    <pre className="text-xs text-white font-mono">{c.output}</pre>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "errors" && (
                <div className="space-y-3">
                    {errorLogs.map((e, i) => (
                        <div key={i} className={`bg-white/5 border rounded-xl p-5 ${e.severity === "high" ? "border-red-500/30" : "border-white/5"}`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className={`w-4 h-4 ${e.severity === "high" ? "text-red-400" : "text-yellow-400"}`} />
                                        <span className="text-sm font-medium text-white">{e.query}</span>
                                    </div>
                                    <div className="mt-2 text-xs text-red-300 font-mono bg-red-500/10 px-3 py-2 rounded-lg">{e.error}</div>
                                    <div className="mt-2 text-xs text-gray-500">{e.timestamp}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {e.resolved ? (
                                        <span className="text-xs text-green-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Resolved</span>
                                    ) : (
                                        <span className="text-xs text-red-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> Unresolved</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
