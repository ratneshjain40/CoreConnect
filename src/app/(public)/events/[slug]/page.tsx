import React, { Suspense } from 'react';

import { notFound } from 'next/navigation';
import { Loading } from '@/components/custom';
import { eventRepo } from '@/features/events/server/repo';
import { getEventBySlug } from '@/features/events/server/actions';
import { SingleEvent } from '@/features/events/components/SingleEvent';
import Script from 'next/script';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const eventSlugs = await eventRepo.getAllEventSlugs();
  return eventSlugs.map((slug) => ({ slug }));
}

const ViewEventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const event = await getEventBySlug({ slug });

  if (!event?.data) {
    return notFound();
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="container gap-8 px-4 md:px-6">
        <Suspense fallback={<Loading />}>
          <SingleEvent data={event.data} />
        </Suspense>
      </div>
    </>
  );
};

export default ViewEventPage;
