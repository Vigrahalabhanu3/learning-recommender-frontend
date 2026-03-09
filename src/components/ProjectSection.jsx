import React from 'react';
import { motion } from 'framer-motion';

const ProjectSection = () => {
    const timeline = [
        { week: 'W1', title: 'Dataset Collection', desc: 'Curating 888 Coursera courses.' },
        { week: 'W2', title: 'Data Cleaning', desc: 'Preprocessing text for AI models.' },
        { week: 'W3', title: 'Model Fine-tuning', desc: 'Optimizing DistilBERT weights.' },
        { week: 'W4', title: 'API & Backend', desc: 'Flask integration with FAISS.' },
        { week: 'W5', title: 'Frontend UI', desc: 'Premium React & Framer Motion.' },
        { week: 'W6', title: 'Deployment', desc: 'Final testing and optimization.' },
    ];

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xs font-black uppercase tracking-[0.5em] text-[var(--accent-primary)] mb-6 block"
                        >
                            Origins & Details
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-8 leading-tight">
                            About This Final Year Project
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg font-medium leading-relaxed mb-12">
                            Developed as a Capstone project for B.Tech Computer Science, this system demonstrates the power of transfer learning and semantic search in modern education. By fine-tuning state-of-the-art transformers, we achieve personalized learning paths at sub-second speeds.
                        </p>

                        <div className="grid grid-cols-2 gap-8 border-t border-[var(--border-color)] pt-12">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Degree</div>
                                <div className="text-sm font-black text-[var(--text-primary)] tracking-tight">B.Tech Computer Science</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">University</div>
                                <div className="text-sm font-black text-[var(--text-primary)] tracking-tight">Final Year | 2025-26</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Location</div>
                                <div className="text-sm font-black text-[var(--text-primary)] tracking-tight">Hyderabad, India</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Status</div>
                                <div className="text-sm font-black text-emerald-500 tracking-tight">Phase 5: Completed</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 to-transparent blur-3xl rounded-full" />
                        <div className="space-y-4 relative z-10">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-6 p-4 bg-[var(--bg-card)]/50 border border-[var(--border-color)] rounded-2xl hover:bg-[var(--bg-secondary)]/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center font-black text-xs text-[var(--accent-primary)]">
                                        {item.week}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">{item.title}</h4>
                                        <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
