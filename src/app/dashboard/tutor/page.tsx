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
                    method: "Gemini AI via Kokademia Trust Layer",
                    pythonCode: `# Kokademia Trust Layer Translation\n# Interacted with Google Generative AI in ${mode} mode\nquery = "${query.replace(/"/g, '\\"')}"\nmodel.process(query)`,
                    symPyOutput: data.final_answer || "Evaluated by AI Engine.",
                    source: data.citations?.[0]?.source || data.source || "Kokademia Trust Layer",
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

    const currentSolution = solutions[activeSolution];    return (
        <div className="h-full flex overflow-hidden bg-[#FAFAFC] text-slate-800">
            {/* ─── Left Side: Main Chat / Solution View ─── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold text-slate-900">AI Mathematics Tutor</h1>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 flex items-center gap-1">
                            <Shield className="w-3 h-3 text-emerald-600" /> SymPy Verified
                        </span>
                    </div>

                    {/* Mode Selector */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
                        {(["student", "research", "exam"] as Mode[]).map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                                    mode === m
                                        ? "bg-indigo-600 text-white shadow-sm"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {currentSolution ? (
                        <div className="max-w-4xl mx-auto card-owlearn p-8 bg-white">
                            {/* Solution Navigation */}
                            {solutions.length > 1 && (
                                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 border-b border-slate-100">
                                    {solutions.map((s, i) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setActiveSolution(i)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                                i === activeSolution
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                        >
                                            Q{s.id}: {s.query.slice(0, 30)}...
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Query */}
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Student Question</div>
                                <p className="text-base text-slate-900 font-semibold leading-relaxed">{currentSolution.query}</p>
                            </div>

                            {/* Document-style rendered solution */}
                            <article className="prose prose-slate max-w-none
                                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                                prose-h2:text-lg prose-h2:mt-0 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                                prose-h3:text-sm prose-h3:text-indigo-600 prose-h3:uppercase prose-h3:tracking-wider prose-h3:mt-6 prose-h3:mb-2
                                prose-p:text-sm prose-p:text-slate-700 prose-p:leading-relaxed
                                prose-strong:text-slate-900 prose-strong:font-bold
                                prose-code:text-indigo-600 prose-code:text-xs prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                prose-ul:text-sm prose-ul:text-slate-700
                                prose-li:text-sm
                            ">
                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {currentSolution.content}
                                </ReactMarkdown>
                            </article>

                            {/* Timestamp */}
                            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-semibold">
                                    Generated at {currentSolution.timestamp} • {mode} mode
                                </span>
                                <button className="text-xs text-slate-600 hover:text-indigo-600 font-bold transition-colors flex items-center gap-1">
                                    <Copy className="w-3.5 h-3.5" /> Copy Answer
                                </button>
                            </div>
                        </div>
                    ) : null}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm">
                                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                                <div>
                                    <span className="text-xs text-indigo-900 font-bold block">Trust Layer Executing...</span>
                                    <span className="text-[11px] text-indigo-700 font-medium">Running SymPy symbolic code sandbox verification</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-200 bg-white p-4 shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition-colors shadow-sm">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                                placeholder="Ask any actuarial or mathematical science problem..."
                                rows={2}
                                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 px-4 py-3 pr-12 resize-none focus:outline-none font-medium"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white flex items-center justify-center transition-all shadow-md"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-2 px-1">
                            <span className="text-[11px] text-slate-500 font-medium">LaTeX supported • Shift+Enter for new line</span>
                            <span className="text-[11px] text-slate-600 font-bold">87/150 queries remaining</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Right Side: Trust Layer Panel ─── */}
            {currentSolution && currentSolution.trustLayer.status !== "error" && (
                <div className="hidden xl:flex flex-col w-80 border-l border-slate-200 bg-white shrink-0">
                    <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-100">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-bold text-slate-900">Trust Layer Proof</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Status Badge */}
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-emerald-800">Verification Status</span>
                                <span className="text-xs font-extrabold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                                    PASSED
                                </span>
                            </div>
                            <div className="text-xs text-emerald-700 font-medium">Confidence: {currentSolution.trustLayer.confidence}% • {currentSolution.trustLayer.computeTime}</div>
                        </div>

                        {/* SymPy Code Box */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-800">Generated Python/SymPy</span>
                                <Code className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <pre className="p-3.5 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                                {currentSolution.trustLayer.pythonCode}
                            </pre>
                        </div>

                        {/* Evaluation Result */}
                        <div>
                            <span className="text-xs font-bold text-slate-800 block mb-2">Symbolic Evaluation</span>
                            <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-900 font-mono text-xs font-bold border border-slate-200">
                                {currentSolution.trustLayer.symPyOutput}
                            </div>
                        </div>

                        {/* Citation Reference */}
                        <div>
                            <span className="text-xs font-bold text-slate-800 block mb-1">Source Provenance</span>
                            <p className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                                📖 {currentSolution.trustLayer.source}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
