import React from 'react';

import { notFound } from 'next/navigation';
import { EditEvent } from '@/features/events/components/EditEvent';
import { getEventBySlug } from '@/features/events/server/actions';

const EditEventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const event = await getEventBySlug({ slug });

  if (!event) return notFound();

  return (
    <>
      <EditEvent data={event?.data!!} />
    </>
  );
};

export default EditEventPage;
