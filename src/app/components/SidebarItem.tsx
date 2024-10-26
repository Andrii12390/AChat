"use client";

import Link from "next/link";

interface SidebarItemProps {
  isActive: boolean;
  href: string;
  icon: any;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  isActive,
  icon: Icon,
}) => {
  return (
    <li className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-300 rounded-md">
      <Link
        href={href}
        className={`${
          isActive && "text-blue-500 dark:text-indigo-500"
        } transition duration-300`}
      >
          <Icon size={25} />
      </Link>
    </li>
  );
};
