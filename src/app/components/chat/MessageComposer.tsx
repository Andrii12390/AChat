"use client";

import axios from "axios";
import useConversation from "@/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MessageInput } from "@/components";
import { Send, Image as Img} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "use-intl";

export const MessageComposer = () => {
  const t = useTranslations("ConversationsPage");

  const { conversationId } = useConversation();

  const { register, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: Number(conversationId),
    });
  };

  const handleUploadSuccess = (results: any) => {
    axios.post('/api/messages', {
      conversationId: Number(conversationId),     
      image: results?.info?.secure_url,   
    })
  };

  return (
    <div className="border-t border-border py-2 px-2 flex items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2"
      >
      <CldUploadWidget uploadPreset="qaicbhvr" onSuccess={handleUploadSuccess}>
        {({ open }) => {
          return (
            <Img size={25} strokeWidth={1.5} onClick={() => open()}
            className="hover:text-primary-foreground cursor-pointer transition-colors mr-1"/>
          );
        }}
      </CldUploadWidget>
        <MessageInput
          id="message"
          register={register}
          placeholder={t("messagePlaceholder")}
          required
        />
        <button
          type="submit"
          className="hover:text-primary-foreground transition-colors mr-1 cursor-pointer"
        >
          <Send size={22} strokeWidth={1.5}/>
        </button>
      </form>
    </div>
  );
}
