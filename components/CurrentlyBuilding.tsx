import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';

/**
 * Compact "what I'm working on right now" strip between Hero and
 * Achievements. Signals active learner / growth mindset to the
 * recruiter without expanding into a full case-study section.
 *
 * Kept off the navbar — it's <100px tall and discoverable on scroll.
 */
const CurrentlyBuilding: React.FC = () => {
  const { t } = useTranslation();
  const cb = t.currentlyBuilding;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl border border-accent-ai/20 bg-accent-ai/5 backdrop-blur-sm px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-ai/15 text-accent-ai px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} aria-hidden="true" />
              {cb.eyebrow}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {cb.title}
            </span>
          </div>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
            {cb.items.map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <ChevronRight
                  size={14}
                  className="text-accent-ai mt-1 shrink-0"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyBuilding;
