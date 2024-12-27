import type { Metadata } from 'next';

import { auth } from '@/features/auth/server/next-auth-config';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast';

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/styles/globals.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'], preload: true });
const inter = Inter({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: 'Entomon Institute of Invertebrates Zoology',
  description: 'Welcome to Entomon Institute - Igniting Curiosity, Empowering Minds!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <ToastProvider>
          <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
            <Toaster />
            {children}
          </body>
        </ToastProvider>
      </html>
    </SessionProvider>
  );
}
