"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { useRouter, Link } from "@/i18n/routing";
import { signIn, useSession } from "next-auth/react";
import { FormInput, FormButton } from "@/components";
import { UserRound, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const t = useTranslations("LoginPage");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/people");
    }
  }, [status, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TFormLoginValues> = async (data) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (resp?.ok) {
        toast.success(t("toast.successLogin"));
        router.push("/people");
      } else {
        toast.error(t("toast.invalidCredentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-60 p-2 h-fit flex flex-col gap-y-4">
      <h1 className="text-center text-2xl text-gray-800 font-semibold">
        {t("form.title")}
      </h1>
      <FormInput
        name="username"
        type="text"
        placeholder={t("form.placeholder.username")}
        Icon={UserRound}
        register={register}
      />
      <FormInput
        name="password"
        type="password"
        placeholder={t("form.placeholder.password")}
        Icon={Lock}
        register={register}
      />
      <Link href="/registration" className="text-xs text-gray-600 ml-1">
        {t("signUpLink.text")}
      </Link>
      <div className="flex justify-center">
        <FormButton text={t("form.button")} />
      </div>
    </form>
  );
};
