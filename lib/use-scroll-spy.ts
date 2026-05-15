import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in view. Uses IntersectionObserver
 * with a viewport top-band so a section becomes "active" as it crosses the
 * upper portion of the screen (matches navbar UX expectations).
 *
 * Skips work when the user prefers reduced motion is irrelevant — the
 * observer itself is cheap and only fires on intersection changes.
 */
export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when section's middle area enters the upper 60% of viewport.
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
