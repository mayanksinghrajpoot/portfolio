import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import LoadingScreen from './components/ui/LoadingScreen';
import CVModal from './components/ui/CVModal';
import CVTrigger from './components/ui/CVTrigger';

import Hero from './sections/Hero';
import StatsBar from './sections/StatsBar';
import Mission from './sections/Mission';

// Lazy-load heavy below-fold sections to reduce initial bundle
const Projects = lazy(() => import('./sections/Projects'));
const About = lazy(() => import('./sections/About'));
const Timeline = lazy(() => import('./sections/Timeline'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Contact = lazy(() => import('./sections/Contact'));

function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [init, setInit] = useState(false);
  const [isAsciiMode, setIsAsciiMode] = useState(false);

  // ASCII Easter Egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + \ to toggle terminal mode
      if (e.ctrlKey && e.key === '\\') {
        setIsAsciiMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isAsciiMode) document.documentElement.classList.add('ascii-mode');
    else document.documentElement.classList.remove('ascii-mode');
  }, [isAsciiMode]);

  const handleLoadingComplete = React.useCallback(() => {
    setInit(true);
  }, []);

  return (
    <>
      {!init && <LoadingScreen onComplete={handleLoadingComplete} />}

      <SmoothScroll>
        <CustomCursor />
        <ScrollProgress />
        <main
          className="bg-[#050505] min-h-screen text-white origin-center"
        >
          <Navbar />
          <Hero />
          <StatsBar />
          <Mission />
          <Suspense fallback={null}>
            <Projects />
            {/* <CaseStudy /> */}
            {/* <SkillsGlobe /> */}
            <About />
            <Timeline />
            <Testimonials />
            <Contact />
          </Suspense>
          <Footer />

          <CVTrigger onClick={() => setIsCVOpen(true)} />
          <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;