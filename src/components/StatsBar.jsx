import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const StatsBar = () => {
    const stats = [
        { icon: '🎓', value: '888', label: 'Courses', glow: 'shadow-cyan-500/20' },
        { icon: '🤖', value: 'AI', label: 'Powered', glow: 'shadow-indigo-500/20' },
        { icon: '⚡', value: 'Real', label: 'Time', glow: 'shadow-blue-500/20' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const { isDark } = useTheme();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 bg-transparent">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative p-8 rounded-[2.5rem] bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-3xl transform hover:scale-[1.02] transition-all duration-500 overflow-hidden ${!isDark ? 'shadow-xl shadow-purple-500/5' : ''}`}
                >
                    {/* Tech Grid Background Overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-3xl mb-6 shadow-xl border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] transition-colors">
                            {stat.icon}
                        </div>
                        <h3 className="text-4xl font-black text-[var(--text-primary)] mb-2 tracking-tighter">
                            {stat.value}
                        </h3>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            {stat.label}
                        </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsBar;
