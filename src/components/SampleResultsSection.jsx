import React from 'react';
import { motion } from 'framer-motion';

const SampleResultsSection = () => {
    const samples = [
        {
            user: "🐍 Python Beginner",
            profile: "Complete beginner. Wants to learn Python from scratch for data analysis.",
            level: "Beginner",
            levelColor: "text-emerald-500",
            courses: [
                { title: "Python for Everybody", rating: "4.8", match: "97%" },
                { title: "Python Basics", rating: "4.8", match: "97%" },
                { title: "Crash Course on Python", rating: "4.8", match: "96%" }
            ]
        },
        {
            user: "🤖 ML Engineer",
            profile: "I know Python and linear algebra. Want to learn deep neural networks.",
            level: "Intermediate",
            levelColor: "text-amber-500",
            courses: [
                { title: "Neural Networks & DL", rating: "4.9", match: "96%" },
                { title: "Deep Neural Networks", rating: "4.9", match: "95%" },
                { title: "CNN in TensorFlow", rating: "4.7", match: "95%" }
            ]
        },
        {
            user: "🔬 PhD Researcher",
            profile: "Expert in ML. Exploring NLP and transformer architectures like BERT.",
            level: "Advanced",
            levelColor: "text-rose-500",
            courses: [
                { title: "NLP in TensorFlow", rating: "4.6", match: "99%" },
                { title: "Attention Mechanisms", rating: "4.8", match: "99%" },
                { title: "Transformer Models", rating: "4.9", match: "99%" }
            ]
        }
    ];

    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 md:mb-24 px-4">
                    <h2 className="text-3xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-4">Real Results, Real Courses</h2>
                    <p className="text-[var(--text-muted)] font-medium text-lg md:text-xl">See how our AI interprets different user profiles and generates pathways.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {samples.map((sample, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[3rem] p-8 backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />

                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Profile: {sample.user}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${sample.levelColor} px-3 py-1 bg-white/5 rounded-full border border-current/20`}>
                                    {sample.level}
                                </span>
                            </div>

                            <div className="p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-medium leading-relaxed italic mb-10">
                                "{sample.profile}"
                            </div>

                            <div className="space-y-4">
                                {sample.courses.map((course, ci) => (
                                    <div key={ci} className="flex items-center justify-between p-4 bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl group-hover:border-[var(--accent-primary)]/30 transition-colors">
                                        <div className="flex-1">
                                            <div className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight">{course.title}</div>
                                            <div className="text-[10px] text-[var(--text-muted)] mt-1">⭐ {course.rating} Rating</div>
                                        </div>
                                        <div className="text-xs font-black text-[var(--accent-primary)]">{course.match}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative neural art */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent-primary)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SampleResultsSection;
