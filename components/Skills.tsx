import React from 'react';
import {
  Bot,
  Database,
  FileSearch,
  ListChecks,
  MessageSquare,
  Sparkles,
  Webhook,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import Tag from './ui/tag';

type SkillKey = keyof Dictionary['skills']['cards'];

interface SkillStaticEntry {
  key: SkillKey;
  Icon: LucideIcon;
}

const SKILLS_STATIC: SkillStaticEntry[] = [
  { key: 'testing', Icon: ListChecks },
  { key: 'requirements', Icon: FileSearch },
  { key: 'process', Icon: Workflow },
  { key: 'api', Icon: Webhook },
  { key: 'database', Icon: Database },
  { key: 'automation', Icon: Bot },
  { key: 'aiWorkflow', Icon: Sparkles },
  { key: 'tools', Icon: Wrench },
  { key: 'communication', Icon: MessageSquare },
];

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const s = t.skills;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl md:text-[28px] font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white">
          {s.title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-[#283039] to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS_STATIC.map((entry) => {
          const card = s.cards[entry.key];
          return (
            <SkillCard
              key={entry.key}
              Icon={entry.Icon}
              title={card.title}
              desc={card.desc}
              tags={card.tags}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SkillCardProps {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ Icon, title, desc, tags }) => (
  <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-surface-dark p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(19,127,236,0.1)] hover:-translate-y-1">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon size={20} aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold uppercase tracking-wide text-slate-800 dark:text-white">
        {title}
      </h3>
    </div>
    <p className="text-slate-600 dark:text-[#9dabb9] text-sm leading-relaxed flex-grow">
      {desc}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto pt-2">
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  </div>
);

export default Skills;
