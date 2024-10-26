"use client";

import {
  AvatarUploader,
  SettingsFooter,
  SettingsHeader,
  ThemeSwitcher,
} from ".";

export function SettingsMenu({avatar}: {avatar: string | null | undefined}) {
  return (
    <div className="bg-slate-50 dark:bg-neutral-900 flex flex-col  h-fit p-4 rounded-md shadow-md">
      <SettingsHeader />
      <ThemeSwitcher />
      <AvatarUploader avatar={avatar}/>
      <SettingsFooter />
    </div>
  );
}
