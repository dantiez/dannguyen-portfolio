import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  Icon: LucideIcon;
  value: string;
  label: string;
}

/**
 * Numeric KPI card. Pass a Lucide icon component (e.g. `Icon={Bug}`).
 */
const StatCard: React.FC<StatCardProps> = ({ Icon, value, label }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-surface-dark p-8 shadow-sm hover:border-primary/50  transition-all duration-300 group">
    <div className="p-3 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
      <Icon size={28} aria-hidden="true" />
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
