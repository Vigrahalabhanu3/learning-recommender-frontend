import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatsBar from './StatsBar';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1.5, type: 'spring' }}
                        className="inline-block text-7xl md:text-8xl mb-10 filter drop-shadow-[0_0_20px_var(--accent-glow)] select-none"
                    >
                        🎓
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black mb-8 text-[var(--text-primary)] tracking-tighter leading-none"
                    >
                        Unlock Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] animate-gradient-x">
                            Potential AI
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-[var(--text-secondary)] text-xl md:text-2xl font-medium mb-12"
                    >
                        Precision learning pathways powered by DistilBERT and FAISS vector synthesis.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <Link to="/recommend">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--accent-glow)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-[var(--accent-primary)] text-white rounded-[2rem] font-black text-lg uppercase tracking-widest flex items-center space-x-3 group"
                            >
                                <span>Get Started</span>
                                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <StatsBar />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
