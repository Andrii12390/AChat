"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInput {
  required: boolean;
  id: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

export const MessageInput = ({
  required,
  id,
  placeholder,
  register,
}: IMessageInput) => {
  return (
    <input
      className="border-none w-full rounded-full py-2 px-3 focus:outline-none bg-input"
      id={id}
      {...register(id, { required })}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
};
