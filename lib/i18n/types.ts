/**
 * Supported locale codes. Order = display order in the locale switcher.
 */
export type Locale = 'en' | 'vi' | 'ja';

export interface LocaleMeta {
  code: Locale;
  /** 2-letter short code shown in the compact trigger button */
  short: string;
  /** English name used as a secondary subtitle in the dropdown */
  label: string;
  /** Native script name shown as the primary label inside the dropdown */
  nativeLabel: string;
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', short: 'EN', label: 'English', nativeLabel: 'English' },
  { code: 'vi', short: 'VI', label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
  { code: 'ja', short: 'JP', label: 'Japanese', nativeLabel: '日本語' },
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
