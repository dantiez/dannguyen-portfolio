import React, { useCallback, useEffect, useState } from 'react';
import type { Locale } from './types';
import { DEFAULT_LOCALE, HTML_LANG } from './types';
import { LocaleContext } from './locale-context';
import type { Dictionary } from './dictionaries/en';
import en from './dictionaries/en';
import vi from './dictionaries/vi';
import ja from './dictionaries/ja';

const DICTIONARIES: Record<Locale, Dictionary> = { en, vi, ja };
const STORAGE_KEY = 'locale';

function readInitialLocale(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;
  // Mirrors the inline script in index.html so React + DOM agree on mount.
  const fromHtml = document.documentElement.lang as Locale | '';
  if (fromHtml === 'en' || fromHtml === 'vi' || fromHtml === 'ja') return fromHtml;
  return DEFAULT_LOCALE;
}

/**
 * Lazy-loads the Japanese webfont only when locale=ja, avoiding ~70KB
 * download for EN/VI visitors. Stylesheet element is created once.
 */
function ensureJapaneseFont(): void {
  const id = 'noto-jp-font';
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap';
  document.head.appendChild(link);
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore quota / private-mode errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
    if (locale === 'ja') ensureJapaneseFont();
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: DICTIONARIES[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
};
