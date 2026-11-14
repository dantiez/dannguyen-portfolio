import React, { useEffect, useRef, useState } from 'react';

interface NumberTickerProps {
  /** Final integer value to count up to. */
  value: number;
  /** Optional suffix such as "+" rendered after the number. */
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` once the element scrolls into view
 * (Magic UI NumberTicker–style, no animation library).
 * Falls back to the final value without IntersectionObserver or
 * when the user prefers reduced motion.
 */
const NumberTicker: React.FC<NumberTickerProps> = ({ value, suffix = '', durationMs = 1400, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const canAnimate =
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [display, setDisplay] = useState(canAnimate ? 0 : value);

  useEffect(() => {
    if (!canAnimate || !ref.current) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setDisplay(Math.round(eased * value));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [canAnimate, value, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
      {suffix}
    </span>
  );
};

export default NumberTicker;
