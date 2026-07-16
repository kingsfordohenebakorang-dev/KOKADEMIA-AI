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
        <section id="pricing" ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-rich-black leading-[1.1]">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-[17px] text-muted-text mt-4 leading-relaxed">
                        Start free. Upgrade when you&apos;re ready. No surprises.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.42, delay: i * 0.1, ease }}
                            className={`rounded-3xl p-8 flex flex-col relative ${
                                plan.highlighted
                                    ? 'bg-gradient-to-b from-white via-white to-gold/[0.04] border-2 border-gold/30 shadow-[0_8px_40px_rgba(199,154,18,0.12)]'
                                    : 'glass-card-light'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-[0_2px_12px_rgba(199,154,18,0.4)]">
                                        <Sparkles className="w-3 h-3" /> Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className="text-[18px] font-bold text-rich-black">{plan.name}</h3>
                                <p className="text-[13px] text-muted-text mt-1">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-[44px] font-bold text-rich-black tracking-tight">{plan.price}</span>
                                {plan.period && (
                                    <span className="text-[15px] text-muted-text ml-1">{plan.period}</span>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-rich-black/75">
                                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${
                                            plan.highlighted ? 'text-gold' : 'text-emerald-500'
                                        }`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href={plan.name === "Institution" ? "#" : "/login"}
                                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 ${
                                    plan.highlighted
                                        ? 'bg-gold hover:bg-gold-dark text-white shadow-[0_2px_12px_rgba(199,154,18,0.35)] hover:shadow-[0_4px_20px_rgba(199,154,18,0.45)]'
                                        : 'bg-rich-black/[0.06] hover:bg-rich-black/[0.1] text-rich-black'
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
