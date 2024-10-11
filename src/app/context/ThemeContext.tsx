"use client";

import { ThemeProvider } from "next-themes";

export const ThemeContext = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  )
}
