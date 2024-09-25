  'use client'

  import React, { useEffect } from "react";
  import { FormProvider, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { formLoginSchema, TFormLoginValues } from "./schemas";
  import { FormInput, FormButton } from "../";
  import Link from "next/link";
  import { UserRound, Lock } from "lucide-react";
  import { signIn, useSession } from "next-auth/react";
  import toast from "react-hot-toast";
  import { useRouter } from "next/navigation";

  export const LoginForm: React.FC = () => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
      if (session?.status === "authenticated") {
        router.push('/people');
      }
    }, [session?.status, router]);
    const form = useForm<TFormLoginValues>({
      resolver: zodResolver(formLoginSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });

    const onSubmit = async (data: TFormLoginValues) => {
      try {
        console.log(data)
        const resp = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (resp?.ok) {
          toast.success("You are succusfully logged in!")
          router.push('/chat')
        } else if (resp?.error) {
          toast.error("Invalid credentials!")
        }

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
            <Link href="/registration" className="text-xs text-gray-600 ml-1">
              Don't have account?
            </Link>
          <div className="flex justify-center">
            <FormButton text="Login" />
          </div>
        </form>
      </FormProvider>
    );
  };
