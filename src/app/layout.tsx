import { SessionContext, ToasterContext } from "./context";
import "./globals.css"
import React from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionContext>
      <html lang="en">
        <body className="min-h-dvh">
          <ToasterContext />
          {children}
        </body>
      </html>
    </SessionContext>
  )
}