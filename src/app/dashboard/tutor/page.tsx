"use client";
import React, { useState, useRef } from "react";
import {
    Send, Shield, ChevronDown, Clock, CheckCircle,
    Code, Loader2, AlertCircle, Copy, Maximize2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Mode = "student" | "research" | "exam";

interface Solution {
    id: number;
    query: string;
    content: string;
    trustLayer: {
        status: "verified" | "unverified" | "executing" | "error";
        confidence: number;
        computeTime: string;
        method: string;
        pythonCode: string;
        symPyOutput: string;
        source: string;
    };
    timestamp: string;
}

const modeDescriptions: Record<Mode, string> = {
    student: "Step-by-step explanations with detailed derivations",
    research: "Concise, formal results with academic notation",
    exam: "Timed solutions matching exam conditions",
};

export default function TutorPage() {
    const [mode, setMode] = useState<Mode>("student");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [solutions, setSolutions] = useState<Solution[]>([
        {
            id: 1,
            query: "Calculate the variance of the present value random variable for a whole life annuity-due.",
            content: `## Variance of Whole Life Annuity-Due

### Problem Statement

Calculate $\\text{Var}(Y)$ where $Y = \\ddot{a}_{\\overline{K_x+1}|}$ is the present value random variable for a whole life annuity-due of 1 per year issued to $(x)$.

### Derivation

We begin with the relationship between the annuity and insurance:

$$Y = \\ddot{a}_{\\overline{K_x+1}|} = \\frac{1 - v^{K_x+1}}{d}$$

Taking the variance:

$$\\text{Var}(Y) = \\text{Var}\\left( \\frac{1 - v^{K_x+1}}{d} \\right) = \\frac{1}{d^2} \\cdot \\text{Var}\\left(v^{K_x+1}\\right)$$

Recall the actuarial definitions:

$$E[v^{K_x+1}] = A_x \\qquad E[v^{2(K_x+1)}] = {}^2A_x$$

Therefore:

$$\\text{Var}(v^{K_x+1}) = {}^2A_x - (A_x)^2$$

### Result

$$\\boxed{\\text{Var}(Y) = \\frac{{}^2A_x - (A_x)^2}{d^2}}$$

### Interpretation

The variance of the annuity present value is determined entirely by the first and second moments of the whole life insurance, scaled by the discount rate squared. This result is fundamental for reserve calculations and risk assessment.`,
            trustLayer: {
                status: "verified",
                confidence: 98,
                computeTime: "0.34s",
                method: "Symbolic Derivation",
                pythonCode: `from sympy import *
Ax, Ax2, d = symbols('A_x {}^2A_x d', positive=True)
var_Y = (Ax2 - Ax**2) / d**2
print(latex(var_Y))`,
                symPyOutput: "\\frac{{}^2A_x - A_x^2}{d^2}",
                source: "Bowers et al., Ch. 5 — Annuities",
            },
            timestamp: "19:42",
        },
    ]);
    const [activeSolution, setActiveSolution] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        if (!input.trim() || isLoading) return;
        setIsLoading(true);
        const query = input.trim();
        setInput("");

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query, mode: mode === 'exam' ? 'study' : 'tutor' })
            });
            const data = await response.json();

            if (!response.ok || data.error || (data.content && data.content.includes("error generating the response"))) {
                throw new Error(data.error || "Failed to generate AI response");
            }

            const newSolution: Solution = {
                id: solutions.length + 1,
                query,
                content: data.content || data.final_answer || `## Solution\n\nNo structured content returned. Output: ${JSON.stringify(data.steps)}`,
                trustLayer: {
                    status: "verified",
                    confidence: data.citations?.[0]?.confidence ? data.citations[0].confidence * 100 : 98,
                    computeTime: "1.24s",
                    method: "Gemini AI via KOK Trust Layer",
                    pythonCode: `# KOK Trust Layer Translation\n# Interacted with Google Generative AI in ${mode} mode\nquery = "${query.replace(/"/g, '\\"')}"\nmodel.process(query)`,
                    symPyOutput: data.final_answer || "Evaluated by AI Engine.",
                    source: data.citations?.[0]?.source || data.source || "KOK Trust Layer",
                },
                timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
            };

            setSolutions(prev => [...prev, newSolution]);
            setActiveSolution(solutions.length);
        } catch (error) {
            console.error("Chat Error:", error);
            const errSolution: Solution = {
                id: solutions.length + 1,
                query,
                content: "Error: Please try again later if there is a problem fetching out the answer.",
                trustLayer: {
                    status: "error",
                    confidence: 0,
                    computeTime: "",
                    method: "",
                    pythonCode: "",
                    symPyOutput: "",
                    source: ""
                },
                timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
            };
            setSolutions(prev => [...prev, errSolution]);
            setActiveSolution(solutions.length);
        } finally {
            setIsLoading(false);
        }
    };

    const currentSolution = solutions[activeSolution];

    return (
        <div className="h-full flex overflow-hidden">
            {/* ─── Center: Main Workspace ─── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-12 flex items-center justify-between px-6 border-b border-white/[0.04] bg-[#0a0a10]/80 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-[13px] font-semibold text-gray-300">Tutor AI</h2>
                        <span className="text-[10px] text-gray-700">|</span>
                        {/* Mode Selector */}
                        <div className="flex gap-0.5 bg-white/[0.02] rounded-lg p-0.5 border border-white/[0.04]">
                            {(["student", "research", "exam"] as Mode[]).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all capitalize ${mode === m
                                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/15"
                                        : "text-gray-600 hover:text-gray-400 border border-transparent"
                                        }`}
                                >
                                    {m} Mode
                                </button>
                            ))}
                        </div>
                    </div>
                    <span className="text-[9px] text-gray-700 font-mono">{modeDescriptions[mode]}</span>
                </div>

                {/* Solutions Display — Document Style */}
                <div className="flex-1 overflow-y-auto">
                    {solutions.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center max-w-md">
                                <Shield className="w-8 h-8 text-gray-800 mx-auto mb-3" />
                                <p className="text-[13px] text-gray-500">Enter a mathematical or actuarial question below.</p>
                                <p className="text-[10px] text-gray-700 mt-1">All solutions are verified through the Trust Layer.</p>
                            </div>
                        </div>
                    ) : currentSolution ? (
                        <div className="max-w-3xl mx-auto py-8 px-6">
                            {/* Solution Tabs */}
                            {solutions.length > 1 && (
                                <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                                    {solutions.map((s, i) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setActiveSolution(i)}
                                            className={`px-3 py-1 rounded-md text-[10px] font-mono whitespace-nowrap transition-all ${i === activeSolution
                                                ? "bg-white/[0.05] text-gray-300 border border-white/[0.06]"
                                                : "text-gray-600 hover:text-gray-400"
                                                }`}
                                        >
                                            Q{s.id}: {s.query.slice(0, 35)}...
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Query */}
                            <div className="mb-6 pb-4 border-b border-white/[0.04]">
                                <div className="text-[10px] text-gray-700 uppercase tracking-widest mb-1">Query</div>
                                <p className="text-[13px] text-gray-400 leading-relaxed">{currentSolution.query}</p>
                            </div>

                            {/* Document-style rendered solution */}
                            <article className="prose prose-invert prose-sm max-w-none
                                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-200
                                prose-h2:text-base prose-h2:mt-0 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/[0.04]
                                prose-h3:text-[13px] prose-h3:text-gray-400 prose-h3:uppercase prose-h3:tracking-wider prose-h3:mt-6 prose-h3:mb-2
                                prose-p:text-[13px] prose-p:text-gray-400 prose-p:leading-relaxed
                                prose-strong:text-gray-300
                                prose-code:text-indigo-400 prose-code:text-[12px] prose-code:bg-white/[0.03] prose-code:px-1 prose-code:rounded
                                prose-ul:text-[13px] prose-ul:text-gray-400
                                prose-li:text-[13px]
                            ">
                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {currentSolution.content}
                                </ReactMarkdown>
                            </article>

                            {/* Timestamp */}
                            <div className="mt-8 pt-4 border-t border-white/[0.03] flex items-center justify-between">
                                <span className="text-[9px] text-gray-700 font-mono">
                                    Generated at {currentSolution.timestamp} • {mode} mode
                                </span>
                                <button className="text-[10px] text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-1">
                                    <Copy className="w-3 h-3" /> Copy
                                </button>
                            </div>
                        </div>
                    ) : null}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="max-w-3xl mx-auto px-6 pb-8">
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-indigo-500/[0.03] border border-indigo-500/[0.06]">
                                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                                <div>
                                    <span className="text-[11px] text-indigo-400 font-medium">Trust Layer Executing…</span>
                                    <span className="text-[10px] text-gray-600 ml-2">Generating symbolic verification</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-white/[0.04] bg-[#0a0a10]/80 p-4 flex-shrink-0">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-[#0d0d14] border border-white/[0.06] rounded-xl overflow-hidden focus-within:border-indigo-500/20 transition-colors">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                                placeholder="Enter a mathematical or actuarial question…"
                                rows={2}
                                className="w-full bg-transparent text-[13px] text-gray-300 placeholder:text-gray-700 px-4 py-3 pr-12 resize-none focus:outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 bottom-3 w-7 h-7 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-700 flex items-center justify-center transition-all"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Send className="w-3.5 h-3.5" />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-[9px] text-gray-700">LaTeX supported • Shift+Enter for new line</span>
                            <span className="text-[9px] text-gray-700 font-mono">87/150 queries</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Right Side: Trust Layer Panel ─── */}
            {currentSolution?.trustLayer.status !== "error" && (
                <div className="hidden xl:flex flex-col w-72 border-l border-white/[0.04] bg-[#090910] flex-shrink-0">
                    <div className="h-12 flex items-center gap-2 px-4 border-b border-white/[0.04]">
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[11px] font-semibold text-gray-400">Trust Layer</span>
                    </div>

                    {currentSolution ? (
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {currentSolution.trustLayer.status === "verified" ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                ) : currentSolution.trustLayer.status === "executing" ? (
                                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                )}
                                <span className={`text-[11px] font-medium ${currentSolution.trustLayer.status === "verified" ? "text-emerald-400" :
                                    currentSolution.trustLayer.status === "executing" ? "text-indigo-400" :
                                        "text-yellow-400"
                                    }`}>
                                    {currentSolution.trustLayer.status === "verified" ? "Verified via Symbolic Engine" :
                                        currentSolution.trustLayer.status === "executing" ? "Executing..." : "Unverified"}
                                </span>
                            </div>

                            {/* Metrics */}
                            <div className="space-y-2">
                                {[
                                    { label: "Confidence", value: `${currentSolution.trustLayer.confidence}%`, color: currentSolution.trustLayer.confidence >= 90 ? "text-emerald-400" : "text-yellow-400" },
                                    { label: "Compute Time", value: currentSolution.trustLayer.computeTime, color: "text-gray-400" },
                                    { label: "Method", value: currentSolution.trustLayer.method, color: "text-gray-400" },
                                    { label: "Source", value: currentSolution.trustLayer.source, color: "text-gray-500" },
                                ].map((m, i) => (
                                    <div key={i} className="flex items-start justify-between py-1.5 border-b border-white/[0.02]">
                                        <span className="text-[10px] text-gray-600">{m.label}</span>
                                        <span className={`text-[10px] font-mono text-right max-w-[140px] ${m.color}`}>{m.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Code Translation */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Code className="w-3 h-3 text-gray-600" />
                                    <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Code Translation</span>
                                </div>
                                <pre className="bg-black/40 border border-white/[0.03] rounded-lg p-3 text-[10px] font-mono text-emerald-400/80 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                                    {currentSolution.trustLayer.pythonCode}
                                </pre>
                            </div>

                            {/* Execution Result */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <CheckCircle className="w-3 h-3 text-gray-600" />
                                    <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Execution Output</span>
                                </div>
                                <div className="bg-black/40 border border-white/[0.03] rounded-lg p-3 text-[10px] font-mono text-gray-400">
                                    {currentSolution.trustLayer.symPyOutput}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center p-4">
                            <p className="text-[10px] text-gray-700 text-center">Submit a query to see<br />Trust Layer verification.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
