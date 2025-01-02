import React from "react";
import "./globals.css";
import AppContext from "app/context/AppContext";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Achat",
  description: "Realtime chat application",
  keywords: "chat, realtime, achat",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-dvh">
        <AppContext>
          {children}
        </AppContext>
      </body>
    </html>
  );
};

export default RootLayout;
