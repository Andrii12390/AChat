"use client";

import  axios from "axios";
import { SquarePen, Upload, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { useTranslations } from "use-intl";

interface AvatarUploaderProps {
  avatar: string | null | undefined;
}

export const AvatarUploader = ({ avatar }: AvatarUploaderProps) => {
  const t = useTranslations("Settings");
  const [isUploaded, setIsUploaded] = useState(!!avatar);

  const handleUploadSuccess = (results: any) => {
    const uploadedUrl = results?.info?.secure_url;
    if (uploadedUrl) {
      axios.post("/api/users/avatar/upload", { avatar: uploadedUrl });
      setIsUploaded(true);
    }
  };

  const handleDelete = () => {
    axios.post("/api/users/avatar/delete", {});
    setIsUploaded(false);
  };

  const buttonStyles = "p-1 hover:bg-slate-100 h-fit dark:hover:bg-indigo-500 rounded-md transition-colors cursor-pointer";
  const labelStyles = "text-sm dark:text-gray-300 text-gray-500";

  return (
    <div className="flex flex-col gap-y-2">
      <div className="font-semibold border-b dark:border-white/25 border-neutral-200">
        {t("avatar.title")}
      </div>

      <CldUploadWidget uploadPreset="qaicbhvr" onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <div className={buttonStyles} onClick={() => open()}>
            <div className="flex justify-between items-center">
              {isUploaded ? <Upload size={20} /> : <SquarePen size={20} />}
              <div className={labelStyles}>
                {isUploaded ? t("avatar.update") : t("avatar.upload")}
              </div>
            </div>
          </div>
        )}
      </CldUploadWidget>

      {isUploaded && (
        <div className={buttonStyles} onClick={handleDelete}>
          <div className="flex justify-between items-center">
            <X size={20} />
            <div className={labelStyles}>{t("avatar.delete")}</div>
          </div>
        </div>
      )}
    </div>
  );
}
