import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Secure authentication for Entomon Institute. Login to access your dashboard, register for events, and manage your account.',
  keywords: [
    'Entomon Login',
    'Entomon Register',
    'Entomon Authentication',
    'Entomon Account',
    'Entomon Sign In',
    'Entomon Sign Up',
    'Entomon Institute Login',
    'Entomon Institute Registration',
    'Secure Login',
    'Account Access',
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Authentication - Entomon Institute',
    description: 'Secure access to your Entomon Institute account. Login or register to access exclusive content, events, and resources.',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Entomon Institute Authentication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentication - Entomon Institute',
    description: 'Secure access to your Entomon Institute account.',
    images: ['/images/entomon-logo.webp'],
  },
  alternates: {
    canonical: '/auth',
  },
};

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-dvh w-full lg:grid-cols-2">
      <Link className="group absolute left-4 top-4 flex items-center gap-2" href="/">
        <span className="flex items-center justify-center rounded-md bg-primary p-[0.4rem] text-white shadow transition-colors group-hover:bg-primary/90 group-focus-visible:outline-none group-focus-visible:ring-1 group-focus-visible:ring-ring">
          <ChevronLeft className="h-4 w-4" />
        </span>
        <span>Home</span>
      </Link>
      {children}
      <div className="hidden bg-muted lg:block">
        <Image
          alt="Image"
          width="1920"
          height="1080"
          src="https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
