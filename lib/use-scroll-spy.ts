import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in view.
 *
 * Uses scroll position + `getBoundingClientRect()` rather than
 * IntersectionObserver because tall sections (e.g. CareerTimeline with
 * 5 entries) suffered an unfair `intersectionRatio` penalty against
 * shorter neighbors, so the wrong nav item would stay highlighted.
 *
 * Strategy: walk `sectionIds` in document order; pick the LAST section
 * whose top has crossed the trigger line (default 25% of viewport).
 * This produces snappy "top-detection" UX — the highlight changes the
 * moment a section's top scrolls into the upper quarter, matching
 * GitHub docs / Stripe docs sidebar behaviour.
 *
 * Throttled with `requestAnimationFrame` so the listener stays passive.
 */
const TRIGGER_VIEWPORT_FRACTION = 0.25;

export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const compute = () => {
      const triggerY = window.innerHeight * TRIGGER_VIEWPORT_FRACTION;
      let candidate: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY) {
          candidate = id; // last section past trigger wins
        } else {
          // Sections are in document order; once we pass the trigger,
          // every later section is further down → safe to bail.
          break;
        }
      }

      setActiveId((prev) => (prev === candidate ? prev : candidate));
    };

    let rafId = 0;
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
  }, [sectionIds]);

  return activeId;
}
