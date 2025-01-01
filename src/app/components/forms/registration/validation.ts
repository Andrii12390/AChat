import { TValidationRules } from "@/types";

export const usernameValidationRules: TValidationRules = {
  required: {
    value: true,
    message: "Username is required",
  },
  maxLength: {
    value: 20,
    message: "max length is 20",
  },
  minLength: {
    value: 5,
    message: "min length is 5",
  },
}

export const passwordValidationRules: TValidationRules = {
  required: {
    value: true,
    message: "Password is required",
  },
  maxLength: {
    value: 20,
    message: "max length is 20",
  },
  minLength: {
    value: 5,
    message: "min length is 5",
  }
}

export const confirmedPasswordValidationRules: TValidationRules = {
  required: {
    value: true,
    message: "Confirm password is required",
  }
}