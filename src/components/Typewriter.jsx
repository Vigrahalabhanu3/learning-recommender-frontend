import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Typewriter = ({ phrases }) => {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(100);

    useEffect(() => {
        const handleType = () => {
            const currentPhrase = phrases[index];
            if (!isDeleting) {
                setDisplayText(currentPhrase.substring(0, displayText.length + 1));
                setSpeed(100);
                if (displayText.length === currentPhrase.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setDisplayText(currentPhrase.substring(0, displayText.length - 1));
                setSpeed(50);
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        };

        const timer = setTimeout(handleType, speed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, index, phrases, speed]);

    return (
        <div className="h-8 flex items-center justify-center font-mono text-indigo-400/80 text-sm tracking-widest uppercase">
            <span>{"> "}</span>
            <span className="ml-2">{displayText}</span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-0.5 w-2 h-4 bg-indigo-500"
            />
        </div>
    );
};

export default Typewriter;
