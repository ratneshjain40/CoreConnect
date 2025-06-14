import 'server-only';

import { prisma } from '@/db/prisma';
import { EventWithoutDescriptionType } from '../types/event';
import { Event, EventRegistration, EventStatus, Prisma } from '@prisma/client';

async function getAllEventSlugs(): Promise<string[]> {
  const eventIDs = await prisma.event.findMany({
    select: {
      slug: true,
    },
  });

  return eventIDs.map((event) => event.slug);
}

async function getAllEvents(): Promise<EventWithoutDescriptionType[]> {
  return await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      slug: true,
      location: true,
      startDate: true,
      endDate: true,
      coverImage: true,
      price: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getEventsByStatus(statuses: EventStatus[]): Promise<EventWithoutDescriptionType[]> {
  return await prisma.event.findMany({
    where: {
      status: {
        in: statuses,
      },
    },
    select: {
      id: true,
      title: true,
      status: true,
      slug: true,
      location: true,
      startDate: true,
      endDate: true,
      coverImage: true,
      price: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getEventBySlug(slug: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      slug,
    },
  });
}

async function getEventById(id: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      id,
    },
  });
}

async function createEvent(data: Prisma.EventCreateInput): Promise<Event> {
  return await prisma.event.create({
    data,
  });
}

async function updateEvent(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
  return await prisma.event.update({
    where: {
      id,
    },
    data,
  });
}

async function deleteEvent(id: string): Promise<Event> {
  return await prisma.event.delete({
    where: {
      id,
    },
  });
}

// -------------------------- Registration --------------------------

async function registerUserForEvent(data: Prisma.EventRegistrationUncheckedCreateInput): Promise<EventRegistration> {
  return await prisma.eventRegistration.create({
    data,
  });
}

export type EventRegistrationWithUser = EventRegistration & {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

async function getEventRegistrationsByEventId(eventId: string): Promise<EventRegistrationWithUser[]> {
  return await prisma.eventRegistration.findMany({
    where: {
      eventId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

async function getEventRegistrationByUserId(userId: string): Promise<EventRegistration[]> {
  return await prisma.eventRegistration.findMany({
    where: {
      userId,
    },
  });
}

async function getEventRegistrationByEventIdAndUserId(
  eventId: string,
  userId: string
): Promise<EventRegistration | null> {
  return await prisma.eventRegistration.findUnique({
    where: {
      eventId_userId: { eventId, userId },
    },
  });
}

export type EventDetails = {
  id: string;
  title: string;
  slug: string;
  location: string;
  startDate: Date;
  endDate: Date;
  price: string;
  status: EventStatus;
};
async function getEntireEventRegistrationByUserId(userId: string): Promise<EventDetails[]> {
  const registrations = await prisma.eventRegistration.findMany({
    where: {
      userId,
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          slug: true,
          location: true,
          startDate: true,
          endDate: true,
          price: true,
          status: true,
        },
      },
    },
  });

  return registrations.map((registration) => ({
    id: registration.event.id,
    title: registration.event.title,
    slug: registration.event.slug,
    location: registration.event.location,
    startDate: registration.event.startDate,
    endDate: registration.event.endDate,
    price: registration.event.price,
    status: registration.event.status,
  }));
}

async function deleteEventRegistration(eventId: string, userId: string): Promise<EventRegistration> {
  return await prisma.eventRegistration.delete({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
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
  getEventsByStatus,
  registerUserForEvent,
  deleteEventRegistration,
  getEventRegistrationsByEventId,
  getEventRegistrationByUserId,
  getEntireEventRegistrationByUserId,
  getEventRegistrationByEventIdAndUserId,
};
