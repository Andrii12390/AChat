"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "use-intl";
import { useState } from "react";
import axios from "axios";

interface ChatDeleteProps {
  conversationId: number;
  onClose: () => void;
}

export const ChatDelete = ({ conversationId, onClose }: ChatDeleteProps) => {
  const router = useRouter();
  const t = useTranslations("ConversationsPage");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.post("/api/conversations/delete", { conversationId });
      router.push("/conversations");
    } catch (error) {
      console.log("An error occurred while deleting conversation");
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <li
      className="flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-neutral-900/90 p-2 rounded-md transition text-red-600 font-semibold cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2 size={20} />
      <div className="text-xs whitespace-nowrap">
        {t("deleteChat")}
      </div>
    </li>
  );
};
