import React from 'react';
import {
  Award,
  BadgeCheck,
  Code2,
  GraduationCap,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from './ui/section-header';
import Tag from './ui/tag';

interface TimelineEntry {
  Icon: LucideIcon;
  title: string;
  company: string;
  date: string;
  items: string[];
  tags: string[];
  subtext?: string;
  isCurrent?: boolean;
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    Icon: Award,
    title: 'Fresher / Junior',
    company: 'HOPEE Co., Ltd.',
    date: '11/2024 - Present',
    isCurrent: true,
    items: [
      'Engaged in full-cycle testing for client projects, ensuring high-quality deliverables.',
      'Collaborating with cross-functional teams to resolve complex issues and improve product stability.',
      'Continuing to refine automation skills and contribute to internal QA process improvements.',
    ],
    tags: ['Automation', 'Team Collaboration', 'Quality Control'],
  },
  {
    Icon: BadgeCheck,
    title: 'Probation',
    company: 'HOPEE Co., Ltd.',
    date: '09/2024 - 11/2024',
    items: [
      'Successfully transitioned from intern to probationary employee, taking on increased responsibilities.',
      'Executed regression testing plans and reported critical defects prior to release cycles.',
      'Demonstrated strong understanding of QA methodologies and tool proficiency.',
    ],
    tags: ['Regression Testing', 'Bug Reporting'],
  },
  {
    Icon: GraduationCap,
    title: 'Intern',
    company: 'HOPEE Co., Ltd.',
    date: '06/2024 - 08/2024',
    items: [
      "Gained hands-on experience in manual testing and familiarized with the company's tech stack.",
      'Assisted senior engineers in creating test cases and documentation.',
      'Participated in daily stand-ups and agile processes.',
    ],
    tags: ['Manual Testing', 'Documentation', 'Agile'],
  },
  {
    Icon: Code2,
    title: 'Computer Education',
    company: 'FPT Aptech',
    date: '07/2023 - 05/2024',
    subtext: 'Aptech Computer Education, India – in cooperation with FPT Corporation',
    items: [
      'Completed intensive coursework in software development and testing fundamentals.',
      'Developed foundational knowledge in programming logic, database management, and web technologies.',
      'Participated in practical projects to apply theoretical concepts.',
    ],
    tags: ['Software Development', 'Databases', 'Testing Fundamentals'],
  },
  {
    Icon: Globe,
    title: 'International Student',
    company: 'Japan',
    date: '2019 - 2023',
    items: [
      'Pursued academic studies while adapting to a new cultural environment.',
      'Developed strong cross-cultural communication skills and resilience.',
      'Gained proficiency in the Japanese language and work ethic.',
    ],
    tags: ['Japanese Language', 'Adaptability'],
  },
];

const CareerTimeline: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#151a21] py-20 border-y border-slate-200 dark:border-[#283039]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Professional Journey"
          subtitle="A timeline of my career in Quality Assurance, highlighting key roles, achievements, and educational background."
        />

        <div className="flex flex-col">
          {TIMELINE_ENTRIES.map((entry, idx) => (
            <TimelineItem
              key={`${entry.company}-${entry.date}`}
              {...entry}
              last={idx === TIMELINE_ENTRIES.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps extends TimelineEntry {
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
    ? 'bg-white dark:bg-surface-dark border-primary/30 shadow-[0_0_20px_rgba(19,127,236,0.05)]'
    : 'bg-white dark:bg-card-dark border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600';

  return (
    <div className="grid grid-cols-[48px_1fr] gap-x-4 sm:gap-x-6 group">
      <div className="flex flex-col items-center pt-2">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ring-4 ring-slate-50 dark:ring-[#151a21] z-10 border transition-all duration-300 ${nodeClasses}`}
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
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {company}
              </p>
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
