import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  AtSign,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '../lib/i18n/use-translation';
import { SOCIAL } from '../lib/social-links';
import { useContactForm } from '../lib/use-contact-form';

const MESSAGE_MAX = 500;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const c = t.contact;
  const f = c.form;
  const { status, submit, reset, isOffline } = useContactForm();
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Live character counter for the message textarea.
  const [messageLength, setMessageLength] = useState(0);

  // Email validation: show the inline error only after the user has
  // actually interacted with the field (blurred at least once), so a
  // pristine empty form does not look angry.
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget, { honeypot: honeypotRef.current?.value ?? '' });
  };

  const handleSendAnother = () => {
    reset();
    setMessageLength(0);
    setEmailTouched(false);
    setEmailValid(true);
  };

  const isSending = status === 'sending';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const showEmailError = emailTouched && !emailValid;
  const counterTone =
    messageLength >= MESSAGE_MAX
      ? 'text-red-500'
      : messageLength > MESSAGE_MAX * 0.9
        ? 'text-amber-500'
        : 'text-slate-500 dark:text-slate-400';

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
        <div className="flex flex-col space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <Globe
                size={16}
                className="text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                {c.availability}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] text-slate-900 dark:text-white">
              {c.title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              {c.body}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ContactInfoCard
              Icon={Mail}
              label={c.info.emailLabel}
              value={SOCIAL.email}
              href={`mailto:${SOCIAL.email}`}
            />
            <ContactInfoCard
              Icon={Phone}
              label={c.info.phoneLabel}
              value="+84 907 281 361"
              href={`tel:${SOCIAL.phone}`}
            />
            <ContactInfoCard
              Icon={MapPin}
              label={c.info.locationLabel}
              value={c.info.locationValue}
            />
          </div>

          <div className="pt-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              {c.profiles.heading}
            </p>
            <div className="grid grid-cols-1 gap-3">
              <LinkCard
                Icon={FileText}
                title={c.profiles.resume.title}
                subtitle={c.profiles.resume.subtitle}
                href="/resume.pdf"
              />
              <LinkCard
                Icon={Linkedin}
                title={c.profiles.linkedin.title}
                subtitle={c.profiles.linkedin.subtitle}
                href={SOCIAL.linkedin}
              />
              <LinkCard
                Icon={Code2}
                title={c.profiles.github.title}
                subtitle={c.profiles.github.subtitle}
                href={SOCIAL.github}
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-background-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 relative overflow-hidden h-fit">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"
          />
          <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            {/* Honeypot — humans never see it; bots fill any visible input */}
            <input
              ref={honeypotRef}
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col flex-1 gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {f.nameLabel} <span className="text-red-500">{f.required}</span>
                </span>
                <input
                  name="name"
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white h-12 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                  placeholder={f.namePlaceholder}
                  required
                  type="text"
                />
              </label>
              <label className="flex flex-col flex-1 gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {f.emailLabel} <span className="text-red-500">{f.required}</span>
                </span>
                <div className="relative">
                  <input
                    name="email"
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? 'email-error' : undefined}
                    onBlur={(e) => {
                      setEmailTouched(true);
                      setEmailValid(e.target.validity.valid);
                    }}
                    onChange={(e) => {
                      if (emailTouched) setEmailValid(e.target.validity.valid);
                    }}
                    className={`w-full rounded-lg bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white h-12 pl-10 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-1 focus:ring-primary transition-colors text-sm peer ${
                      showEmailError
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                    }`}
                    placeholder={f.emailPlaceholder}
                    required
                    type="email"
                  />
                  <AtSign
                    size={18}
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 peer-focus:text-primary transition-colors"
                  />
                </div>
                {showEmailError && (
                  <p id="email-error" className="text-xs text-red-500 mt-1">
                    {f.emailError}
                  </p>
                )}
              </label>
            </div>

            <label className="flex flex-col flex-1 gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {f.subjectLabel}
              </span>
              <div className="relative">
                <select
                  name="subject"
                  defaultValue=""
                  className="w-full appearance-none rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white h-12 px-4 pr-10 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                >
                  <option className="text-slate-400" disabled value="">
                    {f.subjectPlaceholder}
                  </option>
                  <option value="opportunity">{f.subjectOptions.opportunity}</option>
                  <option value="freelance">{f.subjectOptions.freelance}</option>
                  <option value="bug">{f.subjectOptions.bug}</option>
                  <option value="other">{f.subjectOptions.other}</option>
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
                  {f.messageLabel} <span className="text-red-500">{f.required}</span>
                </span>
                <span className={`text-xs tabular-nums transition-colors ${counterTone}`}>
                  {messageLength}/{MESSAGE_MAX} {f.charCounterLabel}
                </span>
              </div>
              <textarea
                name="message"
                onChange={(e) => setMessageLength(e.target.value.length)}
                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white min-h-[160px] p-4 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-y"
                placeholder={f.messagePlaceholder}
                required
                maxLength={MESSAGE_MAX}
              />
            </label>

            <div className="pt-2">
              {isOffline ? (
                // Form delivery not configured → swap submit for a real
                // mailto link so the recruiter still has a 1-click action.
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-semibold h-12 px-8 rounded-lg transition-colors duration-200"
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>{f.emailMeDirectly}</span>
                </a>
              ) : (
                <button
                  type="submit"
                  disabled={isSending}
                  aria-busy={isSending}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 active:bg-blue-700 disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-white font-semibold h-12 px-8 rounded-lg transition-all duration-200 shadow-md shadow-primary/15 hover:shadow-primary/30"
                >
                  {isSending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      <span>{f.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{f.submit}</span>
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Status messages (aria-live=polite for screen reader announce) */}
            <div aria-live="polite" className="min-h-[24px]">
              {isSuccess && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 space-y-3">
                  <div className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{f.successTitle}</p>
                      <p className="text-xs text-green-700/80 dark:text-green-300/80 mt-1">
                        {f.successBody}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pl-7">
                    <p className="text-xs text-slate-600 dark:text-slate-400 w-full sm:w-auto">
                      {f.successCtaHeading}
                    </p>
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Linkedin size={14} aria-hidden="true" />
                      {c.profiles.linkedin.title}
                    </a>
                    <a
                      href={SOCIAL.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Code2 size={14} aria-hidden="true" />
                      {c.profiles.github.title}
                    </a>
                    <button
                      type="button"
                      onClick={handleSendAnother}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary underline underline-offset-2"
                    >
                      {f.sendAnother}
                    </button>
                  </div>
                </div>
              )}
              {isError && (
                <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{f.errorTitle}</p>
                    <p className="text-xs text-red-700/80 dark:text-red-300/80">
                      {f.errorBody}
                    </p>
                  </div>
                </div>
              )}
              {isOffline && (
                <div className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="text-xs">{f.offlineNote}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start pt-2">
              <CheckCircle2 size={14} className="text-green-500" aria-hidden="true" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {f.validationNote}
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
    'flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:scale-[1.01]';
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
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
  >
    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
      <Icon size={20} aria-hidden="true" />
    </div>
    <div className="flex flex-col flex-1">
      <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
        {title}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
    </div>
    <ArrowRight
      size={18}
      className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
      aria-hidden="true"
    />
  </a>
);

export default Contact;
