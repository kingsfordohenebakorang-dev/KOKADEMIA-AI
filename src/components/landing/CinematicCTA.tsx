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
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
                className="max-w-5xl mx-auto relative overflow-hidden rounded-[32px]"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rich-black via-rich-black to-[#1a1509]" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/30 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/20 rounded-full blur-[100px]" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.42, delay: 0.15, ease }}
                        className="text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-3xl mx-auto"
                    >
                        Learn Mathematics with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">
                            Proof, Not Probability
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.42, delay: 0.3, ease }}
                        className="text-[17px] text-white/60 mt-5 leading-relaxed max-w-xl mx-auto"
                    >
                        The world&apos;s first AI study platform where every mathematical answer
                        is verified before you see it.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.42, delay: 0.45, ease }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold hover:bg-gold-light text-white text-[15px] font-semibold rounded-2xl transition-all duration-200 shadow-[0_4px_20px_rgba(199,154,18,0.4)] hover:shadow-[0_8px_32px_rgba(199,154,18,0.5)] hover:-translate-y-0.5"
                        >
                            Start Learning Free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button className="inline-flex items-center gap-2.5 px-8 py-4 text-[15px] font-semibold text-white/80 hover:text-white rounded-2xl border border-white/[0.15] hover:border-white/[0.3] transition-all duration-200">
                            Book a Demo
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
