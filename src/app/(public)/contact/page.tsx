import type { Metadata } from 'next';

import { Footer, Navbar } from '@/components/custom';
import { Contact } from '@/features/contact/components';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Entomon Institute team. We welcome your questions, feedback, and collaboration opportunities.',
  keywords: ['Contact Entomon', 'Entomon Support', 'Entomon Inquiries', 'Entomon Email', 'Entomon Help'],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Entomon Institute',
    description: 'Reach out to the Entomon Institute team for inquiries, collaborations, or support.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'Contact Entomon Institute',
      },
    ],
  },
};

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};

export default ContactPage;
