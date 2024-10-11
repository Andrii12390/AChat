// components/ThemeSwitcher.tsx
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-1 hover:bg-slate-50 h-fit dark:hover:bg-indigo-500 rounded-md transition-all duration-300">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center justify-center"
      >
        <SunMoon
          size={20}
          className={`${theme === "light" ? "text-black" : "text-white"}`}
        />
      </button>
    </div>
  );
};
