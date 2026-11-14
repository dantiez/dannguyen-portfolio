import React from 'react';
import type { LucideIcon } from 'lucide-react';
import NumberTicker from './number-ticker';

type StatAccent = 'blue' | 'violet' | 'emerald';

interface StatCardProps {
  Icon: LucideIcon;
  /** Numeric KPI; animated with a count-up when scrolled into view. */
  value: number;
  suffix?: string;
  label: string;
  accent?: StatAccent;
}

const ACCENTS: Record<StatAccent, { icon: string; glow: string; text: string }> = {
  blue: { icon: 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400', glow: 'group-hover:shadow-cyan-500/20 hover:border-cyan-500/50', text: 'from-cyan-500 to-sky-400 dark:from-cyan-300' },
  violet: { icon: 'bg-violet-500/10 text-violet-500', glow: 'group-hover:shadow-violet-500/20 hover:border-violet-500/50', text: 'from-violet-400 to-fuchsia-400' },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-500', glow: 'group-hover:shadow-emerald-500/20 hover:border-emerald-500/50', text: 'from-emerald-400 to-teal-400' },
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
