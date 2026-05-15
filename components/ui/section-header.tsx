import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Consistent section heading used across the page.
 * Pattern: optional eyebrow chip → title → underline accent → subtitle.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}) => {
  const alignClasses =
    align === 'center'
      ? 'items-center text-center mx-auto'
      : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClasses}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div
        className={`h-1 w-16 bg-primary rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
      />
      {subtitle && (
        <p className="max-w-lg text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
