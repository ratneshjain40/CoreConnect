import 'server-only';

import { z } from 'zod';
import { EventDetails, eventRepo } from './repo';
import { generateSlug } from '@/lib/slugify';
import { ErrorResponse } from '@/types/errors';
import { Event, EventRegistration, EventStatus } from '@prisma/client';
import { EventWithoutDescriptionType } from '../types/event';
import { CreateEvent, eventRegistrationSchema, getEventByStatusSchema, UpdateEvent } from '../schema/event';

async function getEvents(): Promise<EventWithoutDescriptionType[]> {
  return await eventRepo.getAllEvents();
}

async function updateEventStatusBasedOnDates(event: Event): Promise<EventStatus> {
  const currentDate = new Date();
  if (currentDate > event.endDate) return 'COMPLETED';
  if (currentDate >= event.startDate) return 'STARTED';
  return 'UPCOMING';
}

async function getEventsByStatus(data: z.infer<typeof getEventByStatusSchema>): Promise<EventWithoutDescriptionType[]> {
  const events = await eventRepo.getEventsByStatus(data.status);
  if (data.status === 'UPCOMING' || data.status === 'STARTED') {
    for (const event of events) {
      const correctStatus = await updateEventStatusBasedOnDates(event as Event);
      if (correctStatus !== event.status) {
        await eventRepo.updateEvent(event.id, { status: correctStatus });
      }
    }
  }
  return events;
}

async function getEventBySlug(slug: string): Promise<Event | null> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) throw new ErrorResponse('Event not found');

  return event;
}

async function createEvent(data: CreateEvent): Promise<Event> {
  let startDate = new Date(data.startDate).getDate();
  let endDate = new Date(data.endDate).getDate();
  if (startDate > endDate) throw new ErrorResponse('Start date must be before or same as end date');

  let slug = generateSlug(data.title);
  return await eventRepo.createEvent({ ...data, slug });
}

async function updateEvent(data: UpdateEvent): Promise<Event> {
  let event = await eventRepo.getEventById(data.id);
  if (!event) throw new ErrorResponse('Event not found');

  let startDate = data.startDate ? new Date(data.startDate).getDate() : event.startDate;
  let endDate = data.endDate ? new Date(data.endDate).getDate() : event.endDate;
  if (startDate > endDate) throw new ErrorResponse('Start date must be before or same as end date');

  let slug = data.title ? generateSlug(data.title) : event.slug;
  return await eventRepo.updateEvent(data.id, {
    title: data.title,
    coverImage: data.coverImage,
    description: data.description,
    slug: slug,
    status: data.status,
    price: data.price,
    categories: data.categories,
    location: data.location,
    startDate: data.startDate,
    endDate: data.endDate,
  });
}

async function deleteEvent(slug: string): Promise<Event> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) throw new ErrorResponse('Event not found');

  return await eventRepo.deleteEvent(event.id);
}

// -------------------------- Registration --------------------------

async function registerUserForEvent(
  userId: string,
  data: z.infer<typeof eventRegistrationSchema>
): Promise<EventRegistration> {
  let event = await eventRepo.getEventBySlug(data.eventSlug);
  if (!event) throw new ErrorResponse('Event not found');

  // Check if event has started
  const currentDate = new Date();
  if (currentDate >= event.startDate) {
    throw new ErrorResponse('Cannot register for an event that has already started');
  }

  // Check if event has ended
  if (currentDate > event.endDate) {
    throw new ErrorResponse('Cannot register for an event that has ended');
  }

  // Check if event is paused
  if (event.status === 'PAUSED') {
    throw new ErrorResponse('Cannot register for an event that is paused');
  }

  return await eventRepo.registerUserForEvent({
    eventId: event.id,
    userId: userId,
    phone: data.phone,
  });
}

async function getEventRegistrationsByEventId(slug: string): Promise<EventRegistration[]> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) {
    throw new ErrorResponse('Event not found');
  }
  return await eventRepo.getEventRegistrationsByEventId(event.id);
}

async function getEventRegistrationByUserId(userId: string): Promise<EventRegistration[]> {
  return await eventRepo.getEventRegistrationByUserId(userId);
}

async function getEntireEventRegistrationByUserId(userId: string): Promise<EventDetails[]> {
  return await eventRepo.getEntireEventRegistrationByUserId(userId);
}

async function deleteEventRegistration(slug: string, userId: string): Promise<EventRegistration> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) {
    throw new ErrorResponse('Event not found');
  }

  // Check if event has started
  const currentDate = new Date();
  if (currentDate >= event.startDate) {
    throw new ErrorResponse('Cannot unregister from an event that has already started');
  }

  // Cannot unregister from an event before 1 day of the event
  if (currentDate < new Date(event.startDate.getDate() - 1)) {
    throw new ErrorResponse('Cannot unregister from an event before 24 hours of the event');
  }

  return await eventRepo.deleteEventRegistration(event.id, userId);
}

export const eventService = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventBySlug,
  getEventsByStatus,
  registerUserForEvent,
  deleteEventRegistration,
  getEventRegistrationsByEventId,
  getEventRegistrationByUserId,
  getEntireEventRegistrationByUserId,
};
