"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Shield } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Subtle background glow — not overpowering */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-indigo-600/[0.04] rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[300px] bg-purple-600/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-16 pt-14">

                {/* ─── Left: Text Content ─── */}
                <div className="flex-1 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-[2.75rem] md:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-gray-100">
                            Verified Solutions for Actuarial &amp; Mathematical Sciences
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-base text-gray-500 mt-6 leading-relaxed max-w-md"
                    >
                        Not another AI that guesses answers. KOK TRUST AI translates
                        every mathematical query into symbolic code, executes it, and
                        verifies the result — before showing you anything.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-8 flex items-center gap-4"
                    >
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold rounded-lg transition-all"
                        >
                            Start Studying <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                            href="#how-it-works"
                            className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            See how it works →
                        </a>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-10 flex items-center gap-6 text-[11px] text-gray-600"
                    >
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-indigo-500/60" /> Symbolically Verified</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-indigo-500/60" /> Actuarial &amp; Math</span>
                        <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-indigo-500/60" /> SOA / IFoA Aligned</span>
                    </motion.div>
                </div>

                {/* ─── Right: System Preview (subtle, precise) ─── */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    className="flex-1 w-full max-w-md"
                >
                    <div className="bg-[#0c0c14] border border-white/[0.05] rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                        {/* Header bar */}
                        <div className="h-9 flex items-center gap-2 px-4 border-b border-white/[0.04] bg-[#0a0a10]">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-gray-700" />
                                <div className="w-2 h-2 rounded-full bg-gray-700" />
                                <div className="w-2 h-2 rounded-full bg-gray-700" />
                            </div>
                            <span className="text-[9px] text-gray-700 font-mono ml-2">KOK TRUST AI — Tutor Workspace</span>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">
                            {/* Query */}
                            <div>
                                <div className="text-[9px] text-gray-700 uppercase tracking-widest mb-1.5">Query</div>
                                <p className="text-[12px] text-gray-400 leading-relaxed">
                                    Evaluate <span className="text-gray-300 font-mono">∫₀^∞ x² e^(-x) dx</span> and verify using the Gamma function.
                                </p>
                            </div>

                            {/* Separator */}
                            <div className="border-t border-white/[0.03]" />

                            {/* Solution */}
                            <div>
                                <div className="text-[9px] text-gray-700 uppercase tracking-widest mb-2">Solution</div>
                                <div className="text-[12px] text-gray-400 leading-relaxed space-y-2">
                                    <p className="text-gray-500">Using the Gamma function identity:</p>
                                    <div className="bg-[#08080c] border border-white/[0.03] rounded-lg px-4 py-3 text-center">
                                        <span className="text-[14px] text-gray-200 font-mono">Γ(3) = ∫₀^∞ x² e^(-x) dx = 2! = 2</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Layer Badge */}
                            <div className="flex items-center gap-2 pt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-emerald-500/80 font-medium">Verified via symbolic engine</span>
                                <span className="text-[10px] text-gray-700 ml-auto font-mono">98% confidence</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
