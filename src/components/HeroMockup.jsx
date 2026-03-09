import React from 'react';
import { motion } from 'framer-motion';

const HeroMockup = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full" />

            {/* Stacked Cards for depth */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] transform translate-x-4 translate-y-4 blur-sm" />
            <div className="absolute -top-5 -right-5 w-full h-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] transform translate-x-2 translate-y-2 blur-[1px]" />

            {/* Main Floating Card */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-3xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/40" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        Recommendation_Preview
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
                            🎓
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-primary)] mb-0.5">Recommended for You</div>
                            <h3 className="text-xl font-black text-[var(--text-primary)]">Python for Everybody</h3>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--text-secondary)] font-medium">🏫 University of Michigan</span>
                            <span className="text-xs font-bold text-emerald-500">97.27% Match</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--text-muted)] font-bold">⭐ 4.8 Rating</span>
                            <span className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">
                                Beginner
                            </span>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="w-full h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] flex items-center justify-center text-xs font-black uppercase tracking-widest text-white mt-4 shadow-xl shadow-purple-500/20"
                    >
                        View Course Details →
                    </motion.div>
                </div>

                {/* Shimmer Effect */}
                <motion.div
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                />
            </motion.div>

            {/* Floating Tags */}
            <motion.div
                animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-10 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl backdrop-blur-xl flex items-center space-x-3"
            >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">AI Level: Beginner</span>
            </motion.div>

            <motion.div
                animate={{ y: [0, -15, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-10 left-10 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl backdrop-blur-xl flex items-center space-x-3"
            >
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">888+ Courses Indexed</span>
            </motion.div>
        </div>
    );
};

export default HeroMockup;
