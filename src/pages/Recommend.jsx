import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import LevelBadge from '../components/LevelBadge';
import { useTheme } from '../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

const Recommend = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const { isDark } = useTheme();

    const handleSearch = async (profile) => {
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await axios.post(`${API_URL}/recommend`, { profile });
            setResults(response.data);
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

            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onAnimationComplete={() => {
                            if (window.innerWidth < 768) {
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }
                        }}
                    >
                        <Loader />
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mt-8 bg-rose-500/10 border border-rose-500/30 text-rose-500 px-6 py-4 rounded-3xl max-w-2xl mx-auto text-center font-bold shadow-xl backdrop-blur-xl"
                    >
                        🚨 {error}
                    </motion.div>
                )}

                {results && !isLoading && !error && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-16 space-y-12"
                    >
                        <LevelBadge level={results.level} confidence={results.confidence} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results.courses.map((course, index) => (
                                <CourseCard key={index} course={course} index={index} />
                            ))}
                        </div>

                        {results.courses.length === 0 && (
                            <div className="text-center text-[var(--text-muted)] mt-10 text-xl font-medium py-12 bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border-color)]">
                                No exact matches found. Try describing your goals differently!
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Recommend;
