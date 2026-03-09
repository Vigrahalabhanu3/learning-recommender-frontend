import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SearchBox = ({ onSearch, isLoading }) => {
    const [profile, setProfile] = useState('');
    const { isDark } = useTheme();

    const quickProfiles = [
        { label: "🐍 Python Beginner", text: "I am a beginner in Python looking for introductory data science courses." },
        { label: "🤖 ML Engineer", text: "I have experience in software engineering and want to specialize in machine learning and neural networks." },
        { label: "📊 Data Analyst", text: "I work with Excel and want to learn SQL, Power BI, and foundational statistics for data analysis." },
        { label: "🌐 Web Dev", text: "I am a front-end developer looking to learn back-end technologies like Node.js and MongoDB." }
    ];

    const handleSearch = () => {
        if (profile.trim()) {
            onSearch(profile);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-6 md:py-12 px-2 md:px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`group relative p-5 md:p-8 rounded-[2.5rem] md:rounded-[3rem] bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-3xl transition-all duration-500 overflow-hidden ${!isDark ? 'shadow-2xl shadow-purple-500/10' : 'shadow-2xl shadow-black/40'}`}
            >
                {/* Visual Header Decoration */}
                <div className="flex items-center justify-between mb-6 md:mb-8 opacity-60">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-rose-500/50"></div>
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500/50"></div>
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500/50"></div>
                    </div>
                    <div className="text-[8px] md:text-[10px] font-mono font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
                        Profile_Analyzer_v2.0
                    </div>
                </div>

                <div className="relative mb-6 md:mb-8">
                    <textarea
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your academic profile or learning objectives here..."
                        className="w-full h-40 md:h-48 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl md:rounded-3xl p-5 md:p-6 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-all font-medium text-base md:text-lg leading-relaxed"
                    />

                    {/* Character Counter Badge */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[8px] md:text-[10px] font-black text-[var(--text-muted)] tracking-widest uppercase">
                        {profile.length} chars
                    </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-col space-y-8">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {quickProfiles.map((p) => (
                            <motion.button
                                key={p.label}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setProfile(p.text)}
                                className="px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[8px] md:text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all flex-1 min-w-[45%] md:flex-none"
                            >
                                {p.label}
                            </motion.button>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSearch}
                        disabled={isLoading || !profile.trim()}
                        className={`group relative w-full md:w-fit md:px-12 py-5 rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center space-x-3 ${isLoading || !profile.trim()
                            ? 'bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] text-white hover:shadow-[var(--accent-glow)] shadow-[var(--accent-glow)]'
                            }`}
                    >
                        <span>{isLoading ? '⚙️ Processing...' : 'Analyze Profile'}</span>
                        {!isLoading && <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default SearchBox;
