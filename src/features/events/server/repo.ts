import 'server-only';

import { prisma } from '@/db/prisma';
import { Event, Prisma } from '@prisma/client';

async function getAllEvents(): Promise<Event[]> {
  return await prisma.event.findMany();
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

export const eventRepo = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
