"use client";

import { ArrowRight } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useCallback } from "react";

import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("NotFoundPage");

  const handleRedirect = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="h-dvh bg-gradient flex lg:flex-row md:flex-row sm:flex-col items-center justify-center">
      <div className="flex flex-col gap-12 lg:items-start md:items-start sm:items-center">
        <h1 className="lg:text-6xl md:text-6xl sm:text-5xl font-semibold sm:text-center -tracking-wide">
          {t("heading")}
        </h1>

        <button
          className="w-fit px-8 py-5 bg-primary transition-opacity hover:opacity-85 text-white font-semibold text-xl rounded-full flex items-center gap-2 group"
          onClick={handleRedirect}
        >
          <span>{t("button")}</span>
          <ArrowRight
            size={25}
            className="group-hover:translate-x-2 transition-transform"
          />
        </button>
      </div>
      <Image src="/404.svg" alt={t("imageAlt")} width={500} height={500} />
    </div>
  );
}
