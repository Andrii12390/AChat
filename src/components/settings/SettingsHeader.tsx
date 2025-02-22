'use client'

import { useTranslations } from "next-intl";

export const SettingsHeader = () => {
  const t = useTranslations("Settings");

  return (
    <h2 className="font-semibold tracking-wide text-xl relative lg:px-48 md:px-40 sm:px-20">
      {t("title")}
    </h2>
  );
};
