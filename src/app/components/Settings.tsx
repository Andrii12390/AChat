"use client";

import { SettingsMenu, Modal } from "./"
import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

export function Settings({ avatar }: { avatar: string | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <li
      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-300 rounded-md"
      onClick={() => setIsOpen(true)}
    >
      <SettingsIcon size={25} />
    </li>
    <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
      <SettingsMenu avatar={avatar}/>
    </Modal>
    </div>
  )
}
