import { Metadata } from "next";
import { AppContext } from "@/providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Achat",
  description: "Realtime chat application",
  keywords: "chat, realtime, achat",

};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
     <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="h-dvh">
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
};

export default RootLayout;
