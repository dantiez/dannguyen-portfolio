import React from 'react';
import {
  Award,
  BadgeCheck,
  Code2,
  GraduationCap,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import SectionHeader from './ui/section-header';
import Tag from './ui/tag';

type TimelineEntryKey = keyof Dictionary['careerTimeline']['entries'];

interface TimelineStaticEntry {
  key: TimelineEntryKey;
  Icon: LucideIcon;
  isCurrent?: boolean;
}

/**
 * Static structural map. Order, icons, and "is current role" flag stay
 * in code; copy lives in the dictionary so all 3 locales translate it.
 */
const TIMELINE_STATIC: TimelineStaticEntry[] = [
  { key: 'hopeeFresher', Icon: Award, isCurrent: true },
  { key: 'hopeeProbation', Icon: BadgeCheck },
  { key: 'hopeeIntern', Icon: GraduationCap },
  { key: 'fptAptech', Icon: Code2 },
  { key: 'japan', Icon: Globe },
];

const CareerTimeline: React.FC = () => {
  const { t } = useTranslation();
  const tl = t.careerTimeline;

  return (
    <div className="w-full bg-slate-50 dark:bg-background-dark py-20 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={tl.title} subtitle={tl.subtitle} />

        <div className="flex flex-col">
          {TIMELINE_STATIC.map((entry, idx) => {
            const copy = tl.entries[entry.key];
            return (
              <TimelineItem
                key={entry.key}
                Icon={entry.Icon}
                isCurrent={entry.isCurrent}
                title={copy.title}
                company={copy.company}
                date={copy.date}
                items={copy.items}
                tags={copy.tags}
                subtext={'subtext' in copy ? (copy as { subtext?: string }).subtext : undefined}
                last={idx === TIMELINE_STATIC.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  Icon: LucideIcon;
  title: string;
  company: string;
  date: string;
  items: string[];
  tags: string[];
  subtext?: string;
  isCurrent?: boolean;
  last?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  Icon,
  title,
  company,
  date,
  items,
  tags,
  subtext,
  isCurrent,
  last,
}) => {
  const nodeClasses = isCurrent
    ? 'bg-primary/20 text-primary border-primary/20'
    : 'bg-white dark:bg-card-dark text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700';

  const cardClasses = isCurrent
    ? 'bg-white dark:bg-surface-dark border-primary/30 '
    : 'bg-white dark:bg-card-dark border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600';

  return (
    <div className="grid grid-cols-[48px_1fr] gap-x-4 sm:gap-x-6 group">
      <div className="flex flex-col items-center pt-2">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ring-4 ring-slate-50 dark:ring-background-dark z-10 border transition-all duration-300 ${nodeClasses}`}
        >
          <Icon size={22} aria-hidden="true" />
        </div>
        {!last && (
          <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-full grow my-2 group-hover:bg-primary/30 transition-colors" />
        )}
      </div>

      <div className="pb-10">
        <div
          className={`rounded-xl p-6 sm:p-8 shadow-sm border transition-all duration-300 ${cardClasses}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3
                className={`text-xl font-bold transition-colors ${
                  isCurrent ? 'text-primary' : 'text-slate-900 dark:text-white'
                }`}
              >
                {title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{company}</p>
              {subtext && (
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  {subtext}
                </p>
              )}
            </div>
            <Tag variant={isCurrent ? 'primary' : 'default'}>{date}</Tag>
          </div>

          <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
