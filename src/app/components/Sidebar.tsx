"use client";
import useRoutes from "../hooks/useRoutes";
import { SidebarItem } from "./";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function Sidebar({ children }: { children: React.ReactElement }) {
  const routes = useRoutes();
  return (
    <div className="sm:hidden lg:block md:block fixed w-72 overflow-y-auto inset-y-0 border-r border-black/10 pb-15">
      <ul className="flex justify-between items-center border-b py-2 px-4 shadow-sm">
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
        className="absolute bottom-2 left-2 p-1 hover:bg-slate-100 rounded-md"
        onClick={() => signOut()}
      >
        <LogOut size={20} />
      </div>
    </div>
  );
}
