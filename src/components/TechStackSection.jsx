import React from 'react';
import { motion } from 'framer-motion';

const TechStackSection = () => {
    const techs = [
        { name: 'Python', icon: '🐍', desc: 'Core logic & data processing' },
        { name: 'PyTorch', icon: '🔥', desc: 'Model training & inference' },
        { name: 'HuggingFace', icon: '🤗', desc: 'Transformer architectures' },
        { name: 'Sentence Transformers', icon: '🔤', desc: 'Semantic semantic embeddings' },
        { name: 'FAISS', icon: '🔍', desc: 'High-speed vector indexing' },
        { name: 'Flask', icon: '🌶️', desc: 'Backend AI Microservice' },
        { name: 'DistilBERT', icon: '🧠', desc: 'Efficient level classification' },
        { name: 'React.js', icon: '⚛️', desc: 'Reactive UI & Animations' },
        { name: 'Tailwind CSS', icon: '🎨', desc: 'Styling & Design System' },
    ];

    return (
        <section className="py-32 relative bg-[var(--bg-secondary)]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">Built With</h2>
                    <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.3em] text-xs">A state-of-the-art technology stack</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techs.map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5, borderColor: 'var(--accent-primary)' }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl flex items-center space-x-6 transition-all group"
                        >
                            <div className="text-4xl bg-[var(--bg-primary)] p-4 rounded-2xl border border-[var(--border-color)] group-hover:scale-110 transition-transform shadow-xl group-hover:shadow-[var(--accent-glow)]">
                                {tech.icon}
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{tech.name}</h3>
                                <p className="text-[10px] text-[var(--text-muted)] mt-1 font-bold">{tech.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;
