import { SessionContext, ThemeContext, ToasterContext } from "../context";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  
  return (
    <SessionContext>
      <html lang="en" suppressHydrationWarning>
        <body className="h-dvh">
          <NextIntlClientProvider messages={messages}>
            <ThemeContext>
              <ToasterContext />
              {children}
            </ThemeContext>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionContext>
  );
};

export default RootLayout;
