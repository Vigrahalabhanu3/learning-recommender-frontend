import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            try {
                localStorage.setItem('splash_shown', 'true');
            } catch (e) {
                console.warn("Storage item set failed:", e);
            }
            if (onFinish) onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#0f0c29] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated Particles in Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [-20, 20, -20],
                                    opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                                className="absolute rounded-full bg-purple-500 blur-sm"
                                style={{
                                    width: Math.random() * 4 + 2,
                                    height: Math.random() * 4 + 2,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative z-10 text-center"
                    >
                        <motion.div
                            animate={{
                                rotateY: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-8xl mb-6 inline-block"
                        >
                            🎓
                        </motion.div>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl font-black text-white tracking-tighter uppercase"
                        >
                            Learn<span className="text-purple-500">AI</span>
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 200 }}
                            transition={{ delay: 0.8, duration: 1.5 }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mt-8 overflow-hidden"
                        >
                            <motion.div
                                animate={{ x: [-200, 200] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-white/40"
                            />
                        </motion.div>
                        <p className="text-purple-300 text-[10px] uppercase tracking-[0.3em] mt-4 font-black">Initialising Intelligence...</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
