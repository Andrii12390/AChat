"use client";

import { LogOut } from "lucide-react";
import { SidebarItem, Settings, Loader } from "@/components";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import useRoutes from "@/hooks/useRoutes";

interface SidebarProps {
  children: React.ReactElement;
  user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
  isLoading?: boolean
}

export const MobileSidebar = ({ children, user, isLoading }: SidebarProps) => {
  const routes = useRoutes();

  return (
    <aside className="lg:hidden md:hidden flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {isLoading ? (
          <Loader />
        ): 
         children
        }
      </main>
      <footer className="bg-background py-3 sticky bottom-0 w-full z-50">
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
            className="p-1 hover:bg-hover transition-colors rounded-md"
            onClick={() => signOut()}
          >
            <LogOut size={25} />
          </div>
        </ul>
      </footer>
    </aside>
  );
};
