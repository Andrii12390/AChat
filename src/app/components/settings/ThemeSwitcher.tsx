"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "use-intl";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-y-2 mt-2">
      <div className="font-semibold border-b dark:border-white/25 border-neutral-100">
        {t("theme.title")}
      </div>
      <div
        className="p-1 hover:bg-slate-100 h-fit dark:hover:bg-indigo-500 rounded-md transition-all duration-300 flex justify-between items-center"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <button className="flex items-center justify-center">
          <SunMoon
            size={20}
            className={`${theme === "light" ? "text-black" : "text-white"}`}
          />
        </button>
        <div className="text-sm dark:text-gray-300 text-gray-500">
          {t("theme.switch")}
        </div>
      </div>
    </div>
  );
};
