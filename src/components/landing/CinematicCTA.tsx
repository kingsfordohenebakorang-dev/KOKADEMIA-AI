"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const ease = [0.22, 1, 0.36, 1] as const;

export function CinematicCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-[#FAFAFC] px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
                className="max-w-5xl mx-auto relative overflow-hidden rounded-[36px] shadow-2xl shadow-indigo-300/40"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-800" />
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-purple-400 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-indigo-300 rounded-full blur-[100px]" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-6">
                        <span>✨ Start Your Verified Learning Journey</span>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.42, delay: 0.15, ease }}
                        className="text-[34px] md:text-[44px] lg:text-[50px] font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto"
                    >
                        Ready to Ace Your Actuarial &amp; Math Exams?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.42, delay: 0.3, ease }}
                        className="text-[17px] text-indigo-100 mt-5 leading-relaxed max-w-xl mx-auto font-medium"
                    >
                        Join 14,000+ students mastering actuarial models and advanced mathematics with 100% verified symbolic AI.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.42, delay: 0.45, ease }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-100 text-indigo-700 text-[15px] font-bold rounded-full transition-all duration-200 shadow-xl hover:-translate-y-0.5"
                        >
                            Start Learning Free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2.5 px-8 py-4 text-[15px] font-bold text-white hover:bg-white/10 rounded-full border border-white/30 transition-all duration-200"
                        >
                            View All Courses
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
