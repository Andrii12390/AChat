'use client'

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

export const SettingsFooter = () => {

  const router = useRouter()
  const onClick = async () => {
    try {
      axios.post("/api/users/delete").then(() => {
        signOut()
        router.push('/');
      })
      toast.success("You account succesfully deleted!")
    } catch (error) {
      toast.error("Internal server error, try later")
    }
  } 

  return (
    <div className="flex items-center justify-end">
      <div className="flex gap-x-2 bg-red-600 px-2 py-1 rounded-md items-center hover:bg-red-700 cursor-pointer transition-colors duration-300"
      onClick={() => onClick()}>
        <Trash2 size={20} />
        <div className="flex items-center">Delete</div>
      </div>
    </div>
  );
}
