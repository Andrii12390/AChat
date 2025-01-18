import { SessionContext, ThemeContext, ToasterContext, TanstackProvider } from "@/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const AppContext = async ({ children }: { children: React.ReactNode }) => {
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

