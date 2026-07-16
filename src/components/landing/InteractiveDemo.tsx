"use client"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { CheckCircle, Circle, Loader2, Code2, FunctionSquare, ExternalLink } from "lucide-react"
import katex from "katex"

const ease = [0.22, 1, 0.36, 1] as const;

const demoSteps = [
    { label: "Understanding...", duration: 1400 },
    { label: "Generating SymPy...", duration: 1800 },
    { label: "Running Secure Sandbox...", duration: 2200 },
    { label: "Verification Passed ✓", duration: 1000 },
    { label: "Rendering Mathematical Proof...", duration: 1200 },
    { label: "Final Answer Generated", duration: 1500 },
];

const pythonCode = `from sympy import symbols, exp, integrate, oo

# Define actuarial parameters
t = symbols('t', positive=True)
mu = 0.04    # constant force of mortality
delta = 0.05 # force of interest

# EPV of continuous whole life assurance
# Ā_x = ∫₀^∞ e^{-δt} · ₜpₓ · μ_{x+t} dt
# With constant forces: ₜpₓ = e^{-μt}

integrand = exp(-(delta + mu) * t) * mu
A_x = integrate(integrand, (t, 0, oo))

print(f"Ā_x = μ/(μ+δ) = {mu}/{mu+delta}")
print(f"Ā_x = {float(A_x):.4f}")

# Verification: analytic check
assert abs(float(A_x) - mu/(mu+delta)) < 1e-10
print("✓ Symbolic result matches analytic formula")`;

function renderKaTeX(latex: string): string {
    try {
        return katex.renderToString(latex, { displayMode: true, throwOnError: false });
    } catch {
        return latex;
    }
}

function CodeBlock({ code, visible }: { code: string; visible: boolean }) {
    if (!visible) return null;

    const lines = code.split('\n');

    function highlightLine(line: string) {
        // Simple syntax highlighting
        return line
            .replace(/(from|import|def|return|print|assert|if|for|in|as)\b/g, '<span class="text-purple-400 font-medium">$1</span>')
            .replace(/(symbols|exp|integrate|oo|abs|float|True|False)\b/g, '<span class="text-yellow-300">$1</span>')
            .replace(/(#.*$)/gm, '<span class="text-emerald-400/70 italic">$1</span>')
            .replace(/(".*?"|'.*?'|f".*?")/g, '<span class="text-green-300">$1</span>')
            .replace(/(\d+\.?\d*)/g, '<span class="text-orange-300">$1</span>')
            .replace(/(mu|delta|A_x|integrand|t)\b/g, '<span class="text-blue-300">$1</span>');
    }

    return (
        <div className="font-mono text-[11px] lg:text-[12px] leading-[1.7] overflow-x-auto">
            {lines.map((line, i) => (
                <div key={i} className="flex">
                    <span className="w-8 text-right pr-3 text-gray-600 select-none shrink-0 text-[10px]">
                        {i + 1}
                    </span>
                    <span
                        className="text-gray-300"
                        dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }}
                    />
                </div>
            ))}
        </div>
    );
}

function MathPanel({ visible }: { visible: boolean }) {
    if (!visible) return null;

    const formulas = [
        {
            label: "EPV — Continuous Whole Life Assurance",
            latex: "\\bar{A}_x = \\int_0^{\\infty} e^{-\\delta t} \\cdot {}_tp_x \\cdot \\mu_{x+t} \\, dt",
        },
        {
            label: "With constant forces of mortality and interest",
            latex: "\\bar{A}_x = \\frac{\\mu}{\\mu + \\delta} = \\frac{0.04}{0.04 + 0.05} = \\frac{4}{9}",
        },
    ];

    return (
        <div className="space-y-5">
            {formulas.map((f, i) => (
                <div key={i}>
                    <span className="text-[11px] font-medium text-muted-text block mb-2">
                        {f.label}
                    </span>
                    <div
                        className="demo-math bg-ivory-dark/40 rounded-xl px-4 py-3 border border-border-subtle overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: renderKaTeX(f.latex) }}
                    />
                </div>
            ))}

            {/* Final Answer */}
            <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-600 block mb-1">VERIFIED RESULT</span>
                <div
                    className="demo-math"
                    dangerouslySetInnerHTML={{
                        __html: renderKaTeX("\\boxed{\\bar{A}_x \\approx 0.4444}")
                    }}
                />
            </div>
        </div>
    );
}

export function InteractiveDemo() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [currentStep, setCurrentStep] = useState(-1);
    const [showPanels, setShowPanels] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const runDemo = useCallback(() => {
        if (isRunning) return;
        setIsRunning(true);
        setCurrentStep(-1);
        setShowPanels(false);

        let delay = 600;
        demoSteps.forEach((step, i) => {
            setTimeout(() => setCurrentStep(i), delay);
            delay += step.duration;
        });

        setTimeout(() => {
            setShowPanels(true);
            setIsRunning(false);
        }, delay);
    }, [isRunning]);

    useEffect(() => {
        if (isInView && currentStep === -1) {
            const timer = setTimeout(runDemo, 800);
            return () => clearTimeout(timer);
        }
    }, [isInView, currentStep, runDemo]);

    return (
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8 bg-ivory-dark/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-rich-black leading-[1.1]">
                        See It In Action
                    </h2>
                    <p className="text-[17px] text-muted-text mt-4 leading-relaxed">
                        Watch a real actuarial problem get solved, verified, and rendered — all in real time.
                    </p>
                </motion.div>

                {/* Demo Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15, ease }}
                    className="glass-card-light overflow-hidden max-w-5xl mx-auto"
                    style={{ borderRadius: 24 }}
                >
                    {/* Demo Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                                <div className="w-3 h-3 rounded-full bg-green-400/50" />
                            </div>
                            <span className="text-[12px] font-medium text-muted-text">Interactive Verification Demo</span>
                        </div>
                        <button
                            onClick={runDemo}
                            disabled={isRunning}
                            className="px-3 py-1.5 text-[12px] font-semibold text-gold-dark bg-gold/[0.08] hover:bg-gold/[0.15] rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isRunning ? "Running..." : "▶ Run Again"}
                        </button>
                    </div>

                    {/* Question Bar */}
                    <div className="px-6 py-4 bg-ivory-dark/40 border-b border-border-subtle">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-light">Question</span>
                        <p className="text-[15px] text-rich-black font-medium mt-1">
                            Calculate the EPV of a continuous whole life assurance for a life aged x,
                            given μ = 0.04 and δ = 0.05.
                        </p>
                    </div>

                    {/* Pipeline Progress */}
                    <div className="px-6 py-4 border-b border-border-subtle">
                        <div className="flex flex-wrap gap-2">
                            {demoSteps.map((step, i) => {
                                const isDone = i < currentStep;
                                const isActive = i === currentStep;
                                const isPending = i > currentStep;
                                return (
                                    <div
                                        key={step.label}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 ${
                                            isDone ? 'bg-emerald-50 text-emerald-700' :
                                            isActive ? 'bg-gold/[0.1] text-gold-dark' :
                                            'bg-ivory-dark/60 text-muted-light'
                                        }`}
                                    >
                                        {isDone ? (
                                            <CheckCircle className="w-3 h-3" />
                                        ) : isActive ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <Circle className="w-3 h-3 opacity-40" />
                                        )}
                                        {step.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Code + Math Split View */}
                    <AnimatePresence>
                        {showPanels && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.5, ease }}
                            >
                                <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
                                    {/* Code Panel */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Code2 className="w-4 h-4 text-muted-text" />
                                            <span className="text-[12px] font-semibold text-muted-text uppercase tracking-wider">
                                                Generated SymPy Code
                                            </span>
                                        </div>
                                        <div className="glass-code p-4 overflow-auto max-h-[380px]">
                                            <CodeBlock code={pythonCode} visible={true} />
                                        </div>
                                    </div>

                                    {/* Math Panel */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FunctionSquare className="w-4 h-4 text-muted-text" />
                                            <span className="text-[12px] font-semibold text-muted-text uppercase tracking-wider">
                                                Verified Mathematical Proof
                                            </span>
                                        </div>
                                        <MathPanel visible={true} />
                                    </div>
                                </div>

                                {/* Verification Footer */}
                                <div className="px-6 py-4 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="badge-verified">
                                            <CheckCircle className="w-3.5 h-3.5" /> Verification Passed
                                        </span>
                                        <span className="text-[11px] text-emerald-600">
                                            Symbolic ≡ Analytic • Δ &lt; 10⁻¹⁰
                                        </span>
                                    </div>
                                    <a href="#" className="inline-flex items-center gap-1 text-[11px] text-muted-text hover:text-gold-dark transition-colors">
                                        <ExternalLink className="w-3 h-3" />
                                        Bowers et al., <em>Actuarial Mathematics</em>, Ch. 4, p. 96
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
