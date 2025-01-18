import { Metadata } from "next";
import { AppContext } from "@/providers";
import "./globals.css";

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
