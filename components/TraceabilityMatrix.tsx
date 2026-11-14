import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import SectionHeader from './ui/section-header';
import StatusBadge, { type StatusKind } from './ui/status-badge';
import RevealOnScroll from './ui/reveal-on-scroll';
import NumberTicker from './ui/number-ticker';

/** Status colour tokens shared by the coverage bar, legend and row accents. */
const STATUS_COLORS: Record<StatusKind, { bar: string; row: string; text: string }> = {
  met: { bar: 'bg-gradient-to-r from-emerald-500 to-teal-400', row: 'border-l-emerald-500', text: 'text-emerald-500' },
  inProgress: { bar: 'bg-gradient-to-r from-amber-500 to-orange-400', row: 'border-l-amber-500', text: 'text-amber-500' },
  planned: { bar: 'bg-slate-400/60 dark:bg-slate-600', row: 'border-l-slate-400 dark:border-l-slate-600', text: 'text-slate-400' },
};

type RowKey = keyof Dictionary['traceability']['rows'];

/**
 * Structural data: row order + honest verdict per requirement.
 * Copy (requirement + evidence) is localized in the dictionaries.
 * Update a verdict here when real evidence exists — never upgrade
 * "planned" to "met" without a project or job to point to.
 */
const ROWS: Array<{ key: RowKey; status: StatusKind }> = [
  { key: 'requirements', status: 'met' },
  { key: 'testDesign', status: 'met' },
  { key: 'execution', status: 'met' },
  { key: 'automation', status: 'met' },
  { key: 'vModel', status: 'met' },
  { key: 'git', status: 'met' },
  { key: 'english', status: 'met' },
  { key: 'coverage', status: 'inProgress' },
  { key: 'cpp', status: 'inProgress' },
  { key: 'python', status: 'inProgress' },
  { key: 'can', status: 'inProgress' },
  { key: 'automotive', status: 'inProgress' },
  { key: 'istqb', status: 'inProgress' },
  { key: 'simulink', status: 'planned' },
  { key: 'canoe', status: 'planned' },
  { key: 'doors', status: 'planned' },
];

const TraceabilityMatrix: React.FC = () => {
  const { t } = useTranslation();
  const tr = t.traceability;
  const counts = ROWS.reduce<Record<StatusKind, number>>(
    (acc, r) => ({ ...acc, [r.status]: acc[r.status] + 1 }),
    { met: 0, inProgress: 0, planned: 0 },
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div aria-hidden="true" className="aurora-blob absolute top-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="aurora-blob absolute bottom-10 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none [animation-delay:-9s]" />
      <SectionHeader
        index="02"
        eyebrow={tr.eyebrow}
        EyebrowIcon={ClipboardCheck}
        title={tr.title}
        subtitle={tr.subtitle}
      />

      {/* Summary line — reads like a test-run footer */}
      {/* Run summary: big counters + stacked coverage bar, like a CI dashboard */}
      <RevealOnScroll>
        <div className="mb-6 grid grid-cols-3 gap-3">
          {(['met', 'inProgress', 'planned'] as const).map((kind) => (
            <div
              key={kind}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-surface-dark/70 backdrop-blur p-4"
            >
              <p className={`text-3xl font-bold ${STATUS_COLORS[kind].text}`}>
                <NumberTicker value={counts[kind]} />
                <span className="text-base font-medium text-slate-400">/{ROWS.length}</span>
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">{tr.status[kind]}</p>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <div className="mb-2 font-mono text-xs text-slate-500 dark:text-slate-400">{tr.summaryLabel}</div>
          <div
            className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
            role="img"
            aria-label={`${tr.status.met} ${counts.met}, ${tr.status.inProgress} ${counts.inProgress}, ${tr.status.planned} ${counts.planned}`}
          >
            {(['met', 'inProgress', 'planned'] as const).map((kind, i) => (
              <div
                key={kind}
                className={`animate-bar-grow ${STATUS_COLORS[kind].bar}`}
                style={{ width: `${(counts[kind] / ROWS.length) * 100}%`, animationDelay: `${i * 250}ms` }}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="border-beam relative rounded-xl">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-xl shadow-primary/5">
          {/* Desktop table */}
          <table className="hidden md:table w-full text-left text-sm">
            <caption className="sr-only">{tr.title}</caption>
            <thead className="bg-slate-50 dark:bg-card-dark/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3 w-20">{tr.columns.id}</th>
                <th scope="col" className="px-4 py-3">{tr.columns.requirement}</th>
                <th scope="col" className="px-4 py-3">{tr.columns.evidence}</th>
                <th scope="col" className="px-4 py-3 w-36">{tr.columns.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ROWS.map((row, i) => {
                const copy = tr.rows[row.key];
                return (
                  <tr
                    key={row.key}
                    className={`border-l-2 ${STATUS_COLORS[row.status].row} hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-colors`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      REQ-{String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{copy.req}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{copy.evidence}</td>
                    <td className="px-4 py-3">
                      <StatusBadge kind={row.status} label={tr.status[row.status]} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Mobile list */}
          <ul className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {ROWS.map((row, i) => {
              const copy = tr.rows[row.key];
              return (
                <li key={row.key} className={`flex flex-col gap-1.5 p-4 border-l-2 ${STATUS_COLORS[row.status].row}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-slate-400">
                      REQ-{String(i + 1).padStart(2, '0')}
                    </span>
                    <StatusBadge kind={row.status} label={tr.status[row.status]} />
                  </div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{copy.req}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{copy.evidence}</p>
                </li>
              );
            })}
          </ul>
        </div>
        </div>
      </RevealOnScroll>

      <p className="mt-4 font-mono text-xs text-slate-500 dark:text-slate-500">{tr.footnote}</p>
    </div>
  );
};

export default TraceabilityMatrix;
