import { useContext } from 'react';
import { LocaleContext } from './locale-context';

/**
 * Direct-access translation hook. Returns the active dictionary plus the
 * locale code and setter, so a component can do both `t.hero.welcomeChip`
 * AND toggle locale without two separate hook calls.
 *
 * Type-safe: `t.unknownKey` is a compile error; rename refactors propagate.
 */
export function useTranslation() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useTranslation must be used inside <LocaleProvider>');
  }
  return ctx;
}
