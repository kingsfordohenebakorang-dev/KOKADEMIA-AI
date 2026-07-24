"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const ease = [0.22, 1, 0.36, 1] as const;

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Get started with verified mathematics",
        features: [
            "10 verified questions / day",
            "Basic symbolic verification",
            "KaTeX-rendered solutions",
            "Community support",
            "SOA Exam P practice set",
        ],
        cta: "Start Free",
        highlighted: false,
    },
    {
        name: "Student Pro",
        price: "$12",
        period: "/month",
        description: "Unlimited verified learning for serious students",
        features: [
            "Unlimited verified questions",
            "Full exam engine (timed, adaptive)",
            "Advanced analytics & progress tracking",
            "Notebook mode with LaTeX export",
            "Flashcard generation",
            "All SOA & IFoA exam sets",
            "Priority AI response queue",
            "Offline mode",
        ],
        cta: "Start Pro Trial",
        highlighted: true,
    },
    {
        name: "Institution",
        price: "Custom",
        period: "",
        description: "Deploy Kokademia for your department",
        features: [
            "Everything in Student Pro",
            "Faculty dashboard & analytics",
            "Student cohort management",
            "Custom exam creation",
            "LMS integration (Moodle, Canvas)",
            "On-premise deployment option",
            "Dedicated account manager",
            "SSO & compliance controls",
        ],
        cta: "Book a Demo",
        highlighted: false,
    },
];

export function PricingSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pricing" ref={ref} className="py-24 bg-[#FAFAFC] px-6 lg:px-8 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
                        <span>💎 Flexible Plans</span>
                    </div>
                    <h2 className="text-[34px] md:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-[17px] text-slate-600 mt-4 leading-relaxed">
                        Start free. Upgrade when you&apos;re ready. Zero hidden fees.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.42, delay: i * 0.1, ease }}
                            className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                                plan.highlighted
                                    ? 'bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-xl shadow-indigo-200 scale-105 z-10 border border-indigo-500'
                                    : 'card-owlearn bg-white text-slate-900'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
                                        <Sparkles className="w-3.5 h-3.5" /> Most Popular
                                    </span>
                                </div>
                            )}

                            <div>
                                {/* Plan Header */}
                                <div className="mb-6">
                                    <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                                    <p className={`text-xs mt-1 leading-relaxed ${plan.highlighted ? 'text-indigo-100' : 'text-slate-500'}`}>{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6 pb-6 border-b border-slate-100/20">
                                    <span className={`text-5xl font-extrabold tracking-tight ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                                    {plan.period && (
                                        <span className={`text-sm ml-1.5 ${plan.highlighted ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.period}</span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className={`flex items-center gap-3 text-xs font-semibold ${
                                            plan.highlighted ? 'text-indigo-50' : 'text-slate-700'
                                        }`}>
                                            <Check className={`w-4 h-4 shrink-0 ${
                                                plan.highlighted ? 'text-amber-300' : 'text-emerald-500'
                                            }`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <Link
                                href={plan.name === "Institution" ? "#" : "/login"}
                                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold transition-all duration-200 ${
                                    plan.highlighted
                                        ? 'bg-white hover:bg-slate-100 text-indigo-700 shadow-md'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                                }`}
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
