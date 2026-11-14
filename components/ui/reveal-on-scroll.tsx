import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  /** Stagger delay in ms, useful for lists. */
  delay?: number;
  className?: string;
}

/**
 * Lightweight "blur-fade" reveal (inspired by Magic UI BlurFade) without
 * pulling in framer-motion. Content is visible by default when
 * IntersectionObserver is unavailable (SSR / tests), and the global
 * prefers-reduced-motion rule in index.css collapses the transition.
 */
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window),
  );

  useEffect(() => {
    if (visible || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-3 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
