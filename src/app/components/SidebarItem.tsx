"use client";

import Link from "next/link";

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  href: string;
  icon: any;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  isActive,
  icon: Icon,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex flex-col items-center justify-center ${
          isActive && "text-blue-500"
        } hover:text-blue-500 transition duration-300`}
      >
        <Icon size={20} />
        <div>{label}</div>
      </Link>
    </li>
  );
};
