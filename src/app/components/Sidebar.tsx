'use client';
import { useState } from "react";
import useRoutes from "../hooks/useRoutes";
import { SidebarItem } from "./";
import { useSession } from "next-auth/react";

export function Sidebar ({children}:{children: React.ReactElement}) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useSession()
  return (
    <div className="fixed w-72 overflow-y-auto inset-y-0 border-r border-black/10 ">
      <ul className="mt-5 flex justify-between items-center border-t border-b py-2 px-4">
        {routes.map((item) => {
          return   <SidebarItem  key={item.href} label={item.label} href={item.href} isActive={item.isActive} icon={item.icon}/>
        })}
      </ul>
      {children}
    </div>
  )
}
