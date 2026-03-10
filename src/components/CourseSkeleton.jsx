import React from 'react';
import { motion } from 'framer-motion';

const CourseSkeleton = () => {
    return (
        <div className="p-5 md:p-6 rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden relative">
            <div className="animate-pulse space-y-6">
                {/* Header Skeleton */}
                <div className="space-y-3">
                    <div className="h-6 bg-white/10 rounded-full w-3/4"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-white/5 rounded-full"></div>
                        <div className="h-3 bg-white/5 rounded-full w-1/2"></div>
                    </div>
                </div>

                {/* Metrics Grid Skeleton */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 bg-white/5 rounded-2xl"></div>
                    <div className="h-12 bg-white/5 rounded-2xl"></div>
                </div>

                {/* Progress Bar Skeleton */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="h-2 bg-white/5 rounded-full w-1/4"></div>
                        <div className="h-2 bg-white/5 rounded-full w-1/8"></div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full w-full"></div>
                </div>

                {/* Button Skeleton */}
                <div className="h-4 bg-white/10 rounded-full w-1/3"></div>
            </div>

            {/* Shimmer Effect */}
            <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />
        </div>
    );
};

export default CourseSkeleton;
