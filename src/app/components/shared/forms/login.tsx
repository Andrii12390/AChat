import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import FormInput from "../../FormInput";
import FormButton from "../../FormButton";
import Link from "next/link";
import { UserRound, Lock } from "lucide-react";
import { signIn } from "next-auth/react";

export const LoginForm: React.FC = () => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
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
        <h1 className="text-center text-2xl text-gray-800 ml-6 font-semibold">
          Login
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
        <div className="flex justify-between ml-7 pt-3">
          <Link href="/" className="text-xs text-gray-600">
            Forgot password?
          </Link>
          <Link href="/registration" className="text-xs text-gray-600">
            Create account
          </Link>
        </div>
        <div className="flex justify-center">
          <FormButton text="Login" />
        </div>
      </form>
    </FormProvider>
  );
};
