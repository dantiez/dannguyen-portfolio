import React from 'react';

interface TagProps {
  children: React.ReactNode;
  icon?: string;
  variant?: 'default' | 'primary';
}

/**
 * Pill-shaped label used for tech tags, badges, etc.
 * Variants:
 *   - default: muted slate
 *   - primary: blue-tinted, used for "current" / highlighted items
 */
const Tag: React.FC<TagProps> = ({ children, icon, variant = 'default' }) => {
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary/10 text-primary border-primary/20'
      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${variantClasses}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default Tag;
