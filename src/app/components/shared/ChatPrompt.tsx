"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

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

  return (
    <div className="h-full flex justify-center pt-72 font-semibold text-xl bg-gray-50 dark:bg-neutral-950/85">
      {t("prompt")}
    </div>
  );
};
