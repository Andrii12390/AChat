"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "use-intl";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-y-2 mt-2 cursor-pointer">
      <p className="font-semibold border-b border-border pb-1">
        {t("theme.title")}
      </p>
      <div
        className="p-1 hover:bg-hover h-fit rounded-md transition-colors flex justify-between items-center"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <button className="flex items-center justify-center">
          <SunMoon size={20}/>
        </button>
        <p className="text-sm ">
          {t("theme.switch")}
        </p>
      </div>
    </div>
  );
};
