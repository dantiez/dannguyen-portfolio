import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';

/**
 * Floating "back to top" button visible only when the user has scrolled
 * past ~80% of the document — i.e. when they've reached Contact / Footer
 * and need a quick way back up. Stays hidden during normal mid-scroll
 * so it doesn't clutter the page.
 *
 * Throttled with requestAnimationFrame so the scroll listener stays
 * passive and cheap.
 */
const BackToTop: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const compute = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // Show once the bottom of the viewport reaches the last ~viewport
      // height of the document — comfortably inside the Contact section.
      setVisible(scrollY + viewport >= docHeight - viewport * 0.6);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        compute();
      });
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t.a11y.scrollToTop}
      title={t.a11y.scrollToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-blue-600 hover:scale-110 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
