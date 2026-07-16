"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MessageSquare, Brain, Code2, Shield, CheckCircle, BookOpen } from "lucide-react"

const steps = [
    {
        icon: MessageSquare,
        label: "Student Question",
        description: "Natural language math or actuarial query",
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        icon: Brain,
        label: "Intent Understanding",
        description: "Domain classification & intent parsing",
        color: "text-violet-600",
        bg: "bg-violet-50",
    },
    {
        icon: Code2,
        label: "Code Generation",
        description: "Python + SymPy symbolic code",
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    {
        icon: Shield,
        label: "Sandbox Execution",
        description: "Secure, isolated, auditable runtime",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        icon: CheckCircle,
        label: "Verified Answer",
        description: "Mathematically proven result",
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        icon: BookOpen,
        label: "Source Citation",
        description: "Page reference & provenance",
        color: "text-gold-dark",
        bg: "bg-gold/[0.08]",
    },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function TrustLayerSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="how-it-works" ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/[0.08] border border-gold/[0.12] text-[12px] font-semibold text-gold-dark tracking-wide mb-5">
                        <Shield className="w-3.5 h-3.5" />
                        Neuro-Symbolic Trust Layer
                    </span>
                    <h2 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold tracking-[-0.03em] text-rich-black leading-[1.1]">
                        The First AI That Doesn&apos;t{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-light">
                            Guess Mathematics
                        </span>
                    </h2>
                    <p className="text-[17px] text-muted-text mt-5 leading-relaxed">
                        LLMs propose — executable symbolic mathematics verifies.
                        Every answer passes through six stages of verification before reaching you.
                    </p>
                </motion.div>

                {/* Workflow Steps — Horizontal on desktop, vertical on mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0, y: 16 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.42, delay: i * 0.1, ease }}
                                className="relative group"
                            >
                                <div className="glass-card-light p-5 h-full flex flex-col items-center text-center">
                                    {/* Step Number */}
                                    <div className="absolute -top-2.5 left-4 bg-ivory px-2 py-0.5 rounded-full">
                                        <span className="text-[10px] font-bold text-muted-light">{String(i + 1).padStart(2, '0')}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-11 h-11 rounded-xl ${step.bg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                                        <Icon className={`w-5 h-5 ${step.color}`} />
                                    </div>

                                    {/* Label */}
                                    <h3 className="text-[13px] font-semibold text-rich-black mb-1">
                                        {step.label}
                                    </h3>
                                    <p className="text-[11px] text-muted-text leading-snug">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Connector Arrow (hidden on last + mobile) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-2 z-10 -translate-y-1/2">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={isInView ? { scaleX: 1 } : {}}
                                            transition={{ duration: 0.3, delay: i * 0.1 + 0.3, ease }}
                                            className="w-4 h-px bg-gradient-to-r from-border-subtle to-gold/30 origin-left"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
