import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import PipelineNode from '../components/PipelineNode';
import PipelineConnector from '../components/PipelineConnector';
import NeuralNetwork from '../components/NeuralNetwork';
import CourseCard from '../components/CourseCard';
import { useTheme } from '../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://${window.location.hostname}:5001`
        : "https://learning-recommender-backend.onrender.com");

const STAGES = [
    { id: 1, title: 'User Input', icon: '📝', color: 'blue', description: 'Raw text input received' },
    { id: 2, title: 'Preprocessing', icon: '⚙️', color: 'cyan', description: 'Cleaning and tokenizing text' },
    { id: 3, title: 'DistilBERT', icon: '🧠', color: 'purple', description: 'Predicting student level' },
    { id: 4, title: 'Embedding', icon: '🔤', color: 'pink', description: 'Creating semantic vector' },
    { id: 5, title: 'FAISS Search', icon: '🔍', color: 'orange', description: 'Searching 888 courses' },
    { id: 6, title: 'Results', icon: '🎯', color: 'green', description: 'Generating recommendations' },
];

const Pipeline = () => {
    const [profile, setProfile] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [completedStages, setCompletedStages] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const [showDetail, setShowDetail] = useState(null);
    const [typedText, setTypedText] = useState('');
    const timerRef = useRef(null);
    const { isDark } = useTheme();

    const examples = [
        { label: "🐍 Python Beginner", text: "I am a beginner who knows basic math. I want to learn Python programming from scratch." },
        { label: "🤖 ML Engineer", text: "I know Python and linear algebra. I want to learn how to build and deploy Machine Learning models." },
        { label: "📊 Data Scientist", text: "I am a data analyst. I want to learn data visualization, SQL, and statistical modeling." },
        { label: "🔒 Cybersecurity Expert", text: "I am interested in network security, ethical hacking, and protecting systems from threats." },
    ];

    const resetPipeline = () => {
        setIsRunning(false);
        setCurrentStage(0);
        setCompletedStages([]);
        setElapsedTime(0);
        setApiData(null);
        setError(null);
        setTypedText('');
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const startPipeline = async () => {
        if (!profile.trim()) return;
        resetPipeline();
        setIsRunning(true);
        setError(null);

        // Start Elapsed Timer
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
            setElapsedTime(((Date.now() - startTime) / 1000).toFixed(1));
        }, 100);

        // STAGE 1: User Input (2s)
        setCurrentStage(1);
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            setTypedText(profile.slice(0, charIndex + 1));
            charIndex++;
            if (charIndex >= profile.length) clearInterval(typeInterval);
        }, Math.max(20, 2000 / profile.length));

        await new Promise(r => setTimeout(r, 2000));
        setCompletedStages(prev => [...prev, 1]);

        // STAGE 2: Preprocessing (2.5s)
        setCurrentStage(2);
        // Start API call in background during preprocessing
        const apiPromise = axios.post(`${API_URL}/recommend`, { profile }).catch(err => {
            setError("API Error: " + (err.response?.data?.error || err.message));
            return null;
        });

        await new Promise(r => setTimeout(r, 2500));
        setCompletedStages(prev => [...prev, 2]);

        // STAGE 3: DistilBERT (3s)
        setCurrentStage(3);
        const response = await apiPromise;
        if (response) setApiData(response.data);
        await new Promise(r => setTimeout(r, 3000));
        setCompletedStages(prev => [...prev, 3]);

        // STAGE 4: Embedding (2s)
        setCurrentStage(4);
        await new Promise(r => setTimeout(r, 2000));
        setCompletedStages(prev => [...prev, 4]);

        // STAGE 5: FAISS Search (2.5s)
        setCurrentStage(5);
        await new Promise(r => setTimeout(r, 2500));
        setCompletedStages(prev => [...prev, 5]);

        // STAGE 6: Results (2s)
        setCurrentStage(6);
        await new Promise(r => setTimeout(r, 2000));
        setCompletedStages(prev => [...prev, 6]);

        // FINISH
        setIsRunning(false);
        setCurrentStage(0);
        clearInterval(timerRef.current);
    };

    const isNodeActive = (id) => currentStage === id;
    const isNodeComplete = (id) => completedStages.includes(id);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[var(--accent-primary)] mb-2 block">Visual Debugger</span>
                <h1 className="text-3xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-4">AI Pipeline</h1>
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium px-4">Watch how your profile transforms into personalized course recommendations in real time.</p>
            </div>

            {/* Top Section - Input */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-2xl relative overflow-hidden group backdrop-blur-3xl">
                        <textarea
                            value={profile}
                            onChange={(e) => setProfile(e.target.value)}
                            placeholder="Describe your learning goals..."
                            disabled={isRunning}
                            className="w-full bg-transparent p-2 md:p-4 text-[var(--text-primary)] text-base md:text-lg placeholder-[var(--text-muted)] focus:outline-none resize-none h-32 md:h-44 font-medium"
                        />
                        <div className="flex flex-col md:flex-row justify-between items-center mt-4 border-t border-[var(--border-color)] pt-4 gap-4">
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {examples.map((ex) => (
                                    <button
                                        key={ex.label}
                                        onClick={() => setProfile(ex.text)}
                                        disabled={isRunning}
                                        className="px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] text-[8px] md:text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex-1 md:flex-none whitespace-nowrap"
                                    >
                                        {ex.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={startPipeline}
                                disabled={isRunning || !profile.trim()}
                                className={`w-full md:w-auto px-8 py-4 md:py-3 rounded-xl md:rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2 transition-all ${isRunning || !profile.trim() ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)] opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] text-white hover:scale-105 shadow-[var(--accent-glow)]'}`}
                            >
                                <span>▶</span>
                                <span>Run Pipeline</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden backdrop-blur-3xl">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-primary)] mb-6">Status Dashboard</span>
                        <div className="w-full bg-[var(--bg-secondary)] h-2 rounded-full mb-8 overflow-hidden border border-[var(--border-color)]">
                            <motion.div
                                animate={{ width: `${(completedStages.length / 6) * 100}%` }}
                                className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)] shadow-[0_0_10px_var(--accent-glow)]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 w-full">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-[var(--text-primary)]">{elapsedTime}s</span>
                                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-widest">Elapsed Time</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-[var(--text-primary)]">{completedStages.length}/6</span>
                                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-widest">Stages Clear</span>
                            </div>
                        </div>
                        <div className="mt-8 text-xs font-mono text-[var(--accent-primary)] animate-pulse font-bold">
                            {isRunning ? `RUNNING: ${STAGES[currentStage - 1]?.title}...` : completedStages.length === 6 ? 'PIPELINE_COMPLETE_SUCCESS' : 'SYSTEM_IDLE_AWAITING_INPUT'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Section - Pipeline Visualization */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[4rem] p-10 mb-12 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

                {/* Visual Flow Container */}
                <div className="flex flex-col lg:flex-row items-center justify-between relative px-4 py-10 space-y-12 lg:space-y-0">
                    {STAGES.map((stage, index) => (
                        <React.Fragment key={stage.id}>
                            <div onClick={() => setShowDetail(stage.id)} className="cursor-pointer">
                                <PipelineNode
                                    stage={stage}
                                    isActive={isNodeActive(stage.id)}
                                    isComplete={isNodeComplete(stage.id)}
                                    status={isRunning ? "Processing..." : "Ready"}
                                />
                            </div>
                            {index < STAGES.length - 1 && (
                                <PipelineConnector
                                    isActive={isNodeActive(stage.id) || isNodeActive(stage.id + 1)}
                                    isComplete={isNodeComplete(stage.id) && isNodeComplete(stage.id + 1)}
                                    color={stage.color}
                                    isVertical={window.innerWidth < 1024}
                                    label={
                                        stage.id === 1 ? "Raw Text" :
                                            stage.id === 2 ? "Tokens" :
                                                stage.id === 3 ? "Level: " + (apiData?.level || "...") :
                                                    stage.id === 4 ? "768-Dim Vector" :
                                                        "Top Matches"
                                    }
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* dynamic visual area based on current stage */}
                <div className="mt-12 h-64 border-t border-[var(--border-color)] pt-12">
                    <AnimatePresence mode="wait">
                        {currentStage === 1 && (
                            <motion.div key="stage1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                <span className="text-xs font-mono text-blue-400 mb-4 tracking-widest uppercase">Stream: profile_input.txt</span>
                                <div className="bg-[var(--bg-primary)] border border-blue-500/30 p-4 rounded-xl w-full max-w-2xl font-mono text-sm text-blue-400 shadow-xl overflow-hidden min-h-[100px]">
                                    {typedText}<span className="animate-pulse">_</span>
                                </div>
                            </motion.div>
                        )}
                        {currentStage === 2 && (
                            <motion.div key="stage2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                <span className="text-xs font-mono text-cyan-400 mb-4 tracking-widest uppercase">NLP Preprocessing Engine</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                                    <div className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)]">
                                        <span className="text-[10px] text-[var(--text-muted)] block mb-2 uppercase font-bold">Original</span>
                                        <div className="text-xs text-[var(--text-secondary)] h-16 overflow-hidden">{profile}</div>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-primary)] rounded-xl border border-cyan-500/20">
                                        <span className="text-[10px] text-cyan-500 block mb-2 uppercase font-bold">Tokenized</span>
                                        <div className="text-xs text-cyan-400 font-mono h-16 overflow-hidden flex flex-wrap gap-1">
                                            {profile.split(' ').map((word, i) => <span key={i} className="inline-block px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded border border-[var(--border-color)]">{word}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentStage === 3 && (
                            <motion.div key="stage3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
                                <span className="text-xs font-mono text-purple-400 mb-4 tracking-widest uppercase">DistilBERT Classifier Inference</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                                    <NeuralNetwork isActive={true} />
                                    <div className="flex flex-col justify-center space-y-4">
                                        {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                                            const isTarget = lvl === apiData?.level;
                                            return (
                                                <div key={lvl} className="relative">
                                                    <div className="flex justify-between text-[10px] font-black uppercase text-[var(--text-muted)] mb-1">
                                                        <span>{lvl}</span>
                                                        <span>{isTarget ? apiData.confidence : (Math.random() * 5).toFixed(1) + '%'}</span>
                                                    </div>
                                                    <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden border border-[var(--border-color)]">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: isTarget ? apiData.confidence : '5%' }}
                                                            className={`h-full ${isTarget ? 'bg-purple-500' : 'bg-[var(--bg-primary)]'}`}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentStage === 4 && (
                            <motion.div key="stage4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                <span className="text-xs font-mono text-pink-400 mb-4 tracking-widest uppercase">768-Dimensional Embedding Space</span>
                                <div className="grid grid-cols-24 gap-1 w-full max-w-2xl px-2">
                                    {Array.from({ length: 96 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.01 }}
                                            className="h-8 bg-pink-500/20 border border-pink-500/20"
                                            style={{ height: `${20 + Math.random() * 40}px` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {currentStage === 5 && (
                            <motion.div key="stage5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                <span className="text-xs font-mono text-orange-400 mb-4 tracking-widest uppercase">FAISS Index Search (888 Nodes)</span>
                                <div className="grid grid-cols-12 md:grid-cols-24 gap-1 w-full max-w-2xl px-2">
                                    {Array.from({ length: 120 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={Math.random() > 0.9 ? { backgroundColor: "#f97316", scale: 1.5, zIndex: 10 } : {}}
                                            className="w-2 h-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                                        />
                                    ))}
                                </div>
                                <div className="mt-8 text-xs font-mono text-[var(--text-muted)]">
                                    Latency: 12ms | Clusters: 4 | GPU_Accel: {isDark ? 'NVIDIA_CUDA' : 'WEB_GL'}
                                </div>
                            </motion.div>
                        )}
                        {currentStage === 6 && (
                            <motion.div key="stage6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                                <span className="text-xs font-mono text-emerald-500 mb-4 tracking-widest uppercase">Knowledge Graph Synthesis</span>
                                <div className="text-center font-black text-emerald-500 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] animate-bounce shadow-xl">
                                    CONSTRUCTING PERSONALIZED PATHWAY...
                                </div>
                            </motion.div>
                        )}
                        {!isRunning && completedStages.length === 6 && apiData && (
                            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                                <h2 className="text-3xl font-black text-emerald-500 mb-4 animate-pulse">Pipeline Execution Successful</h2>
                                <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Neural synthesis complete. Based on your profile, we detected an <b>{apiData.level}</b> proficiency level and identified {apiData.courses.length} high-match educational pathways.</p>
                                <div className="flex space-x-4 mt-8">
                                    <button onClick={resetPipeline} className="px-6 py-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--bg-primary)] border border-[var(--border-color)] transition-all"> Reset Engine </button>
                                    <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-6 py-2 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/30"> View Results </button>
                                </div>
                            </motion.div>
                        )}
                        {!isRunning && completedStages.length === 0 && (
                            <div className="flex items-center justify-center h-full text-[var(--text-muted)] font-black text-xl md:text-3xl tracking-[0.3em] uppercase opacity-20">
                                Pipeline Engine Offline
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-3xl text-rose-500 text-center mb-12 font-black shadow-xl backdrop-blur-xl">
                    🚨 SYSTEM INTERRUPT: {error}
                </div>
            )}

            {/* Bottom Results Section */}
            {apiData && !isRunning && completedStages.length === 6 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {apiData.courses.map((course, idx) => (
                            <CourseCard key={idx} course={course} index={idx} />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Hidden technical detail modal/overlay would go here based on showDetail */}
        </motion.div>
    );
};

export default Pipeline;
