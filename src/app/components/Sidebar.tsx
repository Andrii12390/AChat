"use client";

import useRoutes from "../hooks/useRoutes";
import { SidebarItem, Settings } from "./";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { User } from "@prisma/client";

export function Sidebar({ children, user }: { children: React.ReactElement, user: User }) {
  const routes = useRoutes();
  console.log("avatar ", user)
  return (
    <div className="dark:bg-neutral-950/90 sm:hidden lg:block md:block fixed w-72 overflow-y-auto inset-y-0 border-r border-black/10 dark:border-white/15">
      <div className="w-14 flex flex-col justify-between items-center fixed inset-y-0 border-r border-black/10 dark:border-white/15 py-1">
        <ul className="flex flex-col  gap-y-5 items-center p-2 ">
          {routes.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              isActive={item.isActive}
              icon={item.icon}
            />
          ))}
          <Settings avatar={user?.avatar}/>
        </ul>
        <div
          className="p-1 mb-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-300 rounded-md"
          onClick={() => signOut()}
        >
          <LogOut size={25} />
        </div>
      </div>
      <div className="ml-14">{children}</div>
    </div>
  );
}
