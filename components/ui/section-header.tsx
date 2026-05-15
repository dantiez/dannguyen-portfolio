import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  EyebrowIcon?: LucideIcon;
  /** Accent used for the eyebrow chip + underline. */
  accent?: 'primary' | 'ai';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Consistent section heading used across the page.
 * Pattern: optional eyebrow chip (icon + label) → title → underline accent → subtitle.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  EyebrowIcon,
  accent = 'primary',
  title,
  subtitle,
  align = 'center',
}) => {
  const alignClasses =
    align === 'center'
      ? 'items-center text-center mx-auto'
      : 'items-start text-left';

  const accentChip =
    accent === 'ai'
      ? 'border-accent-ai/30 bg-accent-ai/10 text-accent-ai'
      : 'border-primary/30 bg-primary/10 text-primary';

  const accentUnderline = accent === 'ai' ? 'bg-accent-ai' : 'bg-primary';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClasses}`}>
      {(eyebrow || EyebrowIcon) && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${accentChip}`}
        >
          {EyebrowIcon && <EyebrowIcon size={14} aria-hidden="true" />}
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div
        className={`h-1 w-16 rounded-full ${accentUnderline} ${align === 'center' ? 'mx-auto' : ''}`}
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
