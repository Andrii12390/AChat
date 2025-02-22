"use client";

import {
  AvatarUploader,
  LocaleSwitcher,
  DeleteAccount,
  SettingsHeader,
  ThemeSwitcher,
} from "@/components";

interface MenuProps {
  avatar: string;
}

export const SettingsMenu = ({ avatar }: MenuProps) => {
  return (
    <div className="flex flex-col p-4 rounded-md shadow-md">
      <SettingsHeader />
      <ThemeSwitcher />
      <AvatarUploader avatar={avatar} />
      <LocaleSwitcher />
      <DeleteAccount />
    </div>
  );
}
