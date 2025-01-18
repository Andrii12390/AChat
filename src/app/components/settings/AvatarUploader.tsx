"use client";

import  axios from "axios";
import { SquarePen, Upload, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "use-intl";
import { useState } from "react";

interface AvatarUploaderProps {
  avatar: string | null | undefined;
}

export const AvatarUploader = ({ avatar }: AvatarUploaderProps) => {
  const t = useTranslations("Settings");
  const [isUploaded, setIsUploaded] = useState(!!avatar);

  const handleUploadSuccess = (results: any) => {
    const uploadedUrl = results?.info?.secure_url;
    if (uploadedUrl) {
      axios.post("/api/users/avatar", { avatar: uploadedUrl });
      setIsUploaded(true);
    }
  };

  const handleDelete = () => {
    axios.delete("/api/users/avatar", {});
    setIsUploaded(false);
  };

  const buttonStyles = "p-1 h-fit hover:bg-hover rounded-md transition-colors";

  return (
    <div className="flex flex-col gap-y-2 cursor-pointer">
      <div className="font-semibold border-b border-border">
        {t("avatar.title")}
      </div>

      <CldUploadWidget uploadPreset="qaicbhvr" onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <div className={buttonStyles} onClick={() => open()}>
            <div className="flex justify-between items-center">
              {isUploaded ? <Upload size={20} /> : <SquarePen size={20} />}
              <div className="text-sm">
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
            <div>{t("avatar.delete")}</div>
          </div>
        </div>
      )}
    </div>
  );
}
