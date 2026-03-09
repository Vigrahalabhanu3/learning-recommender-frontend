import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import About from './pages/About';
import Pipeline from './pages/Pipeline';
import { ThemeProvider } from './context/ThemeContext';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </AnimatePresence>
    );
}

import SplashScreen from './components/SplashScreen';
import OfflineIndicator from './components/OfflineIndicator';
import InstallPrompt from './components/InstallPrompt';

function App() {
    const [showSplash, setShowSplash] = React.useState(!localStorage.getItem('splash_shown'));

    return (
        <ThemeProvider>
            <SplashScreen onFinish={() => setShowSplash(false)} />
            {!showSplash && (
                <Router>
                    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 overflow-x-hidden relative selection:bg-[var(--accent-primary)] selection:text-white">
                        <OfflineIndicator />
                        <InstallPrompt />

                        {/* Dynamic Background Glows - Global but subtle */}
                        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent-primary)] opacity-[0.1] blur-[120px] rounded-full"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 opacity-[0.1] blur-[120px] rounded-full"></div>
                        </div>

                        <Navbar />
                        <div className="relative z-10">
                            <main className="relative z-10 min-h-screen">
                                <AnimatedRoutes />
                            </main>
                        </div>
                    </div>
                </Router>
            )}
        </ThemeProvider>
    );
}

export default App;
