import React from 'react';
import { motion } from 'framer-motion';

const PipelineConnector = ({ isActive, isComplete, color, label, isVertical }) => {
    return (
        <div className={`flex items-center justify-center relative ${isVertical ? 'h-16 w-1 flex-col' : 'w-16 h-1'}`}>
            {/* Dashed Background Line */}
            <div className={`absolute rounded-full transition-all duration-500 ${isVertical ? 'w-0.5 h-full' : 'h-0.5 w-full'} ${isComplete ? 'bg-emerald-500' : 'bg-[var(--border-color)] border-dashed border-[var(--text-muted)]/20 border-t'}`}></div>

            {/* Flowing Dots Animation */}
            {isActive && !isComplete && (
                <div className={`absolute inset-0 flex items-center justify-center ${isVertical ? 'flex-col' : ''}`}>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={isVertical ? { y: -20, opacity: 0 } : { x: -20, opacity: 0 }}
                            animate={isVertical ? { y: 20, opacity: [0, 1, 0] } : { x: 20, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "linear"
                            }}
                            className={`w-1.5 h-1.5 rounded-full ${color === 'blue' ? 'bg-blue-400' : color === 'cyan' ? 'bg-cyan-400' : color === 'purple' ? 'bg-purple-400' : color === 'pink' ? 'bg-pink-400' : color === 'orange' ? 'bg-orange-400' : 'bg-[var(--accent-primary)]'} shadow-[0_0_8px_currentColor]`}
                        />
                    ))}
                </div>
            )}

            {/* Arrow Head */}
            <div className={`absolute ${isVertical ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : 'right-[-4px] top-1/2 -translate-y-1/2'} transition-colors duration-500 ${isComplete ? 'text-emerald-500' : 'text-[var(--border-color)]'}`}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                    <path d={isVertical ? "M0 0 L4 8 L8 0 Z" : "M0 0 L8 4 L0 8 Z"} />
                </svg>
            </div>

            {/* Data Label */}
            {label && (
                <div className={`absolute whitespace-nowrap text-[8px] font-black uppercase tracking-tighter transition-all duration-500 ${isVertical ? 'left-4 top-1/2 -translate-y-1/2' : 'top-[-16px] left-1/2 -translate-x-1/2'} ${isActive ? 'text-[var(--accent-primary)]' : isComplete ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`}>
                    {label}
                </div>
            )}
        </div>
    );
};

export default PipelineConnector;
