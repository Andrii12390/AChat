import React from "react";
import "./globals.css";
import AppContext from "app/context/AppContext";
import { TMetaData } from "@/types";

const metadata: TMetaData = {
  title: "Achat",
  description: "Realtime chat application",
  keywords: "chat, realtime, achat",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="keywords" content={metadata.keywords} />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className="h-dvh">
        <AppContext>
          {children}
        </AppContext>
      </body>
    </html>
  );
};

export default RootLayout;
