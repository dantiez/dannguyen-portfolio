import React, { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'careertimeline', label: 'Career' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200 dark:border-[#283039] bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-lg text-primary">
              <span
                className="material-symbols-outlined text-2xl font-bold"
                aria-hidden="true"
              >
                bug_report
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
              DAN NGUYEN TIEN
            </h1>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/25 active:scale-95"
            >
              Download CV
            </button>
          </nav>

          {/* Mobile menu trigger (drawer wired up in Phase 3) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-slate-600 dark:text-slate-300 p-2"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                menu
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
