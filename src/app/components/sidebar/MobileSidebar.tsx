"use client";

import { LogOut } from "lucide-react";
import { SidebarItem, Settings } from "@/components";
import { signOut } from "next-auth/react";
import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";

interface SidebarProps {
  children: React.ReactElement;
  user: User;
}

export const MobileSidebar = ({ children, user }: SidebarProps) => {
  const routes = useRoutes();

  return (
    <div className="lg:hidden md:hidden h-dvh flex flex-col gap-y-2">
      <div className="flex-1">{children}</div>
      <ul className="flex justify-between items-center border-t dark:border-white/15 py-3 px-4 shadow-sm overflow-y-auto no-scrollbar">
        {routes.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            isActive={item.isActive}
            icon={item.icon}
          />
        ))}

        <Settings avatar={user?.avatar}/>
        <div
          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-300 rounded-md"
          onClick={() => signOut()}
        >
          <LogOut size={25} />
        </div>
      </ul>
    </div>
  );
}
