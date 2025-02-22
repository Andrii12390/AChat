"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Earth } from "lucide-react";
import { ChangeEventHandler } from "react";

export const LocaleSwitcher = () => {
  const t = useTranslations("Settings");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const options = [
    { value: "uk", label: t("locale.uk") },
    { value: "en", label: t("locale.en") },
    { value: "de", label: t("locale.de") },
    { value: "fr", label: t("locale.fr") },
  ];

  const handleLocaleSwitch: ChangeEventHandler<HTMLSelectElement> = (e) => {
    router.replace({ pathname }, { locale: e.currentTarget.value });
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      <p className="w-full font-semibold border-b border-border pb-1">{t("locale.title")}</p>
      <div className="w-full p-1 flex justify-between items-center h-fit rounded-md transition-colors">
        <Earth size={20} />
        <div className="relative min-w-36">
          <select
            className="block appearance-none w-full bg-modal border border-border py-2 px-3 rounded leading-tight focus:outline-none"
            onChange={handleLocaleSwitch}
            value={locale}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
