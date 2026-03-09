import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DemoSection = () => {
    const [typing, setTyping] = useState('');
    const [step, setStep] = useState(0); // 0: typing, 1: showing results, 2: reset
    const fullText = "I want to learn machine learning and neural networks using Python.";

    useEffect(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            if (step === 0) {
                setTyping(fullText.slice(0, i + 1));
                i++;
                if (i === fullText.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => setStep(1), 1000);
                }
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [step]);

    useEffect(() => {
        if (step === 1) {
            setTimeout(() => setStep(2), 5000);
        } else if (step === 2) {
            setTyping('');
            setTimeout(() => setStep(0), 1000);
        }
    }, [step]);

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">See It In Action</h2>
                    <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[4rem] p-8 md:p-16 backdrop-blur-3xl shadow-3xl">
                    {/* Left: Input Box */}
                    <div className="space-y-6">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-primary)] mb-2">Synthetic Experience</div>
                        <div className="bg-[var(--bg-primary)] border border-purple-500/20 p-8 rounded-[2.5rem] h-64 relative shadow-inner overflow-hidden">
                            <div className="font-mono text-lg text-[var(--text-primary)] leading-relaxed">
                                {typing}<span className="animate-pulse w-2 h-6 bg-purple-500 inline-block ml-1 align-middle" />
                            </div>
                            <div className="absolute bottom-6 right-8 text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)] animate-pulse">
                                System_Analyzing_Intent...
                            </div>
                        </div>
                    </div>

                    {/* Right: Results Preview */}
                    <div className="relative h-96 flex flex-col justify-center space-y-4">
                        <AnimatePresence>
                            {step >= 1 && (
                                <>
                                    {[1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                            transition={{ delay: i * 0.2, type: "spring" }}
                                            className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-4 rounded-3xl flex items-center space-x-4 shadow-xl"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl">🎓</div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-black uppercase text-[var(--accent-primary)]">Recommended Course</div>
                                                <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-tight">Machine Learning Specialization</div>
                                                <div className="flex space-x-2 mt-1">
                                                    <span className="text-[8px] font-black text-emerald-500">98% Match</span>
                                                    <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">Beginner</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </AnimatePresence>
                        {step === 0 && (
                            <div className="flex items-center justify-center h-full text-[var(--text-muted)] font-black text-xl uppercase tracking-[0.3em] opacity-10 animate-pulse">
                                Awaiting Pipeline...
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-8 py-3 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] font-black text-xs uppercase tracking-widest hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-xl shadow-purple-500/10"
                    >
                        Try The Live Demo →
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
