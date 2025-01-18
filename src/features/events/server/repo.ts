import 'server-only';

import { prisma } from '@/db/prisma';
import { Event, Prisma } from '@prisma/client';

// returns all event slugs only (ISR)
async function getAllEventSlugs(): Promise<string[]> {
  const eventIDs = await prisma.event.findMany({
    select: {
      slug: true,
    },
  });

  return eventIDs.map((event) => event.slug);
}

// returns all events
async function getAllEvents(): Promise<Event[]> {
  return await prisma.event.findMany();
}

// returns all UPCOMING events
async function getUpcomingEvents(): Promise<Event[]> {
  return await prisma.event.findMany({
    where: {
      status: 'UPCOMING',
    },
  });
}

// returns all COMPLETED events
async function getCompletedEvents(): Promise<Event[]> {
  return await prisma.event.findMany({
    where: {
      status: 'COMPLETED',
    },
  });
}

// returns a single event object based on slug
async function getEventBySlug(slug: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      slug,
    },
  });
}

// returns a single event object based on ID
async function getEventById(id: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      id,
    },
  });
}

// create event operation
async function createEvent(data: Prisma.EventCreateInput): Promise<Event> {
  return await prisma.event.create({
    data,
  });
}

// update event operation
async function updateEvent(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
  return await prisma.event.update({
    where: {
      id,
    },
    data,
  });
}

// delete event operation
async function deleteEvent(id: string): Promise<Event> {
  return await prisma.event.delete({
    where: {
      id,
    },
  });
}

export const eventRepo = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEventBySlug,
  getAllEventSlugs,
  getUpcomingEvents,
  getCompletedEvents,
};
