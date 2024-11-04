"use client";

import {
  AvatarUploader,
  LocaleSwitcher,
  DeleteAccount,
  SettingsHeader,
  ThemeSwitcher,
} from "@/components";

interface MenuProps {
  avatar: string | null | undefined;
}

export const SettingsMenu = ({ avatar }: MenuProps) => {
  return (
    <div className="bg-white dark:bg-neutral-950/70 flex flex-col h-fit p-4 rounded-md shadow-md">
      <SettingsHeader />
      <ThemeSwitcher />
      <AvatarUploader avatar={avatar} />
      <LocaleSwitcher />
      <DeleteAccount />
    </div>
  );
}
