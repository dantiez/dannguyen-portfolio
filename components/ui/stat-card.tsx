import React from 'react';
import type { LucideIcon } from 'lucide-react';
import NumberTicker from './number-ticker';

/** Brand-family accents only (see COLOUR RULE in index.css). */
type StatAccent = 'blue' | 'indigo';

interface StatCardProps {
  Icon: LucideIcon;
  /** Numeric KPI; animated with a count-up when scrolled into view. */
  value: number;
  suffix?: string;
  label: string;
  accent?: StatAccent;
}

const ACCENTS: Record<StatAccent, { icon: string; glow: string; text: string }> = {
  blue: { icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', glow: 'group-hover:shadow-blue-500/20 hover:border-blue-500/50', text: 'from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400' },
  indigo: { icon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', glow: 'group-hover:shadow-indigo-500/20 hover:border-indigo-500/50', text: 'from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400' },
};

/**
 * Numeric KPI card with colour accent, gradient number and count-up.
 */
const StatCard: React.FC<StatCardProps> = ({ Icon, value, suffix, label, accent = 'blue' }) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={`group flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-surface-dark p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${a.glow}`}
    >
      <div className={`p-3 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300 ${a.icon}`}>
        <Icon size={28} aria-hidden="true" />
      </div>
      <p className={`text-4xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${a.text}`}>
        <NumberTicker value={value} suffix={suffix} />
      </p>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  );
};

export default StatCard;
