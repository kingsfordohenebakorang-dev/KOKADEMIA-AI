"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
    Shield, FunctionSquare, MessageSquare, Timer,
    LayoutDashboard, NotebookPen, Layers, WifiOff
} from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
    {
        icon: Shield,
        title: "Neuro-Symbolic Trust Layer",
        description: "Every answer verified through executable symbolic mathematics",
        span: "md:col-span-2 md:row-span-2",
        accent: true,
    },
    {
        icon: FunctionSquare,
        title: "Symbolic Mathematics",
        description: "KaTeX-rendered proofs with SymPy verification",
        span: "md:col-span-1",
    },
    {
        icon: MessageSquare,
        title: "AI Study Companion",
        description: "RAG-powered tutoring with source citations",
        span: "md:col-span-1",
    },
    {
        icon: Timer,
        title: "Exam Engine",
        description: "Timed, adaptive exams with verified step-by-step solutions",
        span: "md:col-span-1",
    },
    {
        icon: LayoutDashboard,
        title: "Institutional Dashboard",
        description: "Faculty analytics, student progress, cohort insights",
        span: "md:col-span-1",
    },
    {
        icon: NotebookPen,
        title: "Notebook Mode",
        description: "LaTeX-native notes with inline verified computations",
        span: "md:col-span-1",
    },
    {
        icon: Layers,
        title: "Flashcards",
        description: "Spaced repetition with mathematical content",
        span: "md:col-span-1",
    },
    {
        icon: WifiOff,
        title: "Offline Learning",
        description: "Download courses and study without connectivity",
        span: "md:col-span-2",
    },
];

export function BentoGrid() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-rich-black leading-[1.1]">
                        Everything You Need to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-light">
                            Master Mathematics
                        </span>
                    </h2>
                    <p className="text-[17px] text-muted-text mt-4 leading-relaxed">
                        A complete learning ecosystem designed for actuarial and mathematical sciences students.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.42, delay: i * 0.06, ease }}
                                className={`glass-card-light p-6 lg:p-8 group ${feature.span} ${
                                    feature.accent
                                        ? 'bg-gradient-to-br from-white/70 via-white/60 to-gold/[0.06]'
                                        : ''
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                                    feature.accent
                                        ? 'bg-gold/[0.12]'
                                        : 'bg-ivory-dark/80'
                                }`}>
                                    <Icon className={`w-5 h-5 ${
                                        feature.accent ? 'text-gold' : 'text-muted-text group-hover:text-gold'
                                    } transition-colors duration-300`} />
                                </div>

                                <h3 className={`font-semibold text-rich-black mb-1.5 ${
                                    feature.accent ? 'text-[18px] lg:text-[20px]' : 'text-[15px]'
                                }`}>
                                    {feature.title}
                                </h3>
                                <p className={`text-muted-text leading-relaxed ${
                                    feature.accent ? 'text-[15px]' : 'text-[13px]'
                                }`}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
