import React from 'react';
import { motion } from 'framer-motion';
import AuroraBackground from '../components/AuroraBackground';
import ParticleNetwork from '../components/ParticleNetwork';
import HeroRedesign from '../components/HeroRedesign';
import DemoSection from '../components/DemoSection';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ModelShowcaseSection from '../components/ModelShowcaseSection';
import TopicSection from '../components/TopicSection';
import SampleResultsSection from '../components/SampleResultsSection';
import TechStackSection from '../components/TechStackSection';
import ProjectSection from '../components/ProjectSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col min-h-screen selection:bg-purple-500/30 overflow-x-hidden"
        >
            {/* Global Background Elements */}
            <AuroraBackground />
            <ParticleNetwork />

            {/* main Content Sections */}
            <div className="relative z-10">
                <HeroRedesign />
                <DemoSection />
                <StatsSection />
                <HowItWorksSection />
                <ModelShowcaseSection />
                <TopicSection />
                <SampleResultsSection />
                <TechStackSection />
                <ProjectSection />
                <FinalCTASection />
                <Footer />
            </div>
        </motion.div>
    );
};

export default Home;
