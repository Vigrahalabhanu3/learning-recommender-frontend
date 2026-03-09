import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] pt-24 pb-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Logo & Info */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-8 group">
                            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🎓</span>
                            <span className="text-2xl font-black text-[var(--text-primary)] tracking-tighter uppercase">LearnAI</span>
                        </Link>
                        <p className="text-[var(--text-secondary)] font-medium max-w-sm leading-relaxed mb-8">
                            A flagship Final Year Project leveraging DistilBERT and FAISS to democratize personalized education matching for students worldwide.
                        </p>
                        <div className="flex space-x-4">
                            {['GitHub', 'LinkedIn', 'Research'].map(link => (
                                <a key={link} href="#" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-primary)] mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Recommend', path: '/recommend' },
                                { name: 'AI Pipeline', path: '/pipeline' },
                                { name: 'About Project', path: '/about' },
                            ].map(item => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Project Meta */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-primary)] mb-8">Project Details</h4>
                        <ul className="space-y-4 text-sm font-bold text-[var(--text-muted)]">
                            <li className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[var(--accent-primary)] opacity-50 mb-1">Degree</span>
                                B.Tech Computer Science
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[var(--accent-primary)] opacity-50 mb-1">University</span>
                                Final Year (2025-26)
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[var(--accent-primary)] opacity-50 mb-1">Architecture</span>
                                Flask + BERT + FAISS
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        © 2026 Personalized Learning Recommender | Built with ❤️ using AI
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        HuggingFace • PyTorch • FAISS • React
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
