import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PipelineNode = ({ stage, status, isActive, isComplete }) => {
    const { isDark } = useTheme();

    const getColor = (color) => {
        if (!isActive && !isComplete) return 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)]';

        if (isComplete) return 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]';

        switch (color) {
            case 'blue': return 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]';
            case 'cyan': return 'bg-cyan-500 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]';
            case 'purple': return 'bg-purple-600 border-purple-400 shadow-[0_0_20px_rgba(124,58,237,0.5)]';
            case 'pink': return 'bg-pink-500 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)]';
            case 'orange': return 'bg-orange-500 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)]';
            default: return 'bg-[var(--accent-primary)] border-[var(--accent-light)]';
        }
    };

    return (
        <div className="flex flex-col items-center relative group cursor-default">
            {/* Stage Number Badge */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 border border-[var(--border-color)] ${isComplete ? 'bg-white text-emerald-600' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'}`}>
                {stage.id}
            </div>

            {/* Node Circle */}
            <motion.div
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-4xl mb-4 transition-all duration-500 relative ${getColor(stage.color)}`}
            >
                {isComplete ? '✅' : stage.icon}

                {/* Pulse Ring for Active Node */}
                {isActive && (
                    <motion.div
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-inherit pointer-events-none"
                    />
                )}
            </motion.div>

            {/* Label and Status */}
            <div className="flex flex-col items-center text-center max-w-[120px]">
                <h4 className={`text-xs font-black uppercase tracking-widest mb-1 transition-colors duration-300 ${isActive || isComplete ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                    {stage.title}
                </h4>
                <p className={`text-[10px] font-bold uppercase tracking-tighter h-4 transition-colors duration-300 ${isActive ? 'text-[var(--accent-primary)]' : isComplete ? 'text-emerald-500' : 'text-[var(--text-muted)] opacity-50'}`}>
                    {isActive ? status : isComplete ? 'Step Complete' : 'Waiting...'}
                </p>
            </div>
        </div>
    );
};

export default PipelineNode;
