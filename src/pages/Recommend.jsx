import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import CourseSkeleton from '../components/CourseSkeleton';
import LevelBadge from '../components/LevelBadge';
import { useTheme } from '../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

const Recommend = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    const handleSearch = async (profile) => {
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await axios.post(`${API_URL}/recommend`, { profile });
            setResults(response.data);

            // Scroll to results section once loaded
            setTimeout(() => {
                const el = document.getElementById('results-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to connect to the recommendation engine. Is the backend running?"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <div className="text-center mb-8 md:mb-12">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl md:text-6xl font-black mb-4 text-[var(--text-primary)] tracking-tighter"
                >
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)]">Perfect Pathway</span>
                </motion.h1>
            </div>

            <SearchBox onSearch={handleSearch} isLoading={isLoading} />

            <div id="results-section" className="min-h-[200px] mt-12 md:mt-24">
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <div key="loader-container" className="space-y-16">
                            <Loader />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(i => <CourseSkeleton key={i} />)}
                            </div>
                        </div>
                    )}

                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-rose-500/10 border border-rose-500/30 text-rose-500 px-6 py-8 rounded-[2.5rem] max-w-2xl mx-auto text-center shadow-xl backdrop-blur-xl"
                        >
                            <span className="text-4xl block mb-4">🚨</span>
                            <h4 className="text-xl font-black uppercase mb-1">Neural Interrupt</h4>
                            <p className="font-bold opacity-80">{error}</p>
                        </motion.div>
                    )}

                    {results && !isLoading && !error && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-16"
                        >
                            <LevelBadge level={results.level} confidence={results.confidence} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {results.courses.map((course, index) => (
                                    <CourseCard key={index} course={course} index={index} />
                                ))}
                            </div>

                            {results.courses.length === 0 && (
                                <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-[3rem] border border-dashed border-[var(--border-color)]">
                                    <span className="text-5xl block mb-4">🔍</span>
                                    <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase">No Matches Found</h3>
                                    <p className="text-[var(--text-secondary)] mt-2">Try describing your learning goals with more specific keywords.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Recommend;
