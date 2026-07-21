import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DitheringShader from '../DitheringShader';
import Button from '../ui/Button';
import HeroSlashSlideshow from './HeroSlashSlideshow';
import Footer from '../Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const cyclingPhrases = [
  'From hard problem to working system.',
  'Critical workflows into reliable AI operations.',
];

export default function Hero({ isPreloaded = false, onHoverChange }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSlashHovered, setIsSlashHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const heroRef = useRef(null);
  const phraseRef = useRef(null);

  useEffect(() => {
    if (!isPreloaded) return;

    const ctx = gsap.context(() => {
      // ─── 1. INITIAL LOAD REVEAL ───
      const loadTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.2 },
      });

      // Slash reveal — only animate opacity, CSS handles positioning
      loadTl.fromTo(
        '.hero-center-slash',
        { opacity: 0 },
        { opacity: 0.4, duration: 1.2, ease: 'power2.out' },
        0.1
      );

      loadTl.fromTo(
        '.hero-title-item',
        { opacity: 0, filter: 'blur(20px)', y: 45, scale: 0.95 },
        { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, stagger: 0.12, duration: 1.3 },
        0.2
      );

      loadTl.fromTo(
        '.hero-icon',
        { rotation: -12, scale: 0.7 },
        { rotation: 0, scale: 1, duration: 1.3, ease: 'back.out(1.7)' },
        0.4
      );

      loadTl.fromTo(
        '.hero-sub',
        { opacity: 0, filter: 'blur(14px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1 },
        0.55
      );

      loadTl.fromTo(
        '.hero-tag',
        { opacity: 0, filter: 'blur(12px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0 },
        0.7
      );

      loadTl.fromTo(
        '.hero-cta',
        { opacity: 0, filter: 'blur(12px)', y: 25, scale: 0.92 },
        { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, duration: 1.0, ease: 'back.out(1.4)' },
        0.85
      );

      // ─── 2. Scroll-Driven Black Zoom-Through & Parallax Blur Dispersal Timeline ───
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=45%',
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          immediateRender: false,
          onUpdate: (self) => {
            const scrollActive = self.progress > 0.01;
            setIsScrolling(scrollActive);
            if (scrollActive) setIsSlashHovered(false);
          },
          onLeaveBack: () => {
            setIsScrolling(false);
          },
        },
      });

      // Scale the slash container massively — xPercent/yPercent preserve CSS centering
      scrollTl.fromTo(
        '.hero-center-slash',
        { scale: 1, xPercent: -50, yPercent: -50, opacity: 0.4 },
        { scale: 155, xPercent: -50, yPercent: -50, opacity: 0.4, ease: 'power2.in', duration: 0.6 },
        0
      );

      // Slash frame fills with solid black early
      scrollTl.to(
        '.hero-slash-frame',
        {
          backgroundColor: '#000000',
          borderColor: 'rgba(0,0,0,0)',
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.in',
        },
        0
      );

      // Background canvas zooms and fades to black
      scrollTl.fromTo(
        'canvas',
        { scale: 1, opacity: 1 },
        { scale: 2.2, opacity: 0, duration: 0.5, ease: 'power2.in' },
        0
      );

      // ─── Z-AXIS PARALLAX ZOOM-THROUGH (SCALES OUTWARD FROM SCREEN CENTER) ───
      // Sits at z-30 in front of the slash (z-20)
      // Scales outward from the viewport center to simulate a camera moving through the screen

      // Zoom-out the entire UI viewport wrapper from the center of the screen
      scrollTl.fromTo(
        '.hero-ui-viewport-wrapper',
        { scale: 1, filter: 'blur(0px)', opacity: 1 },
        {
          scale: 3.5,
          filter: 'blur(28px)',
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0
      );

      // Footer simply hides/fades out cleanly
      scrollTl.fromTo(
        '.hero-footer',
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        0
      );
    }, heroRef);

    // Phrase cycling interval
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
    <section className="hero relative w-full h-screen overflow-hidden" ref={heroRef}>
      <DitheringShader isHovered={isButtonHovered || isSlashHovered} isPreloaded={isPreloaded} />

      {/* Interactive Centerpiece Slash — sits at z-index: 20 (behind UI wrapper) */}
      <HeroSlashSlideshow
        isHovered={isSlashHovered}
        onHoverChange={setIsSlashHovered}
        isScrolling={isScrolling}
      />

      {/* Full screen wrapper that scales from the exact center of the viewport */}
      <div className="hero-ui-viewport-wrapper absolute inset-0 w-full h-full z-30 pointer-events-none origin-center">
        {/* Hero UI Container — contains layout details */}
        <div className={`hero-blur-target ${isSlashHovered ? 'is-slashed' : ''} absolute bottom-[125px] sm:bottom-28 md:bottom-[calc(var(--space-3xl)+32px)] left-6 right-6 md:left-14 md:right-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 pointer-events-auto`}>
          {/* Left text container (Title + Subtitle + Tag) */}
          <div className="hero-text-container flex flex-col items-start gap-2.5 max-w-[620px]">
            <div className="hero-title flex flex-wrap gap-1 md:gap-0 items-baseline font-['Clash_Grotesk_Variable',Georgia,serif] text-[clamp(2.35rem,8.5vw,3.4rem)] font-medium tracking-[-1px] md:tracking-[-1.5px] uppercase text-white leading-[1.05]">
              <span className="hero-title-item opacity-0">We Put</span>
              <img
                src="./ai icon.svg"
                alt="AI Icon"
                className="hero-icon hero-title-item h-[0.7em] w-auto translate-y-[0.04em] opacity-0 inline-block align-baseline"
              />

              <div className="w-full basis-full h-0" />

              <img
                src="./arrow.svg"
                alt="Arrow Icon"
                className="hero-icon hero-title-item h-[0.7em] w-auto translate-y-[0.04em] pr-1 opacity-0 inline-block align-baseline"
              />
              <span className="hero-title-item opacity-0">Work</span>
            </div>

            <div className="hero-sub-scroll-wrapper">
              <p className="hero-sub text-sm sm:text-base md:text-[clamp(0.95rem,1.4vw,1.1rem)] font-normal text-white/85 leading-[1.5] md:leading-[1.6] tracking-[-0.01em] font-['Nimbus_Sans',sans-serif] opacity-0">
                Atelier works alongside your team to ship AI systems that create measurable operational value.
              </p>
            </div>

            <div className="hero-tag-scroll-wrapper w-full">
              <div className="hero-tag opacity-0 mt-1">
                <span
                  ref={phraseRef}
                  className="text-sm sm:text-base md:text-[clamp(0.95rem,1.4vw,1.1rem)] font-medium text-[#F3FF0B] font-['Nimbus_Sans',sans-serif] tracking-[-0.01em] block select-none"
                >
                  {cyclingPhrases[phraseIndex]}
                </span>
              </div>
            </div>
          </div>

          {/* Right CTA container */}
          <div className="hero-cta-scroll-wrapper w-full sm:w-[260px] self-start md:self-end mt-1.5 md:mt-0">
            <div className="hero-cta flex flex-col gap-2.5 sm:gap-3 w-full opacity-0">
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
        </div>
      </div>

      {/* Hero Footer */}
      <Footer isPreloaded={isPreloaded} isHeroFooter={true} />
    </section>
  );
}
