import React, { useMemo, useState, useEffect } from 'react';
import { getNavItems, NAV_ORDER } from '../lib/nav-items';
import { useScrollSpy } from '../lib/use-scroll-spy';
import { useTranslation } from '../lib/i18n/use-translation';
import ThemeToggle from './ThemeToggle';
import LocaleSwitcher from './LocaleSwitcher';
import MobileMenu from './MobileMenu';
import Tooltip from './ui/tooltip';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => [...NAV_ORDER], []);
  const activeId = useScrollSpy(sectionIds);
  const navItems = getNavItems(t);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Tooltip label={t.a11y.scrollToTop} side="bottom">
              <button
                type="button"
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label={t.a11y.scrollToTop}
              >
                <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-lg text-primary">
                  <ChipCheckIcon />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
                  DAN NGUYEN TIEN
                </span>
              </button>
            </Tooltip>

            <nav className="hidden md:flex items-center space-x-5">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <LocaleSwitcher />
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/25 active:scale-95"
              >
                {t.nav.downloadCv}
              </a>
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <Tooltip label={t.a11y.openMenu} side="bottom">
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="text-slate-600 dark:text-slate-300 p-2"
                  aria-label={t.a11y.openMenu}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  <MenuIcon />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
        activeId={activeId}
      />
    </>
  );
};

/** Logo: microcontroller with a check mark — "verified embedded software". */
const ChipCheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    <path d="m9.5 12 1.75 1.75L14.75 10.25" />
  </svg>
);

const MenuIcon: React.FC = () => (
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
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default Navbar;
