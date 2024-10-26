"use client";

import axios from "axios";
import { SquarePen, Upload, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export function AvatarUploader({
  avatar,
}: {
  avatar: string | null | undefined;
}) {
  
  const [isUploaded, setIsUploaded] = useState(Boolean(avatar))
  const handleUploadSuccess = (results: any) => {
    axios.post("/api/users/avatar/upload", {
      avatar: results?.info?.secure_url,
    });
    setIsUploaded(true)
  };

  const handleDelete = () => {
    axios.post("/api/users/avatar/delete", {});
    setIsUploaded(false)
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="font-semibold border-b dark:border-white/25 border-neutral-200">
        Avatar
      </div>

      <CldUploadWidget uploadPreset="qaicbhvr" onSuccess={handleUploadSuccess}>
        {({ open }) => {
          return (
            <div
              className="p-1 hover:bg-slate-100 h-fit dark:hover:bg-indigo-500 rounded-md transition-all duration-300 cursor-pointer"
              onClick={() => open()}
            >
              {isUploaded ? (
                <div className="flex justify-between items-center">
                  <SquarePen size={20} />
                  <div className="text-sm dark:text-gray-300 text-gray-500">update</div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <Upload size={20} />
                  <div className="text-sm dark:text-gray-300 text-gray-500">Upload</div>
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      {isUploaded && (
        <div className="p-1 hover:bg-slate-100 h-fit dark:hover:bg-indigo-500 rounded-md transition-all duration-300 cursor-pointer"
        onClick={handleDelete}
        >
          <div className="flex justify-between items-center">
             <X size={20}/>
            <div className="text-sm dark:text-gray-300 text-gray-500">Delete</div>
          </div>
        </div>
      )}
    </div>
  );
}
