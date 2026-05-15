import React from 'react';
import { useTranslation } from '../lib/i18n/use-translation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full py-8 text-center border-t border-slate-200 dark:border-[#283039] bg-white dark:bg-[#101922]">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Dan Nguyen Tien. {t.footer.rights}
      </p>
    </footer>
  );
};

export default Footer;
