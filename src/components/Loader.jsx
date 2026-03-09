import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 relative overflow-hidden">
            {/* Pulsing Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-[var(--accent-primary)] blur-[100px] rounded-full"
            />

            <div className="relative z-10 space-y-12 flex flex-col items-center">
                {/* Modern Brain Loader Animation */}
                <div className="relative w-24 h-24">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-t-[var(--accent-primary)] border-r-transparent border-b-[var(--accent-light)] border-l-transparent rounded-full shadow-[0_0_20px_var(--accent-glow)]"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-4 border-t-transparent border-r-indigo-500 border-b-transparent border-l-indigo-400 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
                        🧠
                    </div>
                </div>

                <div className="text-center">
                    <motion.h3
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-2"
                    >
                        Neural Synthesis
                    </motion.h3>
                    <div className="flex items-center space-x-1 justify-center">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                            Orchestrating Knowledge
                        </p>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
                            className="w-1 h-1 bg-[var(--accent-primary)] rounded-full"
                        />
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                            className="w-1 h-1 bg-[var(--accent-primary)] rounded-full"
                        />
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                            className="w-1 h-1 bg-[var(--accent-primary)] rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
