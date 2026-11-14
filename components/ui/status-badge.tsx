import React from 'react';

/**
 * Test-report style verdict badge.
 *   - met:        requirement satisfied by real work experience  (green)
 *   - inProgress: actively being learned / partial evidence        (amber)
 *   - planned:    on the roadmap, no evidence yet                  (slate)
 * Labels are passed in so they can be localized by the caller.
 */
export type StatusKind = 'met' | 'inProgress' | 'planned';

const KIND_CLASSES: Record<StatusKind, string> = {
  met: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  inProgress: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  planned: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/30',
};

const DOT_CLASSES: Record<StatusKind, string> = {
  met: 'bg-emerald-500',
  inProgress: 'bg-amber-500',
  planned: 'bg-slate-400',
};

interface StatusBadgeProps {
  kind: StatusKind;
  label: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ kind, label }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${KIND_CLASSES[kind]}`}
  >
    <span className={`size-1.5 rounded-full ${DOT_CLASSES[kind]}`} aria-hidden="true" />
    {label}
  </span>
);

export default StatusBadge;
