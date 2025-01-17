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
    <div className="flex flex-col items-center gap-y-2 cursor-pointer">
      <div className="w-full font-semibold border-b border-border">
        {t("locale.title")}
      </div>
      <div className="w-full p-1 flex justify-between items-center hover:bg-hover h-fit  rounded-md transition-colors"
      onClick={handleLocaleSwitch}>
        <Earth size={20}/>
        <button
          className="text-sm"
        >
        {t("locale.change")}
        </button>
      </div>
    </div>
  );
};
