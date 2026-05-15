import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TagProps {
  children: React.ReactNode;
  Icon?: LucideIcon;
  variant?: 'default' | 'primary';
}

/**
 * Pill-shaped label used for tech tags, badges, etc.
 * Variants:
 *   - default: muted slate
 *   - primary: blue-tinted, used for "current" / highlighted items
 */
const Tag: React.FC<TagProps> = ({ children, Icon, variant = 'default' }) => {
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary/10 text-primary border-primary/20'
      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${variantClasses}`}
    >
      {Icon && <Icon size={14} aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Tag;
