"use client";

import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import Typewriter from "typewriter-effect";

export const ChatPrompt = () => {
  const currentPath = usePathname();
  const pathname = usePathname();

  const page = pathname.includes("/people") ? "PeoplePage" : "ConversationsPage"

  const t = useTranslations(page);

  const typewriterOptions = {
    strings: [t("prompt")],
    autoStart: true,
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delay: 100,
  };

  return (
    <h2 className="h-full text-primary-foreground flex justify-center pt-72 font-semibold text-2xl bg-secondary">
      <Typewriter options={typewriterOptions} />
    </h2>
  );
};
