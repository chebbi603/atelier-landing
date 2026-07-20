import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

/**
 * Reusable Button component supporting both anchor link and button behaviors,
 * enhanced with Phosphor Icons and hover animation.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'boxy',
  className = '',
  type = 'button',
  icon: Icon = ArrowUpRight,
  showIcon = true,
  ...props
}) {
  const combinedClassName = `btn-${variant} ${className}`.trim();

  const content = (
    <span className="btn-text w-full flex items-center justify-between gap-3">
      <span>{children}</span>
      {showIcon && Icon && (
        <Icon size={18} weight="bold" className="btn-icon shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={`${combinedClassName} group`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${combinedClassName} group`} {...props}>
      {content}
    </button>
  );
}
