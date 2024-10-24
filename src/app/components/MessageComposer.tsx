"use client";

import axios from "axios";
import useConversation from "../hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MessageInput } from "./";
import { Send } from "lucide-react";
import { Image } from "lucide-react";
import {
  CldUploadButton,
  CldUploadWidget,
  type CldUploadButtonProps,
} from "next-cloudinary";
export function MessageComposer() {
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
    <div className="border-t dark:border-white/15 bg-white dark:bg-neutral-950/85 py-2 px-2 flex items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2"
      >
      <CldUploadWidget uploadPreset="qaicbhvr" onSuccess={handleUploadSuccess}>
        {({ open }) => {
          return (
            <Image onClick={() => open()}
            className="text-slate-400 hover:text-blue-500 dark:hover:text-indigo-500 transition-colors duration-300 mr-1"/>

          );
        }}
      </CldUploadWidget>
        <MessageInput
          id="message"
          register={register}
          placeholder="Type a message"
          required
        />
        <button
          type="submit"
          className="text-slate-400 hover:text-blue-500 dark:hover:text-indigo-500 transition-colors duration-300 mr-1"
        >
          <Send />
        </button>
      </form>
    </div>
  );
}
