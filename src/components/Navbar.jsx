import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();
    const { isDark } = useTheme();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Recommend', path: '/recommend' },
        { name: '🔬 Pipeline', path: '/pipeline' },
        { name: 'About', path: '/about' },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        >
            <div className={`max-w-7xl mx-auto backdrop-blur-xl bg-[var(--navbar-bg)] border-b border-[var(--border-color)] md:rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-300 ${!isDark ? 'shadow-lg shadow-purple-500/10' : 'shadow-2xl shadow-black/50'} ${hidden ? 'translate-y-[-100%]' : 'translate-y-0'}`}>
                <Link to="/" className="flex items-center space-x-2 group">
                    <span className="text-xl md:text-2xl outline-none">🎓</span>
                    <span className="text-lg md:text-xl font-black tracking-tighter text-[var(--text-primary)]">
                        Learn<span className="text-[var(--accent-primary)] filter drop-shadow-[0_0_8px_var(--accent-glow)]">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    <div className="flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-bold uppercase tracking-widest transition-colors relative py-1 ${location.pathname === link.path
                                    ? 'text-[var(--text-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-glow)] rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 border-l border-[var(--border-color)] pl-8">
                        <ThemeToggle />
                        <Link to="/recommend">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[var(--accent-primary)] text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--accent-glow)] hover:brightness-110 transition-all"
                            >
                                Get Started
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-3 active:scale-90"
                        aria-label="Toggle Menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current rounded-full"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Full Screen Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-40 md:hidden bg-[var(--bg-primary)]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
                    >
                        <div className="flex flex-col items-center space-y-8 w-full">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-full"
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-center py-4 text-2xl font-black uppercase tracking-[0.2em] transition-all ${location.pathname === link.path
                                                ? 'text-[var(--accent-primary)] scale-110'
                                                : 'text-[var(--text-secondary)] active:text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-12 w-full flex flex-col items-center space-y-6"
                            >
                                <Link to="/recommend" onClick={() => setIsOpen(false)} className="w-full">
                                    <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-purple-500/20 active:scale-95 transition-all">
                                        🚀 Get Recommendations
                                    </button>
                                </Link>
                                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)]">
                                    Final Year AI Project
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
