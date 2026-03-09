import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FinalCTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-40 relative overflow-hidden">
            {/* Animated Gradient Background Waves */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        translateY: [0, -20, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/10 to-transparent opacity-30"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-16 rounded-[4rem] bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-3xl shadow-4xl relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter mb-8 leading-none">
                            Ready to Find Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)]">Perfect Course?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto mb-12">
                            Let our AI analyze your goals and recommend the best Coursera pathways from our 888-course index. Instant, accurate, and tailored to you.
                        </p>

                        <motion.button
                            onClick={() => navigate('/recommend')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-12 py-6 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] text-white font-black text-lg uppercase tracking-widest shadow-2xl shadow-purple-500/20 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center space-x-3">
                                <span>🚀 Get Started Now</span>
                            </span>

                            {/* Particle burst effect on hover simplified for CSS */}
                            <motion.div
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                        </motion.button>

                        <div className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)] flex items-center justify-center space-x-6">
                            <span>✅ No Signup Required</span>
                            <span>✅ Instant Results</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTASection;
