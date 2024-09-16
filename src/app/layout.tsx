"use client"

import "./globals.css"
import React from "react";
import { SessionWrapper } from "./components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className="min-h-dvh">{children}</body>
      </html>
    </SessionWrapper>
  )
}