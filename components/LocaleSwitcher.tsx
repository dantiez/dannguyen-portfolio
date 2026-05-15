import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { LOCALES } from '../lib/i18n/types';
import { useTranslation } from '../lib/i18n/use-translation';
import Tooltip from './ui/tooltip';

/**
 * Globe-icon dropdown for switching locales. Compact trigger that
 * fits navbar density, expands to a menu listing native + English labels.
 *
 * A11y:
 *   - aria-haspopup + aria-expanded on trigger
 *   - role="menu" + role="menuitem" with aria-current="true" on active
 *   - Escape closes (stops propagation so a parent dialog stays open)
 *   - Click outside closes
 *   - ArrowDown / ArrowUp navigate options
 *   - Focus returns to trigger when menu closes
 */
const LocaleSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const current = LOCALES.find((entry) => entry.code === locale) ?? LOCALES[0];

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Outside click + Escape (stopPropagation so a parent <dialog> drawer ignores it).
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey, true); // capture so we beat parent listeners
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open, close]);

  // Focus first menu item when opening.
  useEffect(() => {
    if (!open) return;
    const activeIdx = LOCALES.findIndex((entry) => entry.code === locale);
    itemRefs.current[activeIdx >= 0 ? activeIdx : 0]?.focus();
  }, [open, locale]);

  const handleItemKey = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % LOCALES.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + LOCALES.length) % LOCALES.length;
      itemRefs.current[prev]?.focus();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Tooltip label={t.a11y.switchLocale} side="bottom">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={t.a11y.switchLocale}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors text-sm font-semibold"
        >
          <Globe size={16} aria-hidden="true" />
          <span>{current.short}</span>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </Tooltip>

      {open && (
        <ul
          role="menu"
          aria-label={t.a11y.switchLocale}
          className="absolute right-0 top-full mt-2 min-w-[180px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark shadow-xl z-50 py-1 overflow-hidden"
        >
          {LOCALES.map((entry, idx) => {
            const isActive = entry.code === locale;
            return (
              <li key={entry.code} role="none">
                <button
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  type="button"
                  role="menuitem"
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => {
                    setLocale(entry.code);
                    close();
                  }}
                  onKeyDown={(e) => handleItemKey(e, idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-medium">{entry.nativeLabel}</span>
                    {entry.nativeLabel !== entry.label && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {entry.label}
                      </span>
                    )}
                  </span>
                  {isActive && <Check size={16} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocaleSwitcher;
