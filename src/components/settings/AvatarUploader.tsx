"use client";

import  axios from "axios";
import { SquarePen, Upload, X } from "lucide-react";
import { CldUploadWidget,  } from "next-cloudinary";
import { useTranslations } from "use-intl";
import { useState } from "react";

interface AvatarUploaderProps {
  avatar: string | undefined;
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
    axios.delete("/api/users/avatar");
    setIsUploaded(false);
  };

  const buttonStyles = "p-1 h-fit hover:bg-hover rounded-md transition-colors";

  return (
    <div className="flex flex-col gap-y-2 cursor-pointer">
      <h3 className="font-semibold border-b border-border pb-1">
        {t("avatar.title")}
      </h3>

      <CldUploadWidget uploadPreset="qaicbhvr" onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <figure className={buttonStyles} onClick={() => open()}>
            <div className="flex justify-between items-center">
              {isUploaded ? <Upload size={20} /> : <SquarePen size={20} />}
              <p className="text-sm">
                {isUploaded ? t("avatar.update") : t("avatar.upload")}
              </p>
            </div>
          </figure>
        )}
      </CldUploadWidget>

      {isUploaded && (
        <figure className={buttonStyles} onClick={handleDelete}>
          <div className="flex justify-between items-center">
            <X size={20} />
            <p>{t("avatar.delete")}</p>
          </div>
        </figure>
      )}
    </div>
  );
}
