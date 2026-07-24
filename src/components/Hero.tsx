"use client"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, CheckCircle, Circle, Loader2, Brain, Code2, Shield, FlaskConical, FunctionSquare, Sparkles } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

const fadeUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
};

const pipelineSteps = [
    { label: "Understanding Question", icon: Brain, duration: 1600 },
    { label: "Generating SymPy Code", icon: Code2, duration: 1800 },
    { label: "Executing Secure Sandbox", icon: Shield, duration: 2000 },
    { label: "Verification Passed", icon: CheckCircle, duration: 1200 },
    { label: "Rendering LaTeX", icon: FunctionSquare, duration: 1000 },
    { label: "Final Verified Answer", icon: Sparkles, duration: 2000 },
];

const codeLines = [
    { text: "from", cls: "text-purple-400" },
    { text: " sympy ", cls: "text-blue-300" },
    { text: "import", cls: "text-purple-400" },
    { text: " symbols, exp, integrate, oo", cls: "text-yellow-300" },
    { break: true },
    { text: "# Define actuarial parameters", cls: "text-emerald-400/70 italic" },
    { text: "t = ", cls: "text-blue-300" },
    { text: "symbols(", cls: "text-yellow-300" },
    { text: "'t'", cls: "text-green-300" },
    { text: ", positive=", cls: "text-blue-300" },
    { text: "True", cls: "text-orange-300" },
    { text: ")", cls: "text-yellow-300" },
    { break: true },
    { text: "mu", cls: "text-blue-300" },
    { text: " = ", cls: "text-gray-400" },
    { text: "0.04", cls: "text-orange-300" },
    { text: "   # force of mortality", cls: "text-emerald-400/70 italic" },
    { break: true },
    { text: "delta", cls: "text-blue-300" },
    { text: " = ", cls: "text-gray-400" },
    { text: "0.05", cls: "text-orange-300" },
    { text: "  # force of interest", cls: "text-emerald-400/70 italic" },
    { break: true },
    { text: "# EPV whole life assurance", cls: "text-emerald-400/70 italic" },
    { break: true },
    { text: "integrand = ", cls: "text-blue-300" },
    { text: "exp(", cls: "text-yellow-300" },
    { text: "-(delta+mu)*t", cls: "text-blue-300" },
    { text: ") * mu", cls: "text-yellow-300" },
    { break: true },
    { text: "A_x = ", cls: "text-blue-300" },
    { text: "integrate(", cls: "text-yellow-300" },
    { text: "integrand, (t, ", cls: "text-blue-300" },
    { text: "0", cls: "text-orange-300" },
    { text: ", oo))", cls: "text-blue-300" },
    { break: true },
    { break: true },
    { text: "print(", cls: "text-yellow-300" },
    { text: "f\"Ā_x = {A_x}\"", cls: "text-green-300" },
    { text: ")", cls: "text-yellow-300" },
    { text: "  # 0.4444", cls: "text-emerald-400/70 italic" },
];

function VerificationDashboard() {
    const [currentStep, setCurrentStep] = useState(-1);
    const [showPanels, setShowPanels] = useState(false);
    const [showBadge, setShowBadge] = useState(false);

    const runPipeline = useCallback(() => {
        setCurrentStep(-1);
        setShowPanels(false);
        setShowBadge(false);

        let delay = 800;
        pipelineSteps.forEach((step, i) => {
            setTimeout(() => setCurrentStep(i), delay);
            delay += step.duration;
        });

        setTimeout(() => setShowPanels(true), delay - 800);
        setTimeout(() => setShowBadge(true), delay);
        setTimeout(() => runPipeline(), delay + 4000);
    }, []);

    useEffect(() => {
        const timer = setTimeout(runPipeline, 1200);
        return () => clearTimeout(timer);
    }, [runPipeline]);

    return (
        <div className="glass-dashboard p-1 w-full max-w-[520px]">
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-rich-black/[0.06]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
                <span className="ml-3 text-[11px] font-medium text-muted-text tracking-wide uppercase">
                    Kokademia Trust Engine
                </span>
            </div>

            <div className="p-5 space-y-4">
                {/* Question */}
                <div className="bg-ivory-dark/60 rounded-xl p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-light">Student Question</span>
                    <p className="text-[14px] text-rich-black mt-1.5 font-medium leading-snug">
                        &ldquo;Calculate the EPV of a whole life assurance with μ&nbsp;=&nbsp;0.04, δ&nbsp;=&nbsp;0.05&rdquo;
                    </p>
                </div>

                {/* Pipeline Steps */}
                <div className="space-y-1.5">
                    {pipelineSteps.map((step, i) => {
                        const Icon = step.icon;
                        const isActive = i === currentStep;
                        const isDone = i < currentStep;
                        const isPending = i > currentStep;

                        return (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0.4 }}
                                animate={{
                                    opacity: isPending ? 0.35 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all duration-300 ${
                                    isActive ? 'bg-gold/8 text-rich-black' :
                                    isDone ? 'text-rich-black' :
                                    'text-muted-light'
                                }`}
                            >
                                {isDone ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : isActive ? (
                                    <Loader2 className="w-4 h-4 text-gold animate-spin shrink-0" />
                                ) : (
                                    <Circle className="w-4 h-4 text-muted-light/50 shrink-0" />
                                )}
                                <span className={`font-medium ${isDone ? 'text-muted-text' : ''}`}>
                                    {step.label}
                                    {isActive && i !== 3 && <span className="animate-cursor ml-0.5">…</span>}
                                    {isDone && i === 3 && " ✓"}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Code + Math Panels */}
                <AnimatePresence>
                    {showPanels && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {/* Code Panel */}
                            <div className="glass-code p-3 overflow-hidden">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Code2 className="w-3 h-3 text-gray-500" />
                                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">SymPy</span>
                                </div>
                                <div className="font-mono text-[9px] leading-[1.6] whitespace-pre">
                                    {codeLines.map((line, i) =>
                                        'break' in line ? (
                                            <br key={i} />
                                        ) : (
                                            <span key={i} className={line.cls}>{line.text}</span>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Math Panel */}
                            <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <FunctionSquare className="w-3 h-3 text-muted-text" />
                                    <span className="text-[9px] font-medium text-muted-text uppercase tracking-wider">Result</span>
                                </div>
                                <div className="space-y-2 text-[12px] text-rich-black">
                                    <div className="font-serif italic text-[11px] leading-relaxed">
                                        <span className="text-muted-text text-[9px] not-italic block mb-1">EPV Formula:</span>
                                        Ā<sub>x</sub> = ∫<sub>0</sub><sup>∞</sup> e<sup>−δt</sup> · <sub>t</sub>p<sub>x</sub> · μ<sub>x+t</sub> dt
                                    </div>
                                    <hr className="border-border-subtle" />
                                    <div className="font-mono">
                                        <span className="text-muted-text text-[9px] block mb-1">Evaluation:</span>
                                        <span className="text-gold-dark font-semibold">μ/(μ+δ) = 0.04/0.09</span>
                                    </div>
                                    <div className="bg-emerald-50 rounded-lg px-2.5 py-1.5 border border-emerald-200">
                                        <span className="text-emerald-700 font-bold text-[13px]">Ā<sub>x</sub> = 0.4444</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Verification Badge */}
                <AnimatePresence>
                    {showBadge && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", damping: 16, stiffness: 200 }}
                            className="flex items-center justify-between"
                        >
                            <span className="badge-verified">
                                <CheckCircle className="w-3.5 h-3.5" /> Verification Passed
                            </span>
                            <span className="text-[9px] text-muted-light italic">
                                Bowers et al., Ch. 4, p. 96
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ── Floating Math Symbols ── */
const mathSymbols = [
    { symbol: "∫", top: "8%", left: "5%", delay: "0s", size: "text-3xl" },
    { symbol: "Σ", top: "20%", right: "8%", delay: "2s", size: "text-2xl" },
    { symbol: "Π", bottom: "25%", left: "3%", delay: "4s", size: "text-xl" },
    { symbol: "∂", top: "65%", right: "3%", delay: "1s", size: "text-2xl" },
    { symbol: "∞", bottom: "10%", right: "12%", delay: "3s", size: "text-xl" },
    { symbol: "λ", top: "45%", left: "8%", delay: "5s", size: "text-lg" },
];

export function Hero() {
    const [searchPrompt, setSearchPrompt] = useState("");

    const popularTags = [
        "Financial Mathematics",
        "Probability (SOA P)",
        "Life Contingencies",
        "Linear Algebra",
        "Differential Equations"
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-[#FAFAFC]">
            {/* Background Soft Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* ── Left: Content ── */}
                <div className="flex-1 max-w-2xl">
                    {/* Owlearn Pill Tag */}
                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 mb-6 shadow-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                        <span className="text-[13px] font-semibold tracking-wide">
                            ✨ AI-Powered Actuarial &amp; Math Platform
                        </span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.2 }}
                        className="text-[42px] md:text-[54px] lg:text-[60px] font-extrabold leading-[1.08] tracking-tight text-slate-900"
                    >
                        Master Math &amp; Actuarial Science with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                            Verified AI Guidance
                        </span>
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.35 }}
                        className="text-[17px] md:text-[18px] text-slate-600 mt-5 leading-relaxed max-w-xl"
                    >
                        Solve complex actuarial models and advanced mathematics step-by-step. Every equation is verified live using our SymPy Symbolic Engine for 100% computational accuracy.
                    </motion.p>

                    {/* Owlearn Search Input Bar */}
                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.45 }}
                        className="mt-8 p-2 bg-white rounded-2xl md:rounded-full border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row items-center gap-2"
                    >
                        <div className="flex items-center gap-3 px-4 py-2 w-full flex-1">
                            <Brain className="w-5 h-5 text-indigo-600 shrink-0" />
                            <input
                                type="text"
                                value={searchPrompt}
                                onChange={(e) => setSearchPrompt(e.target.value)}
                                placeholder="What actuarial topic or math problem do you want to master today?"
                                className="w-full text-[14px] text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                            />
                        </div>
                        <Link
                            href="/login"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] rounded-xl md:rounded-full transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-indigo-300"
                        >
                            Solve Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Topic Tags */}
                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.55 }}
                        className="mt-4 flex items-center gap-2 flex-wrap text-xs text-slate-500"
                    >
                        <span className="font-semibold text-slate-700">Popular:</span>
                        {popularTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchPrompt(tag)}
                                className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-full text-slate-600 transition-colors duration-150 font-medium"
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>

                    {/* Student Avatar Stack & Trust Metrics */}
                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.65 }}
                        className="mt-10 pt-6 border-t border-slate-200/80 flex items-center gap-6"
                    >
                        <div className="flex items-center -space-x-2">
                            <div className="w-9 h-9 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white">KO</div>
                            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white">EA</div>
                            <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white">KA</div>
                            <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white">+14k</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                ★★★★★ <span className="text-slate-800 font-bold ml-1">4.9/5</span>
                            </div>
                            <p className="text-xs text-slate-500">Trusted by 14,200+ Actuarial &amp; Math students</p>
                        </div>
                    </motion.div>
                </div>

                {/* ── Right: Owlearn Dashboard Preview Card ── */}
                <motion.div
                    initial={{ opacity: 0, x: 30, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto relative"
                >
                    {/* Floating Overlay Badge: Exam Readiness */}
                    <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float-gentle">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                            99%
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-900">SOA / IFoA Ready</div>
                            <div className="text-[11px] text-slate-500">Verified SymPy Engine</div>
                        </div>
                    </div>

                    <VerificationDashboard />
                </motion.div>
            </div>
        </section>
    );
}
