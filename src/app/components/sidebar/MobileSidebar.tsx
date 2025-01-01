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
    <aside className="lg:hidden md:hidden flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>
      <footer className="bg-white dark:bg-neutral-950/90 py-3 sticky bottom-0 w-full z-50">
        <ul className="flex justify-between items-center px-4">
          {routes.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              isActive={item.isActive}
              icon={item.icon}
            />
          ))}

          <Settings avatar={user?.avatar} />
          <div
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-md"
            onClick={() => signOut()}
          >
            <LogOut size={25} />
          </div>
        </ul>
      </footer>
    </aside>
  );
};
