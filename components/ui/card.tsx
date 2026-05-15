import React from 'react';

interface CardProps {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
}

/**
 * Generic surface card. `highlighted=true` adds primary accent + glow,
 * used for "current role" / featured items.
 */
const Card: React.FC<CardProps> = ({
  children,
  highlighted = false,
  className = '',
}) => {
  const baseClasses =
    'rounded-xl border bg-white dark:bg-card-dark shadow-sm transition-all duration-300';
  const stateClasses = highlighted
    ? 'border-primary/30 dark:bg-surface-dark '
    : 'border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600';

  return (
    <div className={`${baseClasses} ${stateClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
