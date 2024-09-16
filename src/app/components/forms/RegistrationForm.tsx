"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormInput, FormButton } from "../";
import { UserRound, Lock } from "lucide-react";
import { registerUser } from "../../actions";

export const RegistrationForm: React.FC = () => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      const body = {
        username: data.username,
        password: data.password
      }
      const resp = await registerUser(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-60 p-2 h-fit flex flex-col gap-y-4"
      >
        <h1 className="text-center text-2xl text-gray-800 font-semibold">
          Registration
        </h1>
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          Icon={UserRound}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          Icon={Lock}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          Icon={Lock}
        />

        <div className="flex justify-center mt-2">
          <FormButton text="Register" />
        </div>
      </form>
    </FormProvider>
  );
};
