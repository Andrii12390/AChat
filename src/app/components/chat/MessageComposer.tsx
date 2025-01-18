"use client";

import axios from "axios";
import useConversation from "@/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MessageInput } from "@/components";
import { Send, Image as Img, Smile } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "use-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Picker, { EmojiClickData, Theme } from "emoji-picker-react";

export const MessageComposer = () => {
  const t = useTranslations("ConversationsPage");
  const { theme } = useTheme();

  const [isOpenPicker, setIsOpenPicker] = useState<boolean>(false);

  const { conversationId } = useConversation();

  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, getValues } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) setIsOpenPicker(false);
    };

    if (isOpenPicker) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenPicker]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios
      .post("/api/messages", {
        ...data,
        conversationId: Number(conversationId),
      })
      .then(() =>
        queryClient.invalidateQueries({
          queryKey: [`messages${conversationId}`],
        })
      );
  };

  const handleUploadSuccess = (results: any) => {
    axios
      .post("/api/messages", {
        conversationId: Number(conversationId),
        image: results?.info?.secure_url,
      })
      .then(() =>
        queryClient.invalidateQueries({
          queryKey: [`messages${conversationId}`],
        })
      );
  };

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setValue("message", getValues("message") + emojiData.emoji);
    setIsOpenPicker(false);
  };

  return (
    <div className="border-t border-border py-2 px-2 flex items-center relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2"
      >
        <CldUploadWidget
          uploadPreset="qaicbhvr"
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => {
            return (
              <Img
                size={25}
                strokeWidth={1.5}
                onClick={() => open()}
                className="hover:text-primary-foreground cursor-pointer transition-colors"
              />
            );
          }}
        </CldUploadWidget>
        <Smile
          className="hover:text-primary-foreground transition-colors cursor-pointer"
          size={22}
          strokeWidth={1.5}
          onClick={() => setIsOpenPicker(!isOpenPicker)}
        />
        {isOpenPicker && (
          <div ref={pickerRef} className="absolute bottom-0 mb-4">
            <Picker
              className="no-scrollbar"
              theme={theme as Theme}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
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
          <Send size={22} strokeWidth={1.5} />
        </button>
      </form>
    </div>
  );
};
