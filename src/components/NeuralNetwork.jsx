import React from 'react';
import { motion } from 'framer-motion';

const NeuralNetwork = ({ isActive }) => {
    const layers = [
        { id: 'input', nodes: 5 },
        { id: 'hidden1', nodes: 8 },
        { id: 'hidden2', nodes: 6 },
        { id: 'output', nodes: 3 }
    ];

    const nodeVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 }
    };

    return (
        <div className="relative w-full h-48 flex items-center justify-between px-4 overflow-hidden bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
            {layers.map((layer, lIndex) => (
                <div key={layer.id} className="flex flex-col items-center justify-center space-y-2 relative z-10">
                    {Array.from({ length: layer.nodes }).map((_, nIndex) => (
                        <motion.div
                            key={nIndex}
                            variants={nodeVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: lIndex * 0.2 + nIndex * 0.05 }}
                            className={`w-2.5 h-2.5 rounded-full border border-[var(--border-color)] transition-colors duration-500 ${isActive ? 'bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]' : 'bg-[var(--bg-primary)]'}`}
                        />
                    ))}
                </div>
            ))}

            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {layers.slice(0, -1).map((layer, lIndex) => {
                    const nextLayer = layers[lIndex + 1];
                    return Array.from({ length: layer.nodes }).map((_, nIndex) => (
                        Array.from({ length: nextLayer.nodes }).map((_, nextNIndex) => {
                            const x1 = (lIndex / (layers.length - 1)) * 100 + "%";
                            const y1 = (nIndex / (layer.nodes - 1)) * 100 + "%";
                            const x2 = ((lIndex + 1) / (layers.length - 1)) * 100 + "%";
                            const y2 = (nextNIndex / (nextLayer.nodes - 1)) * 100 + "%";

                            return (
                                <motion.line
                                    key={`${lIndex}-${nIndex}-${nextNIndex}`}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke={isActive ? "var(--accent-primary)" : "var(--border-color)"}
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0 }}
                                    animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 1, delay: lIndex * 0.2 }}
                                />
                            );
                        })
                    ));
                })}
            </svg>

            {/* Neural Flow Animation Dots */}
            {isActive && (
                <div className="absolute inset-0 pointer-events-none">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ x: "10%", y: `${20 + i * 15}%`, opacity: 0 }}
                            animate={{ x: "90%", y: `${10 + Math.random() * 80}%`, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "linear"
                            }}
                            className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-glow)]"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NeuralNetwork;
