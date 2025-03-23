import React from 'react';
import { EventListLayout } from '@/features/events/components/EventListLayout';
import { getEventsByStatus } from '@/features/events/server/actions';

const EventsPage = async () => {
  const events = await getEventsByStatus({ status: 'UPCOMING' });

  return (
    <section className="w-full py-10">
      <div className="container gap-8 px-4 md:px-6">
        <EventListLayout events={events?.data || []} />
      </div>
    </section>
  );
};

export default EventsPage;
