"use client";
import useRoutes from "../hooks/useRoutes";
import { SidebarItem } from "./";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Sidebar({ children }: { children: React.ReactElement }) {
  const routes = useRoutes();
  return (
    <div className="dark:bg-neutral-950/90 sm:hidden lg:block md:block fixed w-72 overflow-y-auto inset-y-0 border-r border-black/10 dark:border-white/15">
      <ul className="flex justify-between items-center border-b dark:border-white/15  py-2 px-4 shadow-sm dark:shadow-indigo-500">
        {routes.map((item) => (
          <SidebarItem
            key={item.href}
            label={item.label}
            href={item.href}
            isActive={item.isActive}
            icon={item.icon}
          />
        ))}
      </ul>
      {children}
      <div
        className="absolute bottom-2 left-2 p-1 hover:bg-slate-100 rounded-md  dark:hover:bg-indigo-500"
        onClick={() => signOut()}
      >
        <LogOut size={20} />
      </div>
      <div
        className="absolute bottom-2 left-10"
      >
        <ThemeSwitcher/>
      </div>
    </div>
  );
}
