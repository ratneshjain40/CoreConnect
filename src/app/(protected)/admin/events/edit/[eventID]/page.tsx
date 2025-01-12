import React from 'react';

import { EditEvent } from '@/features/events/components/EditEvent';
import { getEventById } from '@/features/events/server/actions';

const EditEventPage = async ({ params }: { params: Promise<{ eventID: string }> }) => {
  const eventID = (await params).eventID;
  const event = await getEventById({ id: eventID });

  return (
    <>
      <EditEvent data={event?.data!!} />
    </>
  );
};

export default EditEventPage;
