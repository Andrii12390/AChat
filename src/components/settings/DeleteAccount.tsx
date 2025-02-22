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
      await axios.delete("/api/users")
      signOut();
      router.push("/");
      toast.success(t("account.deleteSuccess"));
    } catch (err: any) {
      toast.success(t("account.deleteError"))
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-2 cursor-pointer">
      <h3 className="w-full font-semibold border-b border-border pb-1">
        {t("account.title")}
      </h3>
      <div
        className="w-full p-1 hover:bg-hover rounded-md transition-colors flex justify-between items-center"
        onClick={() => onClick()}
      >
        <Trash2 size={20} className="text-destructive-foreground"/>
        <p className="text-sm text-destructive-foreground">
          {t("account.delete")}
        </p>
      </div>
    </div>
  );
};
