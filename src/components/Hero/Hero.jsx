import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import DitheringShader from '../DitheringShader';
import Button from '../ui/Button';

const cyclingPhrases = [
  'From hard problem to working system.',
  'Critical workflows into reliable AI operations.',
];

export default function Hero({ isPreloaded = false, onHoverChange }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const heroRef = useRef(null);
  const phraseRef = useRef(null);

  useEffect(() => {
    if (!isPreloaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
          duration: 1.2,
        },
      });

      // 1. Centerpiece yellow outline slash reveal - super subtle ambient watermark (Desktop only)
      tl.fromTo(
        '.hero-center-slash',
        { opacity: 0 },
        { opacity: 0.5, duration: 1.2, ease: 'power2.out' },
        0.1
      );

      // 2. Hero Title items reveal with staggered blur-in + y-rise
      tl.fromTo(
        '.hero-title-item',
        { opacity: 0, filter: 'blur(20px)', y: 45, scale: 0.95 },
        { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, stagger: 0.15, duration: 1.3 },
        0.2
      );

      // 3. AI Icon floating / back-out scale
      tl.fromTo(
        '.hero-icon',
        { rotation: -12, scale: 0.7 },
        { rotation: 0, scale: 1, duration: 1.3, ease: 'back.out(1.7)' },
        0.4
      );

      // 4. Subtitle paragraph blur-in
      tl.fromTo(
        '.hero-sub',
        { opacity: 0, filter: 'blur(14px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1 },
        0.55
      );

      // 5. Prominent cycling accent text blur-in
      tl.fromTo(
        '.hero-tag',
        { opacity: 0, filter: 'blur(12px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0 },
        0.7
      );

      // 6. Button stack reveal with blur-in and spring
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, filter: 'blur(12px)', y: 25, scale: 0.92 },
        { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, duration: 1.0, ease: 'back.out(1.4)' },
        0.85
      );
    }, heroRef);

    // Phrase cycling interval with GSAP blur transition
    const interval = setInterval(() => {
      if (!phraseRef.current) return;

      gsap.to(phraseRef.current, {
        opacity: 0,
        filter: 'blur(8px)',
        y: -10,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          setPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
          gsap.fromTo(
            phraseRef.current,
            { opacity: 0, filter: 'blur(8px)', y: 10 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
            }
          );
        },
      });
    }, 4500);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [isPreloaded]);

  return (
    <section className="relative w-full h-screen overflow-hidden" ref={heroRef}>
      <DitheringShader isHovered={isButtonHovered} isPreloaded={isPreloaded} />

      {/* Desktop Centerpiece Yellow Outline Slash - Exact Preloader Match & Super Subtle Ambient Watermark */}
      <div className="hero-center-slash hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-0">
        <div className="w-7 h-40 -skew-x-[35deg] border border-[#fff]/35 rounded-[1px] shadow-[0_0_20px_rgba(243,255,11,0.12)]" />
      </div>

      <div className="absolute z-10 bottom-[125px] sm:bottom-28 md:bottom-[calc(var(--space-3xl)+32px)] left-6 right-6 md:left-14 md:right-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col items-start gap-2.5 max-w-[620px]">
          <div className="hero-title flex flex-wrap gap-1.5 md:gap-2 items-baseline font-['Clash_Grotesk_Variable',Georgia,serif] text-[clamp(2.35rem,8.5vw,3.4rem)] font-medium tracking-[-1px] md:tracking-[-1.5px] uppercase text-white leading-[1.05]">
            <span className="hero-title-item opacity-0">We Put</span>
            <img
              src="./ai icon.svg"
              alt="AI Icon"
              className="hero-icon hero-title-item h-[0.94em] w-auto translate-y-[0.04em] opacity-0 inline-block align-baseline"
            />
            <span className="hero-title-item opacity-0">To Work</span>
          </div>

          <p className="hero-sub text-sm sm:text-base md:text-[clamp(0.95rem,1.4vw,1.1rem)] font-normal text-white/85 leading-[1.5] md:leading-[1.6] tracking-[-0.01em] font-['Nimbus_Sans',sans-serif] opacity-0">
            Atelier works alongside your team to ship AI systems that create measurable operational value.
          </p>

          {/* Super Clean Cycling Accent Text */}
          <div className="hero-tag opacity-0 mt-1">
            <span
              ref={phraseRef}
              className="text-sm sm:text-base md:text-[clamp(0.95rem,1.4vw,1.1rem)] font-medium text-[#F3FF0B] font-['Nimbus_Sans',sans-serif] tracking-[-0.01em] block select-none"
            >
              {cyclingPhrases[phraseIndex]}
            </span>
          </div>
        </div>

        {/* Stack of Equal-Width Buttons */}
        <div className="hero-cta flex flex-col gap-2.5 sm:gap-3 w-full sm:w-[260px] self-start md:self-end mt-1.5 md:mt-0 opacity-0">
          <div
            className="w-full"
            onMouseEnter={() => {
              setIsButtonHovered(true);
              if (onHoverChange) onHoverChange(true);
            }}
            onMouseLeave={() => {
              setIsButtonHovered(false);
              if (onHoverChange) onHoverChange(false);
            }}
          >
            <Button href="#" className="w-full">Start a conversation</Button>
          </div>
          <Button href="#" variant="outline" className="w-full">Who are we</Button>
        </div>
      </div>
    </section>
  );
}
