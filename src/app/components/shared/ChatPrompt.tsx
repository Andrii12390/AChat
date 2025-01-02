"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import Typewriter from "typewriter-effect";

export const ChatPrompt = () => {
  const currentPath = usePathname();
  const [page, setPage] = useState("");

  useEffect(() => {
    if (currentPath.includes("/people")) {
      setPage("PeoplePage");
    } else if (currentPath.includes("/conversations")) {
      setPage("ConversationsPage");
    }
  }, [currentPath]);

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
    <div className="h-full text-blue-500 dark:text-indigo-600 flex justify-center pt-72 font-semibold text-2xl bg-gray-50 dark:bg-neutral-950/85">
      <Typewriter options={typewriterOptions} />
    </div>
  );
};
