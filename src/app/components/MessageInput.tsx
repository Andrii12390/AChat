"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";
import { number } from "zod";

interface MessageInputProps {
  required: boolean,
  id: string,
  placeholder: string,
  register: UseFormRegister<FieldValues>
}

export function MessageInput({required, id, placeholder, register}: MessageInputProps) {
  return (
    <input className="w-full rounded-full py-2 px-3 focus:outline-none bg-slate-100" type="text" id={id}  {...register(id, {required})} autoComplete={id} placeholder={placeholder}/>
  )
}
