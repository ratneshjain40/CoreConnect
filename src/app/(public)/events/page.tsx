import React from 'react';
import { EventList } from '@/features/events/components/EventList';
import { getEventsByStatus } from '@/features/events/server/actions';

const EventsPage = async () => {
  const events = await getEventsByStatus({ status: 'UPCOMING' });

  return (
    <>
      <section className="w-full py-10">
        <div className="container gap-8 px-4 md:px-6">
          <h2 className="p-2 text-3xl font-bold tracking-tight">Events</h2>
          <EventList events={events?.data || []} />
        </div>
      </section>
    </>
  );
};

export default EventsPage;
