import { SessionContext, ThemeContext, ToasterContext } from "./context";
import "./globals.css"
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionContext>
        <html lang="en" suppressHydrationWarning>
          <body className="h-dvh">
            <ThemeContext>
              <ToasterContext />
              {children}
            </ThemeContext>
          </body>
        </html>
    </SessionContext>
  )
}