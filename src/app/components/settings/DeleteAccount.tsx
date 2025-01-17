"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { signOut } from "next-auth/react";
import { useTranslations } from "use-intl";
import axios from "axios";
import toast from "react-hot-toast";

export const DeleteAccount = () => {
  const router = useRouter();

  const t = useTranslations("Settings");

  const onClick = async () => {
    try {
      axios.post("/api/users/delete").then(() => {
        signOut();
        router.push("/");
      });
      toast.success("You account succesfully deleted!");
    } catch (error) {
      toast.error("Internal server error, try later");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-2 cursor-pointer">
      <div className="w-full font-semibold border-b border-border">
        {t("account.title")}
      </div>
      <div
        className="w-full p-1 hover:bg-hover rounded-md transition-colors flex justify-between items-center"
        onClick={() => onClick()}
      >
        <Trash2 size={20} className="text-destructive-foreground"/>
        <div className="text-sm text-destructive-foreground">
          {t("account.delete")}
        </div>
      </div>
    </div>
  );
};
