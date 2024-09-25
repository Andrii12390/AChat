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
        <body className="h-dvh">
          <ToasterContext />
          {children}
        </body>
      </html>
    </SessionContext>
  )
}