import type { Dictionary } from './i18n/dictionaries/en';

/**
 * Section ids that drive the navbar order AND IntersectionObserver scroll-spy.
 * Labels resolved from the active translation dictionary at render time.
 */
export const NAV_ORDER = [
  'about',
  'achievements',
  'careertimeline',
  'aiworkflow',
  'repos',
  'skills',
  'contact',
] as const;

export type NavSectionId = (typeof NAV_ORDER)[number];

/**
 * Resolves localized navbar labels from a dictionary. Centralized so both
 * desktop nav and mobile drawer stay in sync without duplicating the map.
 */
export function getNavItems(
  t: Dictionary,
): Array<{ id: NavSectionId; label: string }> {
  return [
    { id: 'about', label: t.nav.about },
    { id: 'achievements', label: t.nav.achievements },
    { id: 'careertimeline', label: t.nav.career },
    { id: 'aiworkflow', label: t.nav.aiWorkflow },
    { id: 'repos', label: t.nav.repos },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];
}
