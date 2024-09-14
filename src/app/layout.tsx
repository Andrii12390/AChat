"use client"

import React from "react";
import { SessionProvider } from "next-auth/react"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <SessionProvider>
          <body>{children}</body>
        </SessionProvider>
      </html>
  );
}