import { SessionContext, ThemeContext, ToasterContext } from "../context";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const AppContext = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();

  return (
    <SessionContext>
      <NextIntlClientProvider messages={messages}>
        <ThemeContext>
          <ToasterContext />
          {children}
        </ThemeContext>
      </NextIntlClientProvider>
    </SessionContext>
  );
};

export default AppContext;
