import React from 'react';
import StatCard from './ui/stat-card';

/**
 * "Years of experience" hero + KPI stat cards.
 * Single source of truth for portfolio KPIs (Stats.tsx removed in Phase 1).
 */
const Achievements: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="relative flex flex-col items-center justify-center py-20 lg:py-28 px-4 overflow-hidden hero-pattern">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
            <span
              className="material-symbols-outlined text-[18px] text-primary"
              aria-hidden="true"
            >
              verified
            </span>
            <span className="text-sm font-semibold text-primary">
              QC/QA Engineer
            </span>
          </div>
          <div className="flex flex-col items-center leading-none mb-6">
            <h2 className="text-[120px] sm:text-[160px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-400 dark:from-white dark:to-gray-600">
              2
            </h2>
            <span className="text-2xl sm:text-3xl font-bold text-gray-500 dark:text-gray-400 -mt-4 sm:-mt-8">
              Years of Experience
            </span>
          </div>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Ensuring software reliability through rigorous{' '}
            <span className="text-primary font-semibold">
              Manual &amp; Automated Testing
            </span>
            . I break code so you don&apos;t have to.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 lg:px-40 bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-[960px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              icon="deployed_code"
              value="2+"
              label="Projects Delivered"
            />
            <StatCard icon="bug_report" value="200+" label="Bugs Reported" />
            <StatCard
              icon="assignment"
              value="500+"
              label="Test Cases Written"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
