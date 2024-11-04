"use client";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Earth } from 'lucide-react';

export const LocaleSwitcher = () => {
  const t = useTranslations("Settings");

  const pathname = usePathname();

  const router = useRouter();

  const currentLocale = useLocale();

  const handleLocaleSwitch = () => {
    router.replace(
      { pathname },
      { locale: currentLocale === "en" ? "uk" : "en" }
    );
  };
  
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="w-full font-semibold border-b dark:border-white/25 border-neutral-200">
        {t("locale.title")}
      </div>
      <div className="w-full p-1 flex justify-between items-center hover:bg-slate-100 h-fit dark:hover:bg-indigo-500 rounded-md transition-all duration-300"
      onClick={handleLocaleSwitch}>
        <Earth size={20}/>
        <button
          className="text-sm dark:text-gray-300 text-gray-500"
        >
        {t("locale.change")}
        </button>
      </div>
    </div>
  );
};
