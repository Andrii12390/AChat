"use client";

import { SettingsMenu, Modal } from "@/components";
import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

interface SettingsProps {
  avatar: string;
}

export const Settings = ({ avatar }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="cursor-pointer">
      <div
        className="p-1 hover:bg-hover transition-colors rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <SettingsIcon size={25} />
      </div>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <SettingsMenu avatar={avatar} />
      </Modal>
    </div>
  );
}
