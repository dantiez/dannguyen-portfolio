import React from 'react';
import Tag from './ui/tag';

interface SkillEntry {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

const SKILLS: SkillEntry[] = [
  {
    icon: 'rule',
    title: 'Testing Knowledge',
    desc: 'Functional, Regression, Smoke, Sanity, UAT, Black Box Testing, Exploratory Testing',
    tags: ['Functional', 'Regression'],
  },
  {
    icon: 'plagiarism',
    title: 'Requirement Analysis',
    desc: 'User Stories, Acceptance Criteria, Risk Analysis, Traceability Matrix',
    tags: ['Jira', 'Confluence'],
  },
  {
    icon: 'account_tree',
    title: 'Process',
    desc: 'Agile/Scrum, SDLC, STLC, Bug Life Cycle, Sprint Planning',
    tags: ['Agile', 'Scrum'],
  },
  {
    icon: 'api',
    title: 'API & Backend',
    desc: 'REST API, Postman, JSON/XML validation, Status Codes verification',
    tags: ['Postman', 'REST'],
  },
  {
    icon: 'database',
    title: 'Database',
    desc: 'SQL Queries, Data Integrity, Inner/Outer Joins, Data Migration testing',
    tags: ['MySQL', 'PostgreSQL'],
  },
  {
    icon: 'smart_toy',
    title: 'Automation',
    desc: 'Selenium Webdriver basics, Python/Java syntax, Page Object Model concepts',
    tags: ['Selenium', 'Python'],
  },
  {
    icon: 'build',
    title: 'Tools',
    desc: 'Jira, Git, Jenkins, TestRail, Chrome DevTools',
    tags: ['Git', 'Jenkins'],
  },
  {
    icon: 'forum',
    title: 'Communication',
    desc: 'Cross-functional collaboration, Defect Reporting, Technical Documentation',
    tags: ['Slack', 'Zoom'],
  },
];

const Skills: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl md:text-[28px] font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white">
          Skills Summary
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-[#283039] to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </div>
    </div>
  );
};

const SkillCard: React.FC<SkillEntry> = ({ icon, title, desc, tags }) => (
  <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-surface-dark p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(19,127,236,0.1)] hover:-translate-y-1">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
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
