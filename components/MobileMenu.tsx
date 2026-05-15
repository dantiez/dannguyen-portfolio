import React, { useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';
import type { NavSectionId } from '../lib/nav-items';
import { useTranslation } from '../lib/i18n/use-translation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: NavSectionId; label: string }>;
  activeId: string | null;
}

/**
 * Slide-down drawer for mobile navigation. Lightweight custom impl
 * (no Radix dependency) with:
 *   - Escape key + backdrop click to close
 *   - Body scroll lock while open
 *   - Initial focus on first link
 *   - aria-modal + labelled by visually hidden heading
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, items, activeId }) => {
  const firstLinkRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    firstLinkRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleNavigate = (id: string) => {
    onClose();
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-heading"
      className="fixed inset-0 z-50 md:hidden"
    >
      <button
        type="button"
        aria-label={t.a11y.closeMenu}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <div className="absolute top-0 inset-x-0 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in-up">
        <h2 id="mobile-menu-heading" className="sr-only">
          {t.a11y.siteNav}
        </h2>

        <div className="flex items-center justify-between px-4 h-16">
          <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            {t.nav.menu}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.a11y.closeMenu}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                ref={idx === 0 ? firstLinkRef : undefined}
                type="button"
                onClick={() => handleNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Primary CTA mirrored from the desktop navbar so mobile recruiters
              can grab the resume without scrolling all the way to Contact. */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold transition-colors shadow-md shadow-primary/20"
          >
            <FileText size={18} aria-hidden="true" />
            {t.nav.downloadCv}
          </a>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
