"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

export const SettingsFooter = () => {
  const router = useRouter();
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
        Account
      </div>
      <div
        className="w-full p-1 hover:bg-red-600 rounded-md transition-all duration-300 flex justify-between items-center"
        onClick={() => onClick()}
      >
        <Trash2 size={20} />
        <div className="text-sm dark:text-gray-300 text-gray-500">Delete</div>
      </div>
    </div>
  );
};
