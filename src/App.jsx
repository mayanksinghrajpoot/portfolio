import React, { useState } from 'react';
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import CVModal from './components/ui/CVModal';
import CVTrigger from './components/ui/CVTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);

  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="bg-[#050505] min-h-screen text-white">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
        
        <CVTrigger onClick={() => setIsCVOpen(true)} />
        <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
      </main>
    </SmoothScroll>
  );
}

export default App;