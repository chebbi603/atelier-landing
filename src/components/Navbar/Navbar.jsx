import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from '@phosphor-icons/react';

export default function Navbar({ isPreloaded = false }) {
  const navRef = useRef(null);

  useEffect(() => {
    if (!isPreloaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nav-brand, .nav-link',
        { opacity: 0, filter: 'blur(10px)', y: -25 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.08,
          duration: 1.1,
          delay: 0.1,
          ease: 'power4.out',
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, [isPreloaded]);

  return (
    <nav ref={navRef} className="navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-6 md:py-8 pointer-events-auto">
      <a href="#" className="nav-brand flex items-center transition-opacity duration-300 hover:opacity-85 opacity-0" aria-label="Atelier Home">
        <img src="/logo.png" alt="Atelier Logo" className="nav-logo-img h-6 md:h-7 w-auto object-contain block" />
      </a>
      <div className="nav-right flex items-center gap-6 md:gap-8">
        <a href="#about" className="nav-link font-['Nimbus_Sans',sans-serif] text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 opacity-0">
          About
        </a>
        <a href="#contact" className="nav-link font-['Nimbus_Sans',sans-serif] text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 opacity-0">
          <span>Contact</span>
          <ArrowUpRight size={14} weight="bold" className="opacity-60" />
        </a>
      </div>
    </nav>
  );
}
