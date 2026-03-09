import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParticleNetwork = () => {
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const count = window.innerWidth < 1024 ? 30 : 80;
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * -20,
        }));
        setParticles(newParticles);

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-1 overflow-hidden opacity-40">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-purple-400/50"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 40 - 20, 0],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}

            {/* SVG for connections if needed - but sticking to pure dots for performance for now as requested */}
            <svg className="absolute inset-0 w-full h-full">
                {particles.slice(0, 15).map((p, i) => {
                    const target = particles[(i + 1) % particles.length];
                    return (
                        <motion.line
                            key={`line-${i}`}
                            x1={`${p.x}%`}
                            y1={`${p.y}%`}
                            x2={`${target.x}%`}
                            y2={`${target.y}%`}
                            stroke="rgba(168, 85, 247, 0.1)"
                            strokeWidth="0.5"
                            animate={{
                                opacity: [0, 0.2, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                delay: i * 0.5
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default ParticleNetwork;
