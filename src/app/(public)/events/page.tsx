import { CardGridLoading } from '@/components/custom/loading';
import { EventListLayout } from '@/features/events/components/EventListLayout';
import { getEventsByStatus } from '@/features/events/server/actions';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming workshops, seminars, field expeditions, and educational events at Entomon Institute.',
  keywords: [
    'Entomon Events',
    'Entomology Workshops',
    'Invertebrate Zoology Events',
    'Entomon Seminars',
    'Entomon Field Expeditions',
    'Insect Walks',
  ],
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Entomon Institute Events',
    description: 'Workshops, seminars and educational events focused on invertebrate zoology and entomology.',
    url: '/events',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'Entomon Institute Events',
      },
    ],
  },
};

export const revalidate = 3600;

const EventsContent = async () => {
  const events = await getEventsByStatus({ status: ['UPCOMING', 'PAUSED', 'COMPLETED'] });
  return <EventListLayout events={events?.data || []} />;
};

const EventsPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container gap-8 px-4 md:px-6">
        <Suspense fallback={<CardGridLoading />}>
          <EventsContent />
        </Suspense>
      </div>
    </section>
  );
};

export default EventsPage;
