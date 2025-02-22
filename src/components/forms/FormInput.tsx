import type { LucideIcon } from "lucide-react";
import type { TValidationRules } from "types";

import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  type: string;
  placeholder: string;
  name: string;
  Icon: LucideIcon;
  register: UseFormRegister<any>;
  validationRules: TValidationRules; 
  errors: any;
}

export const FormInput = ({
  type,
  placeholder,
  Icon,
  name,
  register,
  validationRules,
  errors
}: FormInputProps) => {
  return (
    <div className="flex flex-col items-center relative">
      <Icon className="w-[18px] text-gray-900 absolute -left-6 top-0.5" />
      <input
        {...register(name, validationRules)}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className="bg-gray-900 px-3 py-1 outline-none rounded-md w-60 shadow-md placeholder:text-sm placeholder:font-semibold text-white"
      />
       {errors[name] && (
          <div className="mt-1 w-60 text-left bg-red-700  py-1 text-sm rounded-md px-3 text-slate-100">
            {errors[name].message}
        </div>
      )}
    </div>
  );
};
