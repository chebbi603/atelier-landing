import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="nav-brand" aria-label="Nexora Home">
        <img src="/logo.png" alt="Nexora Logo" className="nav-logo-img" />
      </a>
      <div className="nav-right">
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
    </nav>
  );
}
