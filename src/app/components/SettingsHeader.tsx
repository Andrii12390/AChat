"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const SettingsHeader = () => {
  const router = useRouter()

  const onClick = () => {
    router.back()
  }
  return (
    <div className="font-semibold tracking-wide text-xl relative lg:px-48 md:px-40 sm:px-20">
      Settings
      <div className="absolute left-0 top-0 p-1 dark:hover:bg-indigo-500 rounded-md transition duration-300 hover:bg-slate-100"
      onClick={() => onClick()}
      >
        <ChevronLeft size={20}/>
      </div>
    </div>
  );
};
