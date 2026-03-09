import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-500 ${isDark ? 'bg-slate-800' : 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none text-[10px]">
                <span className={isDark ? 'opacity-100' : 'opacity-20 transition-opacity'}>🌙</span>
                <span className={!isDark ? 'opacity-100' : 'opacity-20 transition-opacity'}>☀️</span>
            </div>

            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full bg-white shadow-lg z-10 flex items-center justify-center overflow-hidden ${isDark ? 'translate-x-0' : 'translate-x-7'
                    }`}
            >
                <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    className="text-[10px]"
                >
                    {isDark ? '🌙' : '☀️'}
                </motion.span>
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
