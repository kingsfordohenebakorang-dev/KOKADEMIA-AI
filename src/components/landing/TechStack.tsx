"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const ease = [0.22, 1, 0.36, 1] as const;

const technologies = [
    { name: "Next.js", desc: "React Framework", emoji: "▲" },
    { name: "TypeScript", desc: "Type Safety", emoji: "TS" },
    { name: "Tailwind CSS", desc: "Utility Styling", emoji: "🎨" },
    { name: "Framer Motion", desc: "Animations", emoji: "✨" },
    { name: "Python", desc: "Backend Engine", emoji: "🐍" },
    { name: "SymPy", desc: "Symbolic Math", emoji: "∑" },
    { name: "KaTeX", desc: "Math Rendering", emoji: "∫" },
    { name: "Pinecone", desc: "Vector Search", emoji: "🌲" },
    { name: "PostgreSQL", desc: "Database", emoji: "🐘" },
    { name: "Redis", desc: "Cache Layer", emoji: "⚡" },
    { name: "Docker", desc: "Containers", emoji: "🐳" },
    { name: "OpenAI", desc: "LLM Provider", emoji: "🤖" },
];

export function TechStack() {
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
                        Built With Modern Technology
                    </h2>
                    <p className="text-[17px] text-muted-text mt-4 leading-relaxed">
                        Enterprise-grade infrastructure powering every verified calculation.
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.35, delay: i * 0.04, ease }}
                            className="glass-card-light p-5 flex flex-col items-center text-center group cursor-default"
                        >
                            <span className="text-2xl mb-2.5 group-hover:scale-110 transition-transform duration-200">
                                {tech.emoji}
                            </span>
                            <span className="text-[13px] font-semibold text-rich-black">
                                {tech.name}
                            </span>
                            <span className="text-[11px] text-muted-text mt-0.5">
                                {tech.desc}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
