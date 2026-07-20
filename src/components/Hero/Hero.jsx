import React from 'react';
import DitheringShader from '../DitheringShader';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="hero">
      <DitheringShader />

      <div className="hero-content">
        <div className="hero-title flex gap-2">
          We Put
          <img src="./ai icon.svg" alt="AI Icon" className='w-16 pb-2 pr-6' />
          To Work
        </div>
        <p className="hero-sub">Atelier embeds with ambitious teams to turn their hardest operational problems into production AI systems—designed, built, and run end to end.</p>

        <div className="hero-cta">
          <Button href="#">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
