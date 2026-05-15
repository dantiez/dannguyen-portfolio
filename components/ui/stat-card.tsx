import React from 'react';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

/**
 * Numeric KPI card with material icon, used in Achievements section.
 */
const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-surface-dark p-8 shadow-sm hover:border-primary/50 hover:shadow-[0_0_20px_rgba(19,127,236,0.1)] transition-all duration-300 group">
    <div className="p-3 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
      <span className="material-symbols-outlined text-3xl" aria-hidden="true">
        {icon}
      </span>
    </div>
    <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
      {value}
    </p>
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
      {label}
    </p>
  </div>
);

export default StatCard;
