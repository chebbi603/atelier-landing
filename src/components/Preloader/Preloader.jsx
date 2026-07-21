import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const barWrapperRef = useRef(null);
  const barFillRef = useRef(null);
  const isAnimatedRef = useRef(false);

  useEffect(() => {
    if (isAnimatedRef.current) return;
    isAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Fill inner bar from 0% to 100% (straight white bar)
      tl.fromTo(
        barFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.1,
          ease: 'power2.inOut',
          transformOrigin: 'bottom center',
        }
      );

      // 2. Skew the bar from 0deg to -35deg to achieve the diagonal logo slash shape
      tl.to(
        barWrapperRef.current,
        {
          skewX: -35,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 3. Morph fill color from white (#ffffff) to neon yellow (#F3FF0B)
      tl.to(
        barFillRef.current,
        {
          backgroundColor: '#F3FF0B',
          boxShadow: '0 0 35px rgba(243, 255, 11, 0.6)',
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // 4. Preloader overlay fades out cleanly (no blur/scale distortion)
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.85,
        ease: 'power2.inOut',
        delay: 0.15,
        onStart: () => {
          if (onComplete) onComplete();
        },
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
    }, containerRef);

    return () => {};
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-auto select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Bar Wrapper that skews from straight to diagonal */}
        <div
          ref={barWrapperRef}
          className="relative w-7 h-40 border border-white/20 overflow-hidden rounded-[1px]"
        >
          {/* Inner Fill that scales Y */}
          <div
            ref={barFillRef}
            className="w-full h-full bg-white origin-bottom"
          />
        </div>
      </div>
    </div>
  );
}
