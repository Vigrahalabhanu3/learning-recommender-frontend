import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import OfflineIndicator from './components/OfflineIndicator';
import InstallPrompt from './components/InstallPrompt';

// Pages
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import About from './pages/About';
import Pipeline from './pages/Pipeline';

// This component handles the actual content rendering and transitions
const AppContent = ({ isSplashDone }) => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen">
            <Navbar />
            <div className="relative z-10">
                <main className="relative z-10 min-h-screen">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/recommend" element={<Recommend />} />
                            <Route path="/pipeline" element={<Pipeline />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </AnimatePresence>
                </main>
            </div>

            <OfflineIndicator />
            <InstallPrompt />

            {/* Global Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent-primary)] opacity-[0.1] blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 opacity-[0.1] blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
};

function App() {
    const [isSplashDone, setIsSplashDone] = useState(() => {
        // Initial state check to prevent flicker
        try {
            return !!localStorage.getItem('splash_shown');
        } catch (e) {
            return true;
        }
    });

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 overflow-x-hidden relative">
            <AnimatePresence initial={false}>
                {!isSplashDone && (
                    <SplashScreen key="splash" onFinish={() => setIsSplashDone(true)} />
                )}
            </AnimatePresence>

            {/* We render the app container always, but animate it in */}
            <motion.div
                initial={isSplashDone ? { opacity: 1 } : { opacity: 0 }}
                animate={isSplashDone ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ visibility: isSplashDone ? 'visible' : 'hidden' }}
            >
                <Router>
                    <AppContent isSplashDone={isSplashDone} />
                </Router>
            </motion.div>
        </div>
    );
}

export default App;
