"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
    TrendingUp, Heart, BarChart3, DollarSign, PieChart, Users,
    Calculator, Award, GraduationCap, BookOpen,
    FunctionSquare, Grid3X3, GitBranch, Sigma, Infinity, Binary,
    LineChart, Lightbulb, Database, Target, ArrowUpRight, Clock, Star
} from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const;

const actuarialCourses = [
    { icon: PieChart, title: "Probability & Survival Models", lessons: "24 Lessons", tag: "SOA Exam P", difficulty: "Intermediate", rating: "4.9", students: "4.2k", progress: 85, color: "bg-indigo-500" },
    { icon: DollarSign, title: "Financial Mathematics & TVM", lessons: "18 Lessons", tag: "SOA Exam FM", difficulty: "Beginner", rating: "4.8", students: "3.8k", progress: 92, color: "bg-purple-500" },
    { icon: Heart, title: "Life Contingencies & Annuities", lessons: "30 Lessons", tag: "SOA Exam FAM", difficulty: "Advanced", rating: "4.95", students: "2.9k", progress: 78, color: "bg-emerald-500" },
    { icon: TrendingUp, title: "Risk Theory & Loss Distributions", lessons: "22 Lessons", tag: "IFoA CS2", difficulty: "Advanced", rating: "4.9", students: "2.1k", progress: 88, color: "bg-amber-500" }
];

const mathCourses = [
    { icon: FunctionSquare, title: "Multivariable Calculus", lessons: "28 Lessons", tag: "Math Major", difficulty: "Intermediate", rating: "4.9", students: "5.1k", progress: 94, color: "bg-blue-500" },
    { icon: Grid3X3, title: "Linear Algebra & Matrices", lessons: "20 Lessons", tag: "Core Math", difficulty: "Intermediate", rating: "4.85", students: "4.6k", progress: 90, color: "bg-indigo-500" },
    { icon: GitBranch, title: "Differential Equations (ODE/PDE)", lessons: "26 Lessons", tag: "Applied Math", difficulty: "Advanced", rating: "4.9", students: "3.2k", progress: 82, color: "bg-purple-500" },
    { icon: Infinity, title: "Real Analysis & Proofs", lessons: "32 Lessons", tag: "Pure Math", difficulty: "Advanced", rating: "4.95", students: "1.9k", progress: 75, color: "bg-rose-500" }
];

export function CoverageSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" ref={ref} className="py-24 bg-[#FAFAFC] px-6 lg:px-8 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>Syllabus Coverage</span>
                    </div>
                    <h2 className="text-[34px] md:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight">
                        Tailored Courses for Actuarial &amp; Math Majors
                    </h2>
                    <p className="text-[17px] text-slate-600 mt-4 leading-relaxed">
                        Master professional exam syllabi (SOA / IFoA) and core university mathematics with step-by-step verified solutions.
                    </p>
                </motion.div>

                {/* Course Category 1: Actuarial Science */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Actuarial Science Modules</h3>
                            <p className="text-sm text-slate-500">Professional Exam Track (SOA / IFoA)</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                            4 Verified Modules
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {actuarialCourses.map((course, i) => {
                            const Icon = course.icon;
                            return (
                                <motion.div
                                    key={course.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: i * 0.1, ease }}
                                    className="card-owlearn p-6 flex flex-col justify-between group cursor-pointer"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-2xl ${course.color} text-white flex items-center justify-center shadow-md`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                                                {course.tag}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
                                            {course.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                                            <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5" /> {course.lessons}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-current" /> {course.rating}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                                            <span>Completion Accuracy</span>
                                            <span className="font-bold text-slate-900">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Course Category 2: Mathematical Sciences */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Mathematical Sciences Track</h3>
                            <p className="text-sm text-slate-500">Core &amp; Advanced University Mathematics</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                            4 Verified Tracks
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mathCourses.map((course, i) => {
                            const Icon = course.icon;
                            return (
                                <motion.div
                                    key={course.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease }}
                                    className="card-owlearn p-6 flex flex-col justify-between group cursor-pointer"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-2xl ${course.color} text-white flex items-center justify-center shadow-md`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                                                {course.tag}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
                                            {course.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                                            <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5" /> {course.lessons}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-current" /> {course.rating}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                                            <span>Completion Accuracy</span>
                                            <span className="font-bold text-slate-900">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
