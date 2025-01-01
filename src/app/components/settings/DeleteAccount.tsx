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
    <div className="flex flex-col items-center gap-y-2">
      <div className="w-full font-semibold border-b dark:border-white/25 border-neutral-200">
        {t("account.title")}
      </div>
      <div
        className="w-full p-1 hover:bg-slate-100 dark:hover:bg-red-600 rounded-md transition-colors flex justify-between items-center"
        onClick={() => onClick()}
      >
        <Trash2 size={20} />
        <div className="text-sm dark:text-gray-300 text-gray-500">
          {t("account.delete")}
        </div>
      </div>
    </div>
  );
};
