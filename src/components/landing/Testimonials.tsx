"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Quote } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
    {
        quote: "Kokademia changed how I study for SOA exams. Seeing the SymPy code and verification proof alongside the answer gives me confidence no other platform provides.",
        name: "Aisha K.",
        role: "Actuarial Science Student, University of Waterloo",
        initials: "AK",
    },
    {
        quote: "As a lecturer, I finally trust an AI tool enough to recommend it to my students. The verification layer is exactly what mathematical education needs.",
        name: "Prof. David Chen",
        role: "Associate Professor, Mathematics, LSE",
        initials: "DC",
    },
    {
        quote: "I passed my IFoA CT1 exam using Kokademia's practice engine. The step-by-step verified solutions are like having a tutor who shows all the working — and never makes mistakes.",
        name: "James O.",
        role: "IFoA Student, London",
        initials: "JO",
    },
];

export function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, ease }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-rich-black leading-[1.1]">
                        Trusted by Students &amp; Educators
                    </h2>
                    <p className="text-[17px] text-muted-text mt-4 leading-relaxed">
                        From exam preparation to university lectures — Kokademia earns trust through transparency.
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.42, delay: i * 0.1, ease }}
                            className="glass-card-light p-7 flex flex-col"
                        >
                            <Quote className="w-8 h-8 text-gold/30 mb-4" />

                            <p className="text-[14px] text-rich-black/80 leading-[1.7] flex-1 italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border-subtle">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/[0.08] flex items-center justify-center">
                                    <span className="text-[12px] font-bold text-gold-dark">{t.initials}</span>
                                </div>
                                <div>
                                    <span className="text-[13px] font-semibold text-rich-black block">{t.name}</span>
                                    <span className="text-[11px] text-muted-text">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
