import React from 'react';
import { ArrowRight, Code2, Globe, Mail, type LucideIcon } from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import { SOCIAL } from '../lib/social-links';
import Tooltip from './ui/tooltip';
import portraitAvif360 from '../images/optimized/portrait-360.avif';
import portraitAvif720 from '../images/optimized/portrait-720.avif';
import portraitWebp360 from '../images/optimized/portrait-360.webp';
import portraitWebp720 from '../images/optimized/portrait-720.webp';
import portraitJpg360 from '../images/optimized/portrait-360.jpg';
import portraitJpg720 from '../images/optimized/portrait-720.jpg';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const hero = t.hero;

  return (
    <div className="relative overflow-hidden pt-14 pb-24 lg:pt-24 lg:pb-32">
      {/* Background decor: dual soft halos hinting at primary + AI accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent-ai/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-fade-in-up">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {hero.welcomeChip}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white">
              DAN NGUYEN TIEN
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 flex flex-col md:flex-row items-center lg:items-start gap-2 justify-center lg:justify-start">
              <span className="text-accent-ai font-mono font-semibold tracking-tight">
                {hero.role}
              </span>
              <span
                aria-hidden="true"
                className="hidden md:inline text-slate-300 dark:text-slate-700"
              >
                |
              </span>
              <span>{hero.specialty}</span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hero.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('careertimeline')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white h-12 px-8 rounded-lg text-base font-bold transition-all shadow-lg shadow-primary/25 active:scale-95"
              >
                <span>{hero.ctaPrimary}</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white h-12 px-8 rounded-lg text-base font-bold transition-all border border-transparent hover:border-slate-400 dark:hover:border-slate-600 active:scale-95"
              >
                {hero.ctaSecondary}
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800/50">
              <SocialIcon Icon={Globe} label={hero.social.linkedin} href={SOCIAL.linkedin} />
              <SocialIcon Icon={Code2} label={hero.social.github} href={SOCIAL.github} />
              <a
                href={`mailto:${SOCIAL.email}`}
                className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Mail size={20} aria-hidden="true" />
                <span className="hidden sm:inline">{SOCIAL.email}</span>
              </a>
            </div>
          </div>

          {/* Visual Profile */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2 mb-10 lg:mb-0">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Soft radial halo replaces the previous spinning orbital rings */}
              <div
                aria-hidden="true"
                className="hero-halo absolute inset-0 rounded-full blur-2xl"
              />

              <div className="absolute inset-0 m-auto w-60 h-60 md:w-80 md:h-80 rounded-full p-[3px] bg-gradient-to-br from-primary/40 via-accent-ai/30 to-transparent z-10">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`${portraitAvif360} 1x, ${portraitAvif720} 2x`}
                    />
                    <source
                      type="image/webp"
                      srcSet={`${portraitWebp360} 1x, ${portraitWebp720} 2x`}
                    />
                    <img
                      src={portraitJpg360}
                      srcSet={`${portraitJpg360} 1x, ${portraitJpg720} 2x`}
                      width="360"
                      height="360"
                      alt={hero.portraitAlt}
                      fetchPriority="high"
                      className="w-full h-full rounded-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </picture>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-0 right-0 md:top-8 md:right-0 z-30">
                <div className="bg-white/90 dark:bg-background-dark/90 backdrop-blur border border-green-500/30 py-2 px-3 md:px-4 rounded-full flex items-center gap-2 md:gap-3 shadow-xl ring-1 ring-green-500/20">
                  <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500" />
                  </span>
                  <span className="text-xs md:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {hero.statusBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SocialIconProps {
  Icon: LucideIcon;
  label: string;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, label, href }) => (
  <Tooltip label={label}>
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary dark:hover:border-primary transition-all duration-300 hover:scale-110"
    >
      <Icon size={20} aria-hidden="true" />
    </a>
  </Tooltip>
);

export default Hero;
