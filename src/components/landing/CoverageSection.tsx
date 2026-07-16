"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
    TrendingUp, Heart, BarChart3, DollarSign, PieChart, Users,
    Calculator, Award, GraduationCap, BookOpen,
    FunctionSquare, Grid3X3, GitBranch, Sigma, Infinity, Binary,
    LineChart, Lightbulb, Database, Target
} from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const;

const actuarialTopics = [
    { icon: PieChart, label: "Probability & Statistics" },
    { icon: Heart, label: "Survival Models" },
    { icon: TrendingUp, label: "Risk Theory" },
    { icon: DollarSign, label: "Financial Mathematics" },
    { icon: BarChart3, label: "Loss Distributions" },
    { icon: Users, label: "Life Contingencies" },
    { icon: Calculator, label: "Premium Calculation" },
    { icon: Lightbulb, label: "Credibility Theory" },
    { icon: Award, label: "SOA Exam Preparation" },
    { icon: GraduationCap, label: "IFoA Exam Preparation" },
];

const mathTopics = [
    { icon: FunctionSquare, label: "Calculus" },
    { icon: Grid3X3, label: "Linear Algebra" },
    { icon: GitBranch, label: "ODE / PDE" },
    { icon: Infinity, label: "Real Analysis" },
    { icon: BookOpen, label: "Mathematical Proofs" },
    { icon: Sigma, label: "Probability Theory" },
    { icon: BarChart3, label: "Statistics" },
    { icon: Binary, label: "Numerical Methods" },
    { icon: Target, label: "Optimization" },
    { icon: LineChart, label: "Multivariable Calculus" },
    { icon: Database, label: "Data Science" },
    { icon: Calculator, label: "Matrix Theory" },
];

function TopicCard({
    title, subtitle, topics, delay, gradient
}: {
    title: string;
    subtitle: string;
    topics: { icon: React.ElementType; label: string }[];
    delay: number;
    gradient: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease }}
            className="glass-card-light p-8 lg:p-10 group"
        >
            {/* Card Header */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${gradient} mb-5`}>
                <GraduationCap className="w-4 h-4" />
                <span className="text-[12px] font-bold uppercase tracking-wider">{subtitle}</span>
            </div>

            <h3 className="text-[22px] lg:text-[24px] font-bold text-rich-black tracking-[-0.02em] mb-6">
                {title}
            </h3>

            {/* Topic Grid */}
            <div className="grid grid-cols-2 gap-3">
                {topics.map((topic, i) => {
                    const Icon = topic.icon;
                    return (
                        <motion.div
                            key={topic.label}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.3, delay: delay + i * 0.04, ease }}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-ivory-dark/60 transition-colors duration-200 group/item"
                        >
                            <div className="w-8 h-8 rounded-lg bg-ivory-dark/80 flex items-center justify-center shrink-0 group-hover/item:bg-gold/[0.1] transition-colors duration-200">
                                <Icon className="w-4 h-4 text-muted-text group-hover/item:text-gold transition-colors duration-200" />
                            </div>
                            <span className="text-[13px] font-medium text-rich-black/80">
                                {topic.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export function CoverageSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="coverage" ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-rich-black leading-[1.1]">
                        Comprehensive Academic Coverage
                    </h2>
                    <p className="text-[17px] text-muted-text mt-4 leading-relaxed">
                        From SOA exam prep to advanced mathematical proofs — every topic
                        powered by verified symbolic computation.
                    </p>
                </motion.div>

                {/* Two Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <TopicCard
                        title="Actuarial Science"
                        subtitle="Professional Exams"
                        topics={actuarialTopics}
                        delay={0.1}
                        gradient="bg-gold/[0.08] text-gold-dark"
                    />
                    <TopicCard
                        title="Mathematical Sciences"
                        subtitle="University Level"
                        topics={mathTopics}
                        delay={0.2}
                        gradient="bg-blue-50 text-blue-700"
                    />
                </div>
            </div>
        </section>
    );
}
