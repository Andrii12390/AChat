"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "use-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface IChatDelete {
  conversationId: number;
  onClose: () => void;
}

export const ChatDelete = ({ conversationId, onClose }: IChatDelete) => {
  const router = useRouter();
  const t = useTranslations("ConversationsPage");
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationKey: ["delete conversation"],
    mutationFn: () =>
      fetch("/api/conversations/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ conversationId: conversationId }),
      }).then((res) => res.json()),
     
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    }
  });

  const handleDelete = async () => {
    try {
      mutate();
      router.push('/conversations')
      onClose();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <li
      className="flex items-center gap-2 hover:bg-hover p-2 rounded-md transition text-destructive-foreground font-semibold cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2 size={20} />
      <div className="text-xs whitespace-nowrap">{t("deleteChat")}</div>
    </li>
  );
};