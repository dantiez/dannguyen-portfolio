import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import SectionHeader from './ui/section-header';
import StatusBadge, { type StatusKind } from './ui/status-badge';
import RevealOnScroll from './ui/reveal-on-scroll';

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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader
        index="02"
        eyebrow={tr.eyebrow}
        EyebrowIcon={ClipboardCheck}
        title={tr.title}
        subtitle={tr.subtitle}
      />

      {/* Summary line — reads like a test-run footer */}
      <RevealOnScroll>
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
          <span>{tr.summaryLabel}</span>
          <StatusBadge kind="met" label={`${tr.status.met} ${counts.met}`} />
          <StatusBadge kind="inProgress" label={`${tr.status.inProgress} ${counts.inProgress}`} />
          <StatusBadge kind="planned" label={`${tr.status.planned} ${counts.planned}`} />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark">
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
                  <tr key={row.key} className="hover:bg-slate-50/70 dark:hover:bg-card-dark/40 transition-colors">
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
                <li key={row.key} className="flex flex-col gap-1.5 p-4">
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
      </RevealOnScroll>

      <p className="mt-4 font-mono text-xs text-slate-500 dark:text-slate-500">{tr.footnote}</p>
    </div>
  );
};

export default TraceabilityMatrix;
