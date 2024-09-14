import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  type: string;
  placeholder: string;
  name: string;
  Icon: React.ElementType;
}

const FormInput: React.FC<FormInputProps> = ({type, placeholder, Icon, name}) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex gap-x-2 items-center">
      <Icon className="w-5 text-gray-900" />
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="bg-gray-900 px-3 py-1 outline-none rounded-md w-60 shadow-md placeholder:text-sm placeholder:font-semibold"
      />
    </div>
  );
};

export default FormInput;
