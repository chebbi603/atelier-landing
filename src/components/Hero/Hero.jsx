import React from 'react';
import DitheringShader from '../DitheringShader';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="hero">
      <DitheringShader />
      
      <div className="hero-content">
        <h1 className="hero-title">Next-generation infrastructure</h1>
        <p className="hero-sub">Built for high-performance teams scaling into the future.</p>
        
        <div className="hero-cta">
          <Button href="#">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
