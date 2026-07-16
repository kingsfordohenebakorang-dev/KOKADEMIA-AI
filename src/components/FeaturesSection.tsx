"use client"
import { motion } from "framer-motion";
import { MessageSquare, Code, CheckCircle } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: MessageSquare,
        title: "Ask a Question",
        description: "Type any actuarial or mathematical question in natural language or LaTeX. The system understands the full range — from survival models to differential equations.",
    },
    {
        number: "02",
        icon: Code,
        title: "Symbolic Translation",
        description: "Your query is translated into executable symbolic code. The system doesn't guess — it constructs the mathematical logic programmatically.",
    },
    {
        number: "03",
        icon: CheckCircle,
        title: "Verified Result",
        description: "The computation engine executes the code, verifies the answer, and returns a trust score. You see the solution, the proof, and the source — all transparent.",
    },
];

export function FeaturesSection() {
    return (
        <section id="how-it-works" className="relative py-32 px-8">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-3">
                        How It Works
                    </h2>
                    <p className="text-sm text-gray-600 max-w-lg leading-relaxed">
                        Three steps separate Kokademia from every other study tool.
                        No magic — just systematic verification.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="space-y-16">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-8 items-start"
                        >
                            {/* Number + Icon */}
                            <div className="flex-shrink-0 w-14 flex flex-col items-center gap-3">
                                <span className="text-[10px] text-gray-700 font-mono">{step.number}</span>
                                <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                                    <step.icon className="w-4 h-4 text-indigo-500/70" />
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="w-px h-12 bg-white/[0.04]" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="pt-5">
                                <h3 className="text-[15px] font-semibold text-gray-300 mb-2">{step.title}</h3>
                                <p className="text-[13px] text-gray-600 leading-relaxed max-w-md">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-8 border-t border-white/[0.04]"
                >
                    <p className="text-[12px] text-gray-700 max-w-md leading-relaxed">
                        Every solution you see has been computed, not generated. This is
                        the difference between an AI chatbot and an academic verification system.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
