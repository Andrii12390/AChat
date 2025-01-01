import { TValidationRules } from "@/types";

export const loginValidationRules: TValidationRules = {
  required: {
    value: true,
    message: "username is required",
  }
}

export const passwordValidationRules: TValidationRules = {
  required: {
    value: true,
    message: "password is required",
  }
}