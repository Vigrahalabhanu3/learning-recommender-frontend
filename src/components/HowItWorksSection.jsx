import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
    const steps = [
        { id: 1, title: 'You Enter Your Profile', icon: '📝', desc: 'Describe your goals, experience, and interests in natural language.' },
        { id: 2, title: 'Text Preprocessing', icon: '⚙️', desc: 'Our engine cleans, tokenizes, and prepares your input for neural analysis.' },
        { id: 3, title: 'DistilBERT Analysis', icon: '🧠', desc: 'A fine-tuned transformer predicts your learning level with extreme precision.' },
        { id: 4, title: 'Semantic Embedding', icon: '🔤', desc: 'Your profile is converted into a 768-dimensional mathematical vector.' },
        { id: 5, title: 'FAISS Vector Search', icon: '🔍', desc: 'Sub-millisecond similarity search across 888 curated courses.' },
        { id: 6, title: 'Results Delivered', icon: '🎯', desc: 'Perfectly matched educational pathways are generated for you.' },
    ];

    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-6"
                    >
                        How The AI Works
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent-primary)] to-transparent mx-auto rounded-full" />
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--border-color)] to-transparent" />

                    <div className="space-y-24">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative`}
                            >
                                {/* Central Badge */}
                                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-primary)] flex items-center justify-center z-10 shadow-[0_0_15px_var(--accent-glow)]">
                                    <span className="text-[10px] md:text-xs font-black text-[var(--text-primary)]">{step.id}</span>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-3xl hover:border-[var(--accent-primary)]/50 transition-colors shadow-2xl group">
                                        <div className="text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">{step.icon}</div>
                                        <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] mb-4 tracking-tight uppercase">{step.title}</h3>
                                        <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>

                                <div className="hidden md:block md:w-[10%]" />
                                <div className="hidden md:block md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
