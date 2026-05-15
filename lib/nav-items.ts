export interface NavItem {
  id: string;
  label: string;
}

/**
 * Single source of truth for navigation order.
 * Order also drives the IntersectionObserver candidates in useScrollSpy.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'careertimeline', label: 'Career' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
