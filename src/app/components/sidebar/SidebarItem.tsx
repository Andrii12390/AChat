"use client";

import { Link } from "@/i18n/routing";

import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  isActive: boolean;
  href: string;
  icon: LucideIcon;
}

export const SidebarItem = ({ href, isActive, icon: Icon }: SidebarItemProps) => {
  return (
    <li className="p-1 hover:bg-hover transition-colors rounded-md">
      <Link
        href={href}
        className={`${
          isActive && "text-primary-foreground"
        }`}
      >
        <Icon size={25} />
      </Link>
    </li>
  );
};
