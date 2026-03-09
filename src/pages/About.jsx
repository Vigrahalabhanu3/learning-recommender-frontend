import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { isDark } = useTheme();

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 text-[var(--text-primary)] tracking-tighter"
                    >
                        Architecting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-indigo-500 to-[var(--accent-primary)] animate-gradient-x">
                            Future Minds
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-base md:text-xl text-[var(--text-secondary)] font-medium leading-relaxed px-4"
                    >
                        LearnAI is a precision learning recommendation engine that utilizes DistilBERT and FAISS vector synthesis to map your cognitive profile to optimal educational trajectories.
                    </motion.p>
                </div>

                {/* Core Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-3xl transform hover:scale-[1.01] transition-all duration-500 ${!isDark ? 'shadow-2xl shadow-purple-500/5' : 'shadow-2xl shadow-black/40'}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-3xl mb-8 shadow-xl border border-[var(--border-color)]">
                            🧠
                        </div>
                        <h3 className="text-3xl font-black text-[var(--text-primary)] mb-6 tracking-tight">The Neural Core</h3>
                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-medium">
                            Our system leverages DistilBERT (Bidirectional Encoder Representations from Transformers) to perform deep semantic analysis of user profiles. By understanding context rather than just keywords, we predict learning levels with over <span className="text-[var(--accent-primary)] font-black">92% accuracy</span>.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-10 rounded-[3rem] bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-3xl transform hover:scale-[1.01] transition-all duration-500 ${!isDark ? 'shadow-2xl shadow-purple-500/5' : 'shadow-2xl shadow-black/40'}`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-3xl mb-8 shadow-xl border border-[var(--border-color)]">
                            ⚡
                        </div>
                        <h3 className="text-3xl font-black text-[var(--text-primary)] mb-6 tracking-tight">FAISS Vector Synthesis</h3>
                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-medium">
                            Recommendations are generated through FAISS (Facebook AI Similarity Search), converting 10,000+ courses into 768-dimensional vectors. This allows for <span className="text-[var(--accent-primary)] font-black">sub-millisecond searching</span> through complex multi-dimensional feature spaces.
                        </p>
                    </motion.div>
                </div>

                {/* Tech Stack Grid */}
                <div className="relative mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tight uppercase">Neural Stack</h2>
                        <p className="text-[var(--text-muted)] text-sm font-black uppercase tracking-[0.3em] mt-2">Built with Production-Grade Infrastructure</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['PyTorch', 'DistilBERT', 'FAISS', 'Tailwind', 'Framer', 'FastAPI', 'React', 'MongoDB'].map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`px-8 py-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center transform hover:-translate-y-1 transition-all duration-300 ${!isDark ? 'shadow-lg shadow-purple-500/5' : 'shadow-xl'}`}
                            >
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)]">
                                    {tech}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden ${!isDark ? 'shadow-3xl shadow-purple-500/10' : 'shadow-2xl shadow-black/60'}`}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)] opacity-5 blur-[100px] rounded-full"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-10 tracking-tighter italic">
                            "AI doesn't replace the teacher; <br /> it amplifies the learner."
                        </h2>
                        <p className="max-w-3xl mx-auto text-[var(--text-secondary)] text-xl font-medium leading-relaxed mb-12">
                            Our mission is to democratize high-end personalized mentorship by mapping the vast landscape of digital education into structured, high-conversion growth trajectories for every student.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
