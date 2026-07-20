import React from 'react';

/**
 * Reusable Button component supporting both anchor link and button behaviors.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'boxy',
  className = '',
  type = 'button',
  ...props
}) {
  const combinedClassName = `btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        <span className="btn-text">{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName} {...props}>
      <span className="btn-text">{children}</span>
    </button>
  );
}
