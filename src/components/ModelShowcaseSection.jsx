import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full"
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

const ModelShowcaseSection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-4 px-4">Powered By Fine-Tuned AI</h2>
                    <p className="text-[8px] md:text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.3em] px-4">Neural Architectures engineered for performance</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* DistilBERT Card */}
                    <TiltCard>
                        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-3xl h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full" />
                            <div className="relative z-10">
                                <span className="text-3xl md:text-4xl mb-6 md:mb-8 block">🧠</span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">DistilBERT Classifier</h3>
                                <p className="text-xs md:text-base text-indigo-300/80 font-medium mb-8 md:mb-12">Expertly fine-tuned for recursive level detection.</p>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Training Accuracy</span>
                                        <span className="text-purple-400">100.0%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className="h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-8">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Epochs</div>
                                            <div className="text-xl font-black text-white">20</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Status</div>
                                            <div className="text-xl font-black text-emerald-400 uppercase tracking-tighter">Optimal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Sentence Transformer Card */}
                    <TiltCard>
                        <div className="bg-gradient-to-br from-slate-900 to-violet-950 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-3xl h-full relative overflow-hidden group">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[60px] rounded-full" />
                            <div className="relative z-10">
                                <span className="text-4xl mb-8 block">🔤</span>
                                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Sentence Transformer</h3>
                                <p className="text-indigo-300/80 font-medium mb-12">mpnet-base fine-tuned for course semantic mapping.</p>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Inference Latency</span>
                                        <span className="text-cyan-400">&lt; 150ms</span>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Python courses', val: '97%' },
                                            { label: 'ML courses', val: '95%' },
                                            { label: 'Cloud courses', val: '99%' }
                                        ].map(item => (
                                            <div key={item.label} className="space-y-1">
                                                <div className="flex justify-between text-[8px] font-black uppercase text-slate-600">
                                                    <span>{item.label} Match Score</span>
                                                    <span>{item.val}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: item.val }}
                                                        transition={{ duration: 1.5 }}
                                                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
};

export default ModelShowcaseSection;
