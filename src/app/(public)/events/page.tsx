import React from 'react';
import { getEvents } from '@/features/events/server/actions';
import { EventList } from '@/features/events/components/EventList';

const EventsPage = async () => {
  const result = await getEvents();
  const events = result?.data?.map((event) => ({
    ...event,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  }));

  return (
    <>
      <section className="w-full py-10">
        <div className="container gap-8 px-4 md:px-6">
          <h2 className="p-2 text-3xl font-bold tracking-tight">Events</h2>
          <EventList events={events || []} />
        </div>
      </section>
    </>
  );
};

export default EventsPage;
