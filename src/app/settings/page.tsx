'use client'
import React from "react";
import {  } from "../actions";
import { SettingsFooter, SettingsHeader, ThemeSwitcher } from "../components";
import { Trash2 } from "lucide-react";

export default function page() {
  return (
    <div className="h-full dark:text-white flex justify-center bg-gradient-to-tr from-blue-300 to-purple-300">
      <div className="mt-60 sm:mt-40 bg-slate-50 dark:bg-neutral-900 flex flex-col gap-y-3 h-fit p-4 rounded-md shadow-md">
        <SettingsHeader />
        <div className="font-semibold border-b dark:border-white/25 border-neutral-200">
          Color Theme
        </div>
        <ThemeSwitcher />
        <SettingsFooter/>

        
      </div>
    </div>
  );
}

  // //      <button className="bg-red-600 px-2 py-1 rounded-md text-center flex items-center">
  // </button>