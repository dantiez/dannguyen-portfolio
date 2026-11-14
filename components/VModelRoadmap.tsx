import React from 'react';
import { GitMerge } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import SectionHeader from './ui/section-header';
import StatusBadge, { type StatusKind } from './ui/status-badge';
import RevealOnScroll from './ui/reveal-on-scroll';

type StageKey = keyof Dictionary['vModel']['stages'];

/**
 * V-model levels. Each level pairs a left-arm (specification) stage with its
 * right-arm (verification) stage; `bottom` is the implementation vertex.
 * Status reflects the owner's honest exposure to each stage.
 */
const LEVELS: Array<{
  left: { key: StageKey; status: StatusKind };
  right: { key: StageKey; status: StatusKind };
}> = [
  { left: { key: 'requirements', status: 'met' }, right: { key: 'acceptance', status: 'met' } },
  { left: { key: 'systemDesign', status: 'met' }, right: { key: 'systemTest', status: 'planned' } },
  { left: { key: 'architecture', status: 'met' }, right: { key: 'integration', status: 'inProgress' } },
  { left: { key: 'unitDesign', status: 'inProgress' }, right: { key: 'unitTest', status: 'inProgress' } },
];
const BOTTOM: { key: StageKey; status: StatusKind } = { key: 'implementation', status: 'inProgress' };

// Horizontal inset per level (in rem) so the cards visually form a "V" on desktop.
const INSETS = ['md:mx-0', 'md:mx-8', 'md:mx-16', 'md:mx-24'];

const VModelRoadmap: React.FC = () => {
  const { t } = useTranslation();
  const vm = t.vModel;

  return (
    <div className="w-full bg-slate-50 dark:bg-background-dark py-20 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          eyebrow={vm.eyebrow}
          EyebrowIcon={GitMerge}
          title={vm.title}
          subtitle={vm.subtitle}
        />

        <div className="hidden md:grid grid-cols-2 mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">
          <span>{vm.leftArm}</span>
          <span className="text-right">{vm.rightArm}</span>
        </div>

        <ol className="flex flex-col gap-3">
          {LEVELS.map((level, i) => (
            <li key={level.left.key}>
              <RevealOnScroll delay={i * 80}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 ${INSETS[i]}`}>
                  <StageCard stage={level.left} vm={vm} />
                  <StageCard stage={level.right} vm={vm} alignRight />
                </div>
              </RevealOnScroll>
            </li>
          ))}
          <li>
            <RevealOnScroll delay={LEVELS.length * 80}>
              <div className="md:mx-auto md:max-w-md">
                <StageCard stage={BOTTOM} vm={vm} />
              </div>
            </RevealOnScroll>
          </li>
        </ol>

        <p className="mt-6 text-center font-mono text-xs text-slate-500">{vm.footnote}</p>
      </div>
    </div>
  );
};

interface StageCardProps {
  stage: { key: StageKey; status: StatusKind };
  vm: Dictionary['vModel'];
  alignRight?: boolean;
}

const StageCard: React.FC<StageCardProps> = ({ stage, vm, alignRight }) => {
  const copy = vm.stages[stage.key];
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark p-4 ${
        alignRight ? 'md:items-end md:text-right' : ''
      }`}
    >
      <div className={`flex w-full items-center justify-between gap-3 ${alignRight ? 'md:flex-row-reverse' : ''}`}>
        <h3 className="font-semibold text-slate-900 dark:text-white">{copy.title}</h3>
        <StatusBadge kind={stage.status} label={vm.status[stage.status]} />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{copy.desc}</p>
    </div>
  );
};

export default VModelRoadmap;
