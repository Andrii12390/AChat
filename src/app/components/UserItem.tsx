'use client';

import { User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import profileImage from '../images/profile-img.jpg'
import Image from "next/image";
import { Pencil } from "lucide-react";

interface UserItemProps {
  data: User
}

export const UserItem: React.FC<UserItemProps> = ({data}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = useCallback(() => {
    setIsLoading(true);
    axios.post('api/conversations', {
      userId: data.id
    }).then((data) => {
      router.push(`/conversations/${data.data}`)
    }).finally(() => setIsLoading(false))
  }, [data, router]) 
  return (
    <div className="w-full py-2 px-3">
      <div className="flex gap-x-3">
        <Image alt="user image" className="w-7 h-7 rounded-full" src={profileImage}/>
        <div className="w-full flex items-center justify-between">
          <div>
            {data.username}
          </div>
          <div onClick={onClick} className="text-xs p-1 rounded-md transition duration-300 hover:bg-neutral-100">
            <Pencil className="w-4 h-4"/>
          </div>
        </div>
      </div>
    </div>
  )
}