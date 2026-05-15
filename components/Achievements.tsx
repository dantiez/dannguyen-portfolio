import React from 'react';
import { ClipboardList, Package, Bug, Sparkles } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import StatCard from './ui/stat-card';

/**
 * "Years of experience" hero + KPI stat cards.
 */
const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const a = t.achievements;

  return (
    <div className="flex flex-col">
      <section className="relative flex flex-col items-center justify-center py-20 lg:py-28 px-4 overflow-hidden hero-pattern">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"
        />
        <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-ai/30 bg-accent-ai/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles size={16} className="text-accent-ai" aria-hidden="true" />
            <span className="text-sm font-semibold text-accent-ai">{a.chip}</span>
          </div>
          <div className="flex flex-col items-center leading-none mb-6">
            <h2 className="text-[120px] sm:text-[160px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-400 dark:from-white dark:to-gray-600">
              {a.yearsCount}
            </h2>
            <span className="text-2xl sm:text-3xl font-bold text-gray-500 dark:text-gray-400 -mt-4 sm:-mt-8">
              {a.yearsLabel}
            </span>
          </div>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {a.tagline}{' '}
            <span className="text-primary font-semibold">{a.taglineHighlight}</span>
            {a.taglineSuffix}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 lg:px-40 bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-[960px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard Icon={Package} value="2+" label={a.stats.projects} />
            <StatCard Icon={Bug} value="200+" label={a.stats.bugs} />
            <StatCard Icon={ClipboardList} value="500+" label={a.stats.testCases} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
