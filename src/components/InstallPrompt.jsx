import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA } from '../hooks/usePWA';

const InstallPrompt = () => {
    const { isInstallable, showInstallPrompt } = usePWA();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isInstallable) {
            // Show after 30 seconds or if user hasn't dismissed it
            const timer = setTimeout(() => {
                const dismissed = localStorage.getItem('install_dismissed');
                if (!dismissed) {
                    setIsVisible(true);
                }
            }, 10000); // 10s for demo/testing purposes
            return () => clearTimeout(timer);
        }
    }, [isInstallable]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('install_dismissed', 'true');
    };

    const handleInstall = () => {
        showInstallPrompt();
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: "spring", damping: 20 }}
                    className="fixed bottom-0 left-0 right-0 z-[9997] p-4 md:p-6"
                >
                    <div className="max-w-xl mx-auto bg-[#1a1740] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                        <div className="flex items-start space-x-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-3xl shadow-2xl">
                                🎓
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-white tracking-tighter mb-2 uppercase">Install LearnAI</h3>
                                <p className="text-sm text-purple-200/70 font-medium leading-relaxed mb-6">
                                    Add to your home screen for instant access to AI course recommendations and offline support.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleInstall}
                                        className="py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                                    >
                                        🚀 Install App
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Swipe Handle */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full md:hidden" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPrompt;
