import React from 'react';
import {
  ClipboardList,
  FileSearch,
  Languages,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import SectionHeader from './ui/section-header';

type PatternKey = keyof Dictionary['aiWorkflow']['patterns'];

interface PatternStaticEntry {
  key: PatternKey;
  Icon: LucideIcon;
}

/**
 * Static order + icon map. Copy lives in the dictionary so all 3 locales
 * translate the same set.
 */
const PATTERN_STATIC: PatternStaticEntry[] = [
  { key: 'testCaseScaffolding', Icon: ClipboardList },
  { key: 'logTriage', Icon: FileSearch },
  { key: 'syntheticData', Icon: ScrollText },
  { key: 'multilangSync', Icon: Languages },
  { key: 'pairedLearning', Icon: Sparkles },
];

/**
 * AI-Augmented Workflow showcase. Sits between CareerTimeline and Skills
 * to give recruiters a concrete read on *how* AI tooling fits into the
 * day-to-day QA practice — without claiming the candidate tests AI systems.
 */
const AiWorkflow: React.FC = () => {
  const { t } = useTranslation();
  const w = t.aiWorkflow;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader title={w.title} subtitle={w.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PATTERN_STATIC.map(({ key, Icon }) => {
          const card = w.patterns[key];
          return (
            <article
              key={key}
              className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-surface-dark p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(19,127,236,0.1)] hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wide text-slate-800 dark:text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-[#9dabb9] text-sm leading-relaxed">
                {card.desc}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AiWorkflow;
