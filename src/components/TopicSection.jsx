import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TopicSection = () => {
    const navigate = useNavigate();
    const topics = [
        { icon: '🤖', label: 'Machine Learning', count: 45, desc: 'Advanced neural architectures and theory.' },
        { icon: '🐍', label: 'Python', count: 38, desc: 'Scripting, backend, and data manipulation.' },
        { icon: '📊', label: 'Data Science', count: 52, desc: 'Statistical analysis and insight extraction.' },
        { icon: '💬', label: 'NLP', count: 23, desc: 'Transformer-based text analysis.' },
        { icon: '👁️', label: 'Computer Vision', count: 31, desc: 'Object detection and image synthesis.' },
        { icon: '☁️', label: 'Cloud Computing', count: 67, desc: 'Scalable infrastructure and AWS/GCP.' },
        { icon: '🌐', label: 'Web Development', count: 44, desc: 'Modern React and Fullstack ecosystems.' },
        { icon: '🔒', label: 'Cybersecurity', count: 38, desc: 'Ethical hacking and network defense.' },
        { icon: '🗄️', label: 'SQL & Databases', count: 29, desc: 'Schema design and query optimization.' },
        { icon: '🧠', label: 'Deep Learning', count: 41, desc: 'Multi-layer perceptrons and CNNs.' },
        { icon: '🎮', label: 'Reinforcement', count: 18, desc: 'Game AI and decision-making logic.' },
        { icon: '📈', label: 'Statistics', count: 35, desc: 'Foundational math for data modeling.' },
        { icon: '⛓️', label: 'Blockchain', count: 22, desc: 'Decentralized ledger technologies.' },
        { icon: '⚡', label: 'Management', count: 31, desc: 'Agile methodologies and leadership.' },
    ];

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-xs font-black uppercase tracking-[0.5em] text-[var(--accent-primary)] mb-4 block"
                >
                    Knowledge Spectrum
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-16">
                    888 Courses Across 14 Topics
                </h2>

                <div className="flex flex-wrap justify-center gap-4 relative">
                    {topics.map((topic, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.05,
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            onClick={() => navigate('/recommend')}
                            className="group relative px-6 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center space-x-3 backdrop-blur-3xl hover:border-[var(--accent-primary)] hover:shadow-2xl hover:shadow-[var(--accent-glow)] transition-all duration-300"
                        >
                            <span className="text-xl">{topic.icon}</span>
                            <div className="text-left">
                                <div className="text-xs font-black uppercase tracking-wider text-[var(--text-primary)]">
                                    {topic.label}
                                </div>
                                <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-0.5">
                                    {topic.count} Courses
                                </div>
                            </div>

                            {/* Hover Reveal Description - using title as tooltip is enough or a nice reveal */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-[var(--accent-primary)] to-transparent rounded-2xl transition-opacity" />
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopicSection;
