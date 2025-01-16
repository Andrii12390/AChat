import { SessionContext, ThemeContext, ToasterContext } from "../context";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { TanstackProvider } from "./TanstackQueryContext";

const AppContext = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();

  return (
    <SessionContext>
      <NextIntlClientProvider messages={messages}>
        <ThemeContext>
          <ToasterContext />
          <TanstackProvider>
          {children}
          </TanstackProvider>
        </ThemeContext>
      </NextIntlClientProvider>
    </SessionContext>
  );
};

export default AppContext;
