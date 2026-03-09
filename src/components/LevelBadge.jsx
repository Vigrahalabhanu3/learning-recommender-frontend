import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LevelBadge = ({ level, confidence }) => {
    const { isDark } = useTheme();

    const getColors = (lvl) => {
        switch (lvl?.toLowerCase()) {
            case 'beginner':
                return {
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/30',
                    text: 'text-emerald-500',
                    accent: 'bg-emerald-500',
                    shadow: 'shadow-emerald-500/20'
                };
            case 'intermediate':
                return {
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/30',
                    text: 'text-amber-500',
                    accent: 'bg-amber-500',
                    shadow: 'shadow-amber-500/20'
                };
            case 'advanced':
                return {
                    bg: 'bg-rose-500/10',
                    border: 'border-rose-500/30',
                    text: 'text-rose-500',
                    accent: 'bg-rose-500',
                    shadow: 'shadow-rose-500/20'
                };
            default:
                return {
                    bg: 'bg-slate-500/10',
                    border: 'border-white/5',
                    text: 'text-slate-400',
                    accent: 'bg-slate-500',
                    shadow: 'shadow-slate-500/10'
                };
        }
    };

    const colors = getColors(level);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full"
        >
            {/* Level Indicator */}
            <div className={`flex-1 flex items-center p-6 rounded-3xl ${colors.bg} border-2 ${colors.border} ${isDark ? colors.shadow : ''} backdrop-blur-xl relative overflow-hidden group transition-all duration-500`}>
                <div className="relative z-10 flex items-center space-x-6">
                    <div className={`w-14 h-14 rounded-2xl ${colors.accent} flex items-center justify-center text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110`}>
                        {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '⚡' : '🔥'}
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-1">
                            Curated Level
                        </div>
                        <h2 className={`text-3xl font-black ${colors.text} tracking-tighter uppercase leading-none`}>
                            {level}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Confidence Metric */}
            <div className={`flex-1 flex items-center p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] ${isDark ? 'shadow-2xl' : 'shadow-lg shadow-purple-500/5'} backdrop-blur-xl group transition-all duration-500`}>
                <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
                            AI Confidence
                        </div>
                        <div className={`text-xl font-black ${colors.text}`}>
                            {confidence}%
                        </div>
                    </div>
                    <div className="h-2 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-color)]">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full ${colors.accent} ${isDark ? colors.shadow : ''}`}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LevelBadge;
