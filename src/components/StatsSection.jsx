import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, suffix = "", prefix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const spring = useSpring(0, { stiffness: 40, damping: 20 });
    const display = useTransform(spring, (current) =>
        prefix + Math.floor(current) + suffix
    );
    const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

    useEffect(() => {
        if (isInView) {
            spring.set(parseFloat(value));
        }
    }, [isInView, spring, value]);

    useEffect(() => {
        return display.onChange((val) => setDisplayValue(val));
    }, [display]);

    return <span ref={ref}>{displayValue}</span>;
};

const StatsSection = () => {
    const stats = [
        { icon: '📚', label: 'Courses Indexed', value: '888', suffix: '+' },
        { icon: '🧠', label: 'AI Models Fine-tuned', value: '2', suffix: '' },
        { icon: '🎯', label: 'Accuracy Achieved', value: '100', suffix: '%' },
        { icon: '⚡', label: 'Response Time', value: '2', suffix: 's', prefix: '<' },
    ];

    return (
        <section className="relative py-24 bg-[var(--bg-secondary)]/30 border-y border-[var(--border-color)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="text-3xl mb-6 relative">
                                <span className="relative z-10">{stat.icon}</span>
                                <div className="absolute inset-0 bg-[var(--accent-primary)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                            </div>
                            <div className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter">
                                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />
        </section>
    );
};

export default StatsSection;
