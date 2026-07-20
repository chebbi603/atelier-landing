import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, ArrowUpRight } from '@phosphor-icons/react';

export default function Footer({ isPreloaded = false }) {
  const [timeStr, setTimeStr] = useState('');
  const footerRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isPreloaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-divider, .footer-content > *',
        { opacity: 0, filter: 'blur(10px)', y: 25 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          delay: 0.4,
          ease: 'power4.out',
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [isPreloaded]);

  return (
    <footer ref={footerRef} className="footer absolute bottom-0 left-0 right-0 z-50 px-7 md:px-14 pb-6 md:pb-8 bg-transparent pointer-events-auto">
      <div className="footer-divider w-full h-[1px] bg-white/20 mb-4 md:mb-5 opacity-0" />
      <div className="footer-content flex flex-wrap items-center justify-between gap-3 font-mono text-[0.7rem] md:text-xs tracking-wider text-white/60 uppercase select-none">
        <div className="footer-item flex items-center gap-1.5 whitespace-nowrap opacity-0">
          <MapPin size={13} weight="fill" className="text-white/40" />
          <span>ATELIER - PARIS</span>
        </div>
        <div className="footer-clock font-mono text-white/70 whitespace-nowrap tracking-widest opacity-0">
          [&nbsp;<span className="live-pulse-dot text-[#F3FF0B] inline-block animate-pulse">•</span>&nbsp;{timeStr || '00 : 00 : 00'}&nbsp;]
        </div>
        <div className="footer-socials flex items-center gap-6 opacity-0">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors duration-200"
          >
            <span>LINKEDIN</span>
            <ArrowUpRight size={13} weight="bold" className="opacity-70" />
          </a>
        </div>
      </div>
    </footer>
  );
}
