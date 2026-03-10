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
    // Determine if we should show the splash screen immediately
    const splashShownPref = (() => {
        try {
            return !!localStorage.getItem('splash_shown');
        } catch (e) {
            return true;
        }
    })();

    const [isSplashDone, setIsSplashDone] = useState(splashShownPref);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 overflow-x-hidden relative">
            <AnimatePresence>
                {!isSplashDone && (
                    <SplashScreen key="splash" onFinish={() => setIsSplashDone(true)} />
                )}
            </AnimatePresence>

            {/* Render app content immediately if splash is done, otherwise animate it in */}
            {isSplashDone ? (
                <Router>
                    <AppContent isSplashDone={true} />
                </Router>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Router>
                        <AppContent isSplashDone={false} />
                    </Router>
                </motion.div>
            )}
        </div>
    );
}

export default App;
