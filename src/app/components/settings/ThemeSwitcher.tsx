"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "use-intl";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col gap-y-2 mt-2 cursor-pointer">
      <div className="font-semibold border-b border-border">
        {t("theme.title")}
      </div>
      <div
        className="p-1 hover:bg-hover h-fit rounded-md transition-colors flex justify-between items-center"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <button className="flex items-center justify-center">
          <SunMoon size={20}/>
        </button>
        <div className="text-sm ">
          {t("theme.switch")}
        </div>
      </div>
    </div>
  );
};
