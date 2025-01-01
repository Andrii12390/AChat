"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserRound, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormInput, FormButton } from "@/components";
import { registerUser } from "@/actions";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { usernameValidationRules, passwordValidationRules, confirmedPasswordValidationRules } from "./validation";

type TRegisterForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const RegistrationForm = () => {
  const router = useRouter();
  const t = useTranslations('RegistrationPage');

  const { register, handleSubmit, formState: { errors } } = useForm<TRegisterForm>({
    mode: "onChange",
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<TRegisterForm> = async (data: TRegisterForm) => {
    try {
      const body = {
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword
      };

      if (body.password !== body.confirmPassword) {
        return toast.error(t("toast.passwordsDontMatch"));
      }

      const resp = await registerUser(body);

      if (resp) {
        toast.success(t("toast.successRegistration"));
        const loginResponse = await signIn("credentials", {
          username: body.username,
          password: body.password,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        register={register}
        validationRules={usernameValidationRules}
        errors={errors}
      />
      <FormInput
        name="password"
        type="password"
        placeholder={t('form.placeholder.password')}
        Icon={Lock}
        register={register}
        validationRules={passwordValidationRules}
        errors={errors}
      />
      <FormInput
        name="confirmPassword"
        type="password"
        placeholder={t('form.placeholder.confirmPassword')}
        Icon={Lock}
        register={register}
        validationRules={confirmedPasswordValidationRules}
        errors={errors}
      />
      <Link href="/" className="text-xs text-gray-600 ml-1">
        {t('signInLink.text')}
      </Link>
      <div className="flex justify-center">
        <FormButton text={t('form.button')} />
      </div>
    </form>
  );
};
