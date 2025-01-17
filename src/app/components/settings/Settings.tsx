"use client";

import { SettingsMenu, Modal } from "@/components";
import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

interface SettingsProps {
  avatar: string | null | undefined;
}

export const Settings = ({ avatar }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="cursor-pointer">
      <li
        className="p-1 hover:bg-hover transition-colors rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <SettingsIcon size={25} />
      </li>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <SettingsMenu avatar={avatar} />
      </Modal>
    </div>
  );
}
