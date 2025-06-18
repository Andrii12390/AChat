import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from '@/features/shared/providers';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Achat',
  description: 'Achat - realtime chate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
