import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Footer, Loading, Navbar } from '@/components/custom';
import { Home } from '@/features/home/components';

export const metadata: Metadata = {
  title: 'Home | Entomon Institute',
  description: 'Entomon Institute - Discover the Fascinating World of Invertebrate Zoology and Entomology',
  keywords: ['Entomon', 'Home', 'Entomology', 'Invertebrate Zoology', 'Insect Studies'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Entomon Institute of Invertebrates Zoology',
    description: 'Discover the Fascinating World of Invertebrate Zoology and Entomology',
    url: '/',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'Entomon Institute Home Page',
      },
    ],
  },
};

const HomeContent = () => {
  return <Home />;
};

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <HomeContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default HomePage;
