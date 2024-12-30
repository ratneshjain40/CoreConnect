import { prisma } from '@/db/prisma';
import { Event } from '@prisma/client';

type EventSpecificFields = Pick<Event, 'title' | 'slug' | 'location' | 'date' | 'price' | 'status'>;
async function getAllEventsForAdminTable(): Promise<EventSpecificFields[]> {
  return await prisma.event.findMany({
    select: {
      title: true,
      slug: true,
      location: true,
      date: true,
      price: true,
      status: true,
    },
  });
}

export const eventRepo = {
  getAllEventsForAdminTable,
};
