"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { UserRound, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormInput, FormButton } from "@/components";
import { registerUser } from "@/actions";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const RegistrationForm = () => {
  const router = useRouter();

  const t = useTranslations('RegistrationPage');

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
        password: data.password,
      };
      
      const resp = await registerUser(body);
      if (resp) {
        toast.success(t("toast.successRegistration"));
        const loginResponse = await signIn("credentials", {
          ...body,
          redirect: false,
        });
        if (loginResponse?.ok) {
          router.push("/people");
        } else {
          toast.error(t("toast.failedLogin"));
        }
      }
    } catch (error: any) {
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
          {t('form.title')}
        </h1>
        <FormInput
          name="username"
          type="text"
          placeholder={t('form.placeholder.username')}
          Icon={UserRound}
        />
        <FormInput
          name="password"
          type="password"
          placeholder={t('form.placeholder.password')}
          Icon={Lock}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder={t('form.placeholder.confirmPassword')}
          Icon={Lock}
        />
        <Link href="/" className="text-xs text-gray-600 ml-1">
        {t('signInLink.text')}
        </Link>
        <div className="flex justify-center">
          <FormButton text={t('form.button')} />
        </div>
      </form>
    </FormProvider>
  );
};
