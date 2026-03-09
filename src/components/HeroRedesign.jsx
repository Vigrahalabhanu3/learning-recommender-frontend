import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typewriter from './Typewriter';
import HeroMockup from './HeroMockup';

const HeroRedesign = () => {
    const navigate = useNavigate();
    const phrases = [
        "Finding courses for Python beginners...",
        "Recommending ML courses for engineers...",
        "Matching Data Science courses for you...",
        "Personalizing your learning journey...",
    ];

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Hero Content */}
                    <div className="text-center lg:text-left space-y-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] backdrop-blur-md"
                        >
                            <span className="relative flex h-2 w-2 mr-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] opacity-80">
                                ✨ Final Year AI Project — B.Tech CS
                            </span>
                        </motion.div>

                        <div className="space-y-4 md:space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl sm:text-6xl md:text-8xl font-black text-[var(--text-primary)] px-2 tracking-tighter leading-[0.9]"
                            >
                                Personalized <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500 animate-gradient-x">
                                    Learning
                                </span> <br />
                                Recommender
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-base md:text-xl text-[var(--text-secondary)] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 md:px-0"
                        >
                            AI-powered course recommendations using fine-tuned DistilBERT and Sentence Transformers. 888 Coursera courses. Real-time results.
                        </motion.p>

                        <div className="pt-4 px-4 md:px-0">
                            <Typewriter phrases={phrases} />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 px-4 md:px-0"
                        >
                            <button
                                onClick={() => navigate('/recommend')}
                                className="group relative px-10 py-5 rounded-2xl md:rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/40 active:scale-95 transition-all overflow-hidden"
                            >
                                <span className="relative z-10">🚀 Get Started</span>
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                />
                            </button>
                            <button
                                onClick={() => navigate('/pipeline')}
                                className="px-10 py-5 rounded-2xl md:rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md text-[var(--text-primary)] font-black text-xs uppercase tracking-[0.2em] hover:bg-[var(--bg-card)] active:scale-95 transition-all"
                            >
                                🔬 AI Pipeline
                            </button>
                        </motion.div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 opacity-50">
                            {['Fine-tuned AI', '888 Courses', 'Instant Results'].map(badge => (
                                <div key={badge} className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">
                                    <span className="text-emerald-400">✅</span>
                                    <span>{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="hidden lg:block"
                    >
                        <HeroMockup />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroRedesign;
