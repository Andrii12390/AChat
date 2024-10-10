"use client";

import { LogOut } from "lucide-react";
import { SidebarItem } from ".";
import { signOut } from "next-auth/react";
import useRoutes from "../hooks/useRoutes";

export function MobileSidebar({ children }: { children: React.ReactElement }) {
  const routes = useRoutes();
  return (
    <div className="lg:hidden md:hidden w-full flex flex-col gap-y-2 pb-12">
      <ul className="flex justify-between items-center border-b py-3 px-4 shadow-sm overflow-y-auto no-scrollbar">
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
