import React from 'react';
import {
  ArrowRight,
  AtSign,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"
      >
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column: Info */}
        <div className="flex flex-col space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <Globe
                size={16}
                className="text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Available for Opportunities: GMT+7
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] text-slate-900 dark:text-white">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Found a bug in my code or want to discuss a QA strategy? Drop me
              a line below. I&apos;m precise with my testing and quick with my
              replies.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ContactInfoCard
              Icon={Mail}
              label="Email Address"
              value="dannt4022@gmail.com"
              href="mailto:dannt4022@gmail.com"
            />
            <ContactInfoCard
              Icon={Phone}
              label="Phone Number"
              value="+84 907281361"
              href="tel:+84907281361"
            />
            <ContactInfoCard
              Icon={MapPin}
              label="Base Location"
              value="Hoc Mon District, Ho Chi Minh City, Vietnam"
            />
          </div>

          <div className="pt-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Professional Profiles
            </p>
            <div className="grid grid-cols-1 gap-3">
              <LinkCard
                Icon={FileText}
                title="Download Resume"
                subtitle="Get a PDF copy of my full CV"
                href="/resume.pdf"
              />
              <LinkCard
                Icon={Linkedin}
                title="LinkedIn Profile"
                subtitle="Connect and network"
                href="#"
              />
              <LinkCard
                Icon={Code2}
                title="GitHub Portfolio"
                subtitle="Review my code repositories"
                href="#"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full bg-white dark:bg-[#151a21] rounded-2xl shadow-xl border border-slate-200 dark:border-[#2a3441] p-6 sm:p-8 relative overflow-hidden h-fit">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"
          />
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col flex-1 gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name <span className="text-red-500">*</span>
                </span>
                <input
                  className="w-full rounded-lg border-slate-300 dark:border-[#3b4754] bg-slate-50 dark:bg-[#1c2127] text-slate-900 dark:text-white h-12 px-4 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                  placeholder="Jane Doe"
                  required
                  type="text"
                />
              </label>
              <label className="flex flex-col flex-1 gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address <span className="text-red-500">*</span>
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border-slate-300 dark:border-[#3b4754] bg-slate-50 dark:bg-[#1c2127] text-slate-900 dark:text-white h-12 pl-10 pr-4 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                    placeholder="jane@example.com"
                    required
                    type="email"
                  />
                  <AtSign
                    size={18}
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9dabb9] peer-focus:text-primary transition-colors"
                  />
                </div>
              </label>
            </div>

            <label className="flex flex-col flex-1 gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Subject
              </span>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full appearance-none rounded-lg border-slate-300 dark:border-[#3b4754] bg-slate-50 dark:bg-[#1c2127] text-slate-900 dark:text-white h-12 px-4 pr-10 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                >
                  <option className="text-slate-400" disabled value="">
                    Select a topic
                  </option>
                  <option value="opportunity">Job Opportunity</option>
                  <option value="freelance">Freelance Project</option>
                  <option value="bug">Report a Bug</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </label>

            <label className="flex flex-col flex-1 gap-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message <span className="text-red-500">*</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Max 500 characters
                </span>
              </div>
              <textarea
                className="w-full rounded-lg border-slate-300 dark:border-[#3b4754] bg-slate-50 dark:bg-[#1c2127] text-slate-900 dark:text-white min-h-[160px] p-4 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-y"
                placeholder="Describe your project or inquiry..."
                required
                maxLength={500}
              />
            </label>

            <div className="pt-2">
              <button
                type="submit"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-semibold h-12 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                <span>Send Message</span>
                <Send
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start pt-2">
              <CheckCircle2 size={14} className="text-green-500" aria-hidden="true" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Protected by standard input validation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface ContactInfoCardProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  Icon,
  label,
  value,
  href,
}) => {
  const className =
    'flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] shadow-sm transition-transform hover:scale-[1.01]';
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate ${
            href ? 'hover:text-primary transition-colors' : ''
          }`}
        >
          {value}
        </span>
      </div>
    </>
  );

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

interface LinkCardProps {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  href: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ Icon, title, subtitle, href }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#252b33] border border-transparent hover:border-slate-200 dark:hover:border-[#3b4754] transition-all"
  >
    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#2a323c] text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
      <Icon size={20} aria-hidden="true" />
    </div>
    <div className="flex flex-col flex-1">
      <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
        {title}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {subtitle}
      </span>
    </div>
    <ArrowRight
      size={18}
      className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
      aria-hidden="true"
    />
  </a>
);

export default Contact;
