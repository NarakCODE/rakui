import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import { AppProvider } from '@/components/app-provider';
import './global.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
