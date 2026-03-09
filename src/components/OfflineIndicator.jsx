import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const OfflineIndicator = () => {
    const isOnline = useOnlineStatus();
    const [showBackOnline, setShowBackOnline] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isOnline) {
            setIsVisible(true);
            setShowBackOnline(false);
        } else if (isVisible) {
            setShowBackOnline(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setShowBackOnline(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOnline, isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[90%] max-w-sm"
                >
                    <div className={`px-6 py-4 rounded-2xl backdrop-blur-xl border flex items-center space-x-4 shadow-2xl ${showBackOnline
                            ? 'bg-emerald-500/20 border-emerald-500/30'
                            : 'bg-rose-500/20 border-rose-500/30'
                        }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${showBackOnline ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}>
                            {showBackOnline ? '✅' : '📵'}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest">
                                {showBackOnline ? 'Back Online' : 'You are Offline'}
                            </h4>
                            <p className="text-[10px] text-white/70 font-bold">
                                {showBackOnline ? 'Connection restored!' : 'Showing cached content only.'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineIndicator;
