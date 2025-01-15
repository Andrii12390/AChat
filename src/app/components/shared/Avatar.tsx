"use client";

import { CldImage } from "next-cloudinary";

interface AvatarProps {
  color: string | undefined;
  avatar: string | undefined | null;
  username: string | undefined;
}

export const Avatar = ({ color, avatar, username }: AvatarProps) => {
  return (
    <div className="relative">
      {avatar ? (
        <CldImage
          src={avatar}
          alt="Image"
          height={40}
          width={40}
          className="rounded-full"
        />
      ) : (
        <div
          className={`h-10 w-10 rounded-full text-black font-semibold flex items-center justify-center  ${color}`}
        >
          {username && username[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};
