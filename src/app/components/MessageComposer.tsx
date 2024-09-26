"use client";

import axios from "axios";
import useConversation from "../hooks/useConversation";
import { FieldValues, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { MessageInput } from "./";
import { Send } from "lucide-react";

export function MessageComposer() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', {shouldValidate: true})
    console.log("data", data)
    axios.post('/api/messages', {
      ...data,
      conversationId: Number(conversationId)
    })
  }

  return (
    <div className="border-t bg-white py-2 px-2 flex items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items center gap-2">
        <MessageInput id="message" register={register} placeholder="Type a message" required />
        <button type="submit" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 mr-1">
        <Send />
        </button>
      </form>
    </div>
  );
}
