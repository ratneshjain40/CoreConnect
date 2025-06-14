import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { auth } from '@/features/auth/server/next-auth-config';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast';

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/styles/globals.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
  variable: '--jakartaSans-font',
});

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
  variable: '--inter-font',
});

export const metadata: Metadata = {
  title: {
    default: 'Entomon Institute of Invertebrates Zoology',
    template: '%s | Entomon Institute',
  },
  description:
    'Welcome to Entomon Institute - Igniting Curiosity, Empowering Minds in the field of Invertebrate Zoology and Entomology',
  keywords: [
    'Entomon',
    'Entomology',
    'Invertebrate Zoology',
    'Insects',
    'Entomon Institute',
    'Zoology',
    'Eshaan Pahade',
  ],
  authors: [{ name: 'Entomon Institute' }],
  creator: 'Entomon Institute',
  metadataBase: new URL('https://www.entomoninstitute.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Entomon Institute of Invertebrates Zoology',
    description:
      'Welcome to Entomon Institute - Igniting Curiosity, Empowering Minds in the field of Invertebrate Zoology and Entomology',
    url: 'https://www.entomoninstitute.com',
    siteName: 'Entomon Institute',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        width: 512,
        height: 512,
        alt: 'Entomon Institute Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entomon Institute of Invertebrates Zoology',
    description: 'Igniting Curiosity, Empowering Minds in the field of Invertebrate Zoology and Entomology',
    images: ['/images/entomon-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <html lang="en">
        <ToastProvider>
          <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
            <Analytics />
            <SpeedInsights />
            <Toaster />
            {children}
          </body>
        </ToastProvider>
      </html>
    </SessionProvider>
  );
}
