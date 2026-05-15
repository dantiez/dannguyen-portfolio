import React from 'react';
import { LOCALES } from '../lib/i18n/types';
import { useTranslation } from '../lib/i18n/use-translation';

/**
 * Compact 3-button toggle (EN / VI / JA). Active locale uses the primary
 * accent. Keyboard accessible via standard tab + Enter / Space.
 */
const LocaleSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t.a11y.switchLocale}
      className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-0.5"
    >
      {LOCALES.map((entry) => {
        const isActive = entry.code === locale;
        return (
          <button
            key={entry.code}
            type="button"
            onClick={() => setLocale(entry.code)}
            aria-pressed={isActive}
            aria-label={entry.label}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-primary'
            }`}
          >
            {entry.nativeLabel}
          </button>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
