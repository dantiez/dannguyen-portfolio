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
                  <BugIcon />
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
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/25 active:scale-95"
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

const BugIcon: React.FC = () => (
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
    <path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4" />
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
