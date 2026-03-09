import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CourseCard = ({ course, index }) => {
    const { isDark } = useTheme();

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner':
                return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'intermediate':
                return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'advanced':
                return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            default:
                return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative p-5 md:p-6 rounded-[2rem] md:rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-3xl hover:border-[var(--accent-primary)] active:scale-[0.98] md:active:scale-100 transition-all duration-500 overflow-hidden ${!isDark ? 'shadow-xl shadow-purple-500/5' : 'hover:shadow-3xl hover:shadow-cyan-500/10'}`}
        >
            {/* Rank Indicator */}
            <div className="absolute top-4 right-4 text-xs font-mono text-[var(--text-muted)] font-bold tracking-widest uppercase italic group-hover:text-[var(--accent-primary)] transition-colors">
                Index: 0{index + 1}
            </div>

            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-extrabold text-[var(--text-primary)] leading-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {course.title}
                </h3>
                <div className="flex items-center space-x-2 text-[var(--text-muted)]">
                    <span className="text-sm">🏫</span>
                    <span className="text-xs font-bold uppercase tracking-widest">{course.organization}</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <div className={`flex flex-col p-3 rounded-2xl border ${getDifficultyColor(course.difficulty)}`}>
                    <span className="text-[10px] uppercase tracking-tighter font-black opacity-60 mb-1">Level</span>
                    <span className="text-xs font-black uppercase">{course.difficulty}</span>
                </div>
                <div className="flex flex-col p-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <span className="text-[10px] uppercase tracking-tighter font-black text-[var(--text-muted)] mb-1">Rating</span>
                    <span className="text-xs font-black text-[var(--text-primary)]">⭐ {course.rating || 'N/A'}</span>
                </div>
            </div>

            {/* Match Percentage Visualizer */}
            <div className="mb-8 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden">
                <div className="flex justify-between items-center mb-2 z-10 relative">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Match Accuracy</span>
                    <span className="text-sm font-black text-[var(--accent-primary)]">{course.match}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: course.match }}
                        transition={{ duration: 1.5, delay: 0.5 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] shadow-[0_0_10px_var(--accent-glow)]"
                    />
                </div>
                {/* Decorative scanner effect */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent w-full pointer-events-none ${isDark ? 'opacity-10' : 'opacity-5'}`}
                />
            </div>

            {/* Action */}
            <motion.a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="inline-flex items-center space-x-2 text-[var(--accent-primary)] hover:text-[var(--text-primary)] font-black text-sm uppercase tracking-widest transition-colors group/link"
            >
                <span>Access Course</span>
                <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </motion.a>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent group-hover:via-[var(--accent-primary)] transition-all duration-500 opacity-50"></div>
        </motion.div>
    );
};

export default CourseCard;
