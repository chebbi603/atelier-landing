import React, { useState, useEffect } from 'react';

const slideImages = [
  './slides/slide-1.png',
  './slides/slide-2.png',
  './slides/slide-3.png',
];

export default function HeroSlashSlideshow({ isHovered, onHoverChange }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`hero-slash-container hero-center-slash ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      aria-label="Interactive slash showcase"
    >
      <div className="hero-slash-frame">
        {/* Counter-skewed container for upright picture rendering */}
        <div className="hero-slash-inner">
          {slideImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`hero-slash-slide ${index === activeSlide ? 'active' : ''}`}
            />
          ))}
          <div className="hero-slash-overlay" />
        </div>
      </div>
    </div>
  );
}
