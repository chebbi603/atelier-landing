import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const navStamps = [
  { label: 'HOME', href: '#' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ isPreloaded = false, isLightSurging = false }) {
  const navRef = useRef(null);
  const [activeStamp, setActiveStamp] = useState('HOME');

  useEffect(() => {
    if (!isPreloaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nav-brand, .nav-stamp-item',
        { opacity: 0, filter: 'blur(10px)', y: -18 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.06,
          duration: 1.1,
          delay: 0.1,
          ease: 'power4.out',
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, [isPreloaded]);

  const activeColor = 'text-[#F3FF0B]';
  const inactiveColor = isLightSurging ? 'text-black/65 hover:text-black' : 'text-white/60 hover:text-white';

  return (
    <nav
      ref={navRef}
      className="navbar fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 md:px-14 py-6 md:py-8 pointer-events-auto"
    >
      {/* Brand Logo - Untouched */}
      <a
        href="#"
        className="nav-brand flex items-center transition-opacity duration-300 hover:opacity-85 opacity-0"
        aria-label="Atelier Home"
      >
        <img
          src="/logo.png"
          alt="Atelier Logo"
          className="nav-logo-img h-6 md:h-7 w-auto object-contain block"
        />
      </a>

      {/* Right-Aligned Vertical Scroll Stamps matching reference screenshot */}
      <div className="nav-right flex flex-col items-end gap-1 text-right select-none font-['Clash_Grotesk_Variable',sans-serif]">
        {navStamps.map((stamp) => {
          const isActive = activeStamp === stamp.label;
          return (
            <a
              key={stamp.label}
              href={stamp.href}
              onClick={() => setActiveStamp(stamp.label)}
              className={`nav-stamp-item transition-all duration-300 text-xs md:text-[0.85rem] tracking-widest leading-snug block opacity-0 ${
                isActive
                  ? `${activeColor} font-extrabold opacity-100 translate-x-[-2px]`
                  : `${inactiveColor} hover:opacity-100 font-semibold`
              }`}
            >
              {stamp.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
