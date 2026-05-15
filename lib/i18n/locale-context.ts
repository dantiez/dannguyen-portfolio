import { createContext } from 'react';
import type { Locale } from './types';
import type { Dictionary } from './dictionaries/en';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

/**
 * Isolated context export so React Fast Refresh can hot-reload the
 * Provider component (which lives in locale-provider.tsx).
 */
export const LocaleContext = createContext<LocaleContextValue | null>(null);
