import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturesSection from './components/Content/FeaturesSection';
import WorkflowSection from './components/Content/WorkflowSection';
import MetricsSection from './components/Content/MetricsSection';
import Footer from './components/Footer/Footer';
import './styles/index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll with custom cubic-bezier easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.stop(); // Lock scroll initially during preloading
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isPreloaded && lenisInstance) {
      lenisInstance.start(); // Unlock scroll once preloader is complete
    }
  }, [isPreloaded, lenisInstance]);

  const handlePreloaderComplete = () => {
    setIsPreloaded(true);
    setTimeout(() => {
      setShowPreloader(false);
    }, 1200);
  };

  return (
    <div className="page bg-black text-white selection:bg-[#F3FF0B] selection:text-black">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Navbar isPreloaded={isPreloaded} isLightSurging={isButtonHovered} />
      <Hero isPreloaded={isPreloaded} onHoverChange={setIsButtonHovered} />
      
      {/* Content sections for testing scroll zoom-through transition */}
      <FeaturesSection />
      <WorkflowSection />
      <MetricsSection />
      
      <Footer isPreloaded={isPreloaded} />
    </div>
  );
}
