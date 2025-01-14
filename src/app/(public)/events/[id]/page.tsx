import React, { Suspense } from 'react';

import { Loading } from '@/components/custom';
import { eventRepo } from '@/features/events/server/repo';
import { EventDataType } from '@/features/events/types/event';
import { getEventById } from '@/features/events/server/actions';
import { SingleEvent } from '@/features/events/components/SingleEvent';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const eventIDs = await eventRepo.getAllEventIDs();
  return eventIDs.map((id) => ({ id }));
}

const ViewEventPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const result = await getEventById({ id });
  const event = {
    ...result?.data,
    createdAt: result?.data?.createdAt.toISOString(),
    updatedAt: result?.data?.updatedAt.toISOString(),
  } as EventDataType;

  if (!event) {
    // redirect to 404 page
    return;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <SingleEvent data={event} />
      </Suspense>
    </>
  );
};

export default ViewEventPage;
