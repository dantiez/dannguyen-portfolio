import React from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import type { Dictionary } from '../lib/i18n/dictionaries/en';
import { SOCIAL } from '../lib/social-links';
import SectionHeader from './ui/section-header';

type RepoKey = keyof Dictionary['repos']['entries'];

interface RepoStaticEntry {
  key: RepoKey;
  name: string;
  language: string;
  /** Tailwind text color class for the language indicator dot */
  langColor: string;
  url: string;
}

/**
 * Static structural list of pinned GitHub repos. Update the array when
 * a new project ships in public; descriptions live in the dictionary
 * so all 3 locales stay in sync.
 *
 * TODO: replace placeholder URLs once the repos are pushed to GitHub.
 */
const REPOS_STATIC: RepoStaticEntry[] = [
  {
    key: 'playwright',
    name: 'qa-playwright-showcase',
    language: 'TypeScript',
    langColor: 'bg-blue-400',
    url: 'https://github.com/dantiez/qa-playwright-showcase',
  },
  {
    key: 'portfolio',
    name: 'dannguyen-portfolio',
    language: 'TypeScript',
    langColor: 'bg-blue-400',
    url: 'https://github.com/dantiez/dannguyen-portfolio',
  },
  {
    key: 'apiCollections',
    name: 'api-test-collections',
    language: 'JSON',
    langColor: 'bg-amber-400',
    url: 'https://github.com/dantiez/api-test-collections',
  },
];

const RepoShowcase: React.FC = () => {
  const { t } = useTranslation();
  const r = t.repos;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader
        eyebrow={r.eyebrow}
        EyebrowIcon={Code2}
        title={r.title}
        subtitle={r.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPOS_STATIC.map(({ key, name, language, langColor, url }) => {
          const card = r.entries[key];
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Code2
                    size={18}
                    className="text-primary shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-mono text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {name}
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-slate-400 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                {card.description}
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${langColor}`}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {language}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors"
        >
          <Code2 size={16} aria-hidden="true" />
          {r.viewAll}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default RepoShowcase;
