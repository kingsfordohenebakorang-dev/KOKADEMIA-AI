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
        <section id="how-it-works" ref={ref} className="py-24 bg-[#FAFAFC] px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
                        <span>🚀 Intelligent Learning Platform</span>
                    </div>
                    <h2 className="text-[34px] md:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight">
                        Built For Deep Understanding &amp; High Accuracy
                    </h2>
                    <p className="text-[17px] text-slate-600 mt-4 leading-relaxed">
                        A modern learning ecosystem engineered specifically for actuarial &amp; mathematical sciences.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.42, delay: i * 0.06, ease }}
                                className={`card-owlearn p-8 group ${feature.span} ${
                                    feature.accent
                                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
                                        : 'bg-white'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                                    feature.accent
                                        ? 'bg-white/10 text-white border border-white/20'
                                        : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                                }`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className={`font-bold mb-2 ${
                                    feature.accent ? 'text-2xl text-white' : 'text-lg text-slate-900'
                                }`}>
                                    {feature.title}
                                </h3>
                                <p className={`leading-relaxed ${
                                    feature.accent ? 'text-indigo-100 text-base' : 'text-slate-600 text-sm'
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
