import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import './styles/index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll with custom cubic-bezier easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

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

  const handlePreloaderComplete = () => {
    setIsPreloaded(true);
    setTimeout(() => {
      setShowPreloader(false);
    }, 1200);
  };

  return (
    <div className="page">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Navbar isPreloaded={isPreloaded} isLightSurging={isButtonHovered} />
      <Hero isPreloaded={isPreloaded} onHoverChange={setIsButtonHovered} />
      <Footer isPreloaded={isPreloaded} />
    </div>
  );
}
