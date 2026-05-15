/**
 * Supported locale codes. Order = display order in the locale switcher.
 */
export type Locale = 'en' | 'vi' | 'ja';

export interface LocaleMeta {
  code: Locale;
  /** English label shown in tooltips / aria-labels */
  label: string;
  /** Native script label shown in the switcher button */
  nativeLabel: string;
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'VI' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Maps the active locale to the value used for <html lang="...">.
 * Kept separate so we can later expand to regional variants (e.g. ja-JP).
 */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  vi: 'vi',
  ja: 'ja',
};
