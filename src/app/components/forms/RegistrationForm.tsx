'use client';

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormInput, FormButton } from "../";
import { UserRound, Lock } from "lucide-react";
import { registerUser } from "../../actions/registerUser";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const RegistrationForm: React.FC = () => {
  const router = useRouter();

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
      };

      const resp = await registerUser(data);
      if (resp) {
        toast.success("You are successfully registered!");
        const loginResponse = await signIn('credentials', {
          ...body,
          redirect: false,
        });
        if (loginResponse?.ok) {
          router.push('/chat');
        } else if (loginResponse?.error) {
          toast.error("Login after registration failed!");
        }
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.error("Registration error:", error);
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
        <Link href="/" className="text-xs text-gray-600 ml-1">
          Already have an account?
        </Link>
        <div className="flex justify-center">
          <FormButton text="Register" />
        </div>
      </form>
    </FormProvider>
  );
};
