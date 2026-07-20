import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

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

  return (
    <footer className="footer">
      <div className="footer-divider" />
      <div className="footer-content">
        <div className="footer-item">ATELIER - PARIS</div>
        <div className="footer-clock">
          [&nbsp;<span className="live-pulse-dot">•</span>&nbsp;{timeStr || '00 : 00 : 00'}&nbsp;]
        </div>
        <div className="footer-socials">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            LINKEDIN +
          </a>
        </div>
      </div>
    </footer>
  );
}
