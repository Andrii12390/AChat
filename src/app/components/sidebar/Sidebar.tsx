"use client";

import useRoutes from "@/hooks/useRoutes";
import { SidebarItem, Settings, Loader } from "@/components";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { User } from "@prisma/client";

interface SidebarProps {
  children: React.ReactElement;
  user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
  isLoading?: boolean
}

export const Sidebar = ({ children, user, isLoading }: SidebarProps) => {
  const routes = useRoutes();

  return (
    <aside className="sm:hidden lg:block md:block fixed w-72 overflow-y-auto no-scrollbar h-dvh border-r border-border">
      <div className="w-14 flex flex-col justify-between items-center fixed h-dvh border-r border-border py-1">
        <ul className="flex flex-col gap-y-5 items-center p-2">
          {routes.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              isActive={item.isActive}
              icon={item.icon}
            />
          ))}
          <Settings avatar={user?.avatar} />
        </ul>
        <div
          className="p-1 mb-1 hover:bg-hover transition-colors rounded-md cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut size={25} />
        </div>
      </div>
      <div className="ml-14">
       {isLoading ? (
          <Loader/>
        ): 
         children
        }
      </div>
    </aside>
  );
};
