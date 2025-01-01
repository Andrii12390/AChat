"use client";

import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export const SettingsHeader = () => {
  const router = useRouter();

  const t = useTranslations("Settings");

  const onClick = () => {
    router.back();
  };

  return (
    <div className="font-semibold tracking-wide text-xl relative lg:px-48 md:px-40 sm:px-20">
      {t("title")}
      <div
        className="absolute left-0 top-0 p-1 dark:hover:bg-neutral-800 rounded-md hover:bg-slate-100"
        onClick={() => onClick()}
      >
        <ChevronLeft size={20} />
      </div>
    </div>
  );
};
