import React from 'react';
import type { LucideIcon } from 'lucide-react';
import NumberTicker from './number-ticker';

/** Brand-family accents only (see COLOUR RULE in index.css). */
type StatAccent = 'cyan' | 'sky' | 'indigo';

interface StatCardProps {
  Icon: LucideIcon;
  /** Numeric KPI; animated with a count-up when scrolled into view. */
  value: number;
  suffix?: string;
  label: string;
  accent?: StatAccent;
}

const ACCENTS: Record<StatAccent, { icon: string; glow: string; text: string }> = {
  cyan: { icon: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', glow: 'group-hover:shadow-cyan-500/20 hover:border-cyan-500/50', text: 'from-cyan-600 to-sky-500 dark:from-cyan-300 dark:to-sky-400' },
  sky: { icon: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', glow: 'group-hover:shadow-sky-500/20 hover:border-sky-500/50', text: 'from-sky-600 to-indigo-500 dark:from-sky-300 dark:to-indigo-400' },
  indigo: { icon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', glow: 'group-hover:shadow-indigo-500/20 hover:border-indigo-500/50', text: 'from-indigo-600 to-cyan-500 dark:from-indigo-300 dark:to-cyan-400' },
};

/**
 * Numeric KPI card with colour accent, gradient number and count-up.
 */
const StatCard: React.FC<StatCardProps> = ({ Icon, value, suffix, label, accent = 'cyan' }) => {
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
