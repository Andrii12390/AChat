import React from "react";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  type: string;
  placeholder: string;
  name: string;
  Icon: React.ElementType;
}

export const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  Icon,
  name,
}) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center relative">
      <Icon className="w-[18px] text-gray-900 absolute -left-6" />
      <input
        {...register(name)}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className="bg-gray-900 px-3 py-1 outline-none rounded-md w-60 shadow-md placeholder:text-sm placeholder:font-semibold"
      />
    </div>
  );
};
