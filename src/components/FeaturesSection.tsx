"use client"
import { motion } from "framer-motion";
import { Zap, BookOpen, GraduationCap, BarChart3, Lock, MessageSquare, Users, BrainCircuit, ShieldCheck, Calculator } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: ShieldCheck,
        title: "Trust Layer (Neuro-Symbolic)",
        description: "LLM never solves math directly. Every answer is verified through SymPy code generation, sandbox execution, and source citation.",
        link: "/chat",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20"
    },
    {
        icon: Calculator,
        title: "Actuarial + Math Sciences",
        description: "From survival models and annuities to multivariable calculus, linear algebra, and differential equations — all symbolically verified.",
        link: "/chat",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20"
    },
    {
        icon: Users,
        title: "Lecturer Layer",
        description: "Verified syllabus uploads, authenticated mock exams, and aggregated cohort analytics for department heads.",
        link: "/dashboard",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20"
    },
    {
        icon: BarChart3,
        title: "Institutional Dashboard",
        description: "Cohort-level metrics, weakness heatmaps, and exportable reports for semester review meetings.",
        link: "/dashboard",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: BrainCircuit,
        title: "Predictive Analytics",
        description: "AI-powered exam readiness scores predict your chance of achieving an A based on usage trends and topic mastery.",
        link: "/dashboard",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        icon: GraduationCap,
        title: "Timed Exam Simulation",
        description: "Realistic exam conditions with countdown timers, controlled navigation, and auto-submission for both actuarial and math exams.",
        link: "/exams",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    {
        icon: Zap,
        title: "Retention & Offline Tools",
        description: "PWA with offline flashcards, spaced repetition nudges, notebook mode, and streak systems to build study habits.",
        link: "/study",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20"
    },
    {
        icon: MessageSquare,
        title: "Growth & Community",
        description: "Campus ambassador programs, peer benchmarking, collaborative knowledge bases, and referral incentives.",
        link: "/register",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20"
    }
];

export function FeaturesSection() {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                        Complete Academic Toolkit
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Everything you need to master actuarial science and mathematical disciplines — from intelligent tutoring to verified symbolic solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <Link href={feature.link} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className={`h-full p-6 rounded-2xl border ${feature.border} bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-sm cursor-pointer`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

