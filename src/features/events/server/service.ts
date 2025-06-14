import 'server-only';

import { z } from 'zod';
import { EventDetails, EventRegistrationWithUser, eventRepo } from './repo';
import { generateSlug } from '@/lib/slugify';
import { ErrorResponse } from '@/types/errors';
import { Event, EventRegistration, EventStatus } from '@prisma/client';
import { EventWithoutDescriptionType } from '../types/event';
import { CreateEvent, eventRegistrationSchema, getEventByStatusSchema, UpdateEvent } from '../schema/event';
import { endOfDay, startOfDay } from '@/lib/dates';

async function getEvents(): Promise<EventWithoutDescriptionType[]> {
  return await eventRepo.getAllEvents();
}

async function updateEventStatusBasedOnDates(event: Event): Promise<EventStatus> {
  const currentDate = new Date();
  if (event.startDate <= startOfDay(currentDate)) return 'COMPLETED';
  return event.status;
}

async function getEventsByStatus(data: z.infer<typeof getEventByStatusSchema>): Promise<EventWithoutDescriptionType[]> {
  const events = await eventRepo.getEventsByStatus(data.status);
  // Only check status updates for UPCOMING and PAUSED events
  const eventsToCheck = events.filter((event) => event.status === 'UPCOMING' || event.status === 'PAUSED');

  for (const event of eventsToCheck) {
    const correctStatus = await updateEventStatusBasedOnDates(event as Event);
    if (correctStatus !== event.status) {
      await eventRepo.updateEvent(event.id, { status: correctStatus });
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
  let startDate = startOfDay(new Date(data.startDate));
  let endDate = endOfDay(new Date(data.endDate));

  let currentDate = startOfDay(new Date());
  if (startDate <= currentDate) throw new ErrorResponse('Start date should be in the future');
  if (startDate > endDate) throw new ErrorResponse('Start date must be before or same as end date');

  let slug = generateSlug(data.title);
  return await eventRepo.createEvent({ ...data, slug, startDate, endDate });
}

async function updateEvent(data: UpdateEvent): Promise<Event> {
  let event = await eventRepo.getEventById(data.id);
  if (!event) throw new ErrorResponse('Event not found');

  if (event.status === 'COMPLETED' && data.startDate && data.endDate) {
    if (startOfDay(data.startDate) !== event.startDate || endOfDay(data.endDate) !== event.endDate) {
      throw new ErrorResponse('Cannot change start or end date of a completed/ongoing event');
    }
  }

  if (data.startDate && data.endDate) {
    let currentDate = startOfDay(new Date());
    if (data.startDate < currentDate) throw new ErrorResponse('Start date cannot be in the past');
    if (data.startDate > data.endDate) throw new ErrorResponse('Start date must be before or same as end date');
  }

  let slug = data.title ? (data.title === event.title ? event.slug : generateSlug(data.title)) : event.slug;
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

  if (event.status === 'COMPLETED') {
    throw new ErrorResponse('Cannot register for an event that is completed');
  }

  if (event.status === 'PAUSED') {
    throw new ErrorResponse('Cannot register for an event that is paused');
  }

  // Check if the user is already registered for the event
  let existingRegistration = await eventRepo.getEventRegistrationByEventIdAndUserId(event.id, userId);
  if (existingRegistration) {
    throw new ErrorResponse('User is already registered for this event');
  }

  return await eventRepo.registerUserForEvent({
    eventId: event.id,
    userId: userId,
    phone: data.phone,
  });
}

async function getEventRegistrationsByEventId(slug: string): Promise<EventRegistrationWithUser[]> {
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

  const currentDate = new Date();
  if (currentDate >= event.startDate) {
    throw new ErrorResponse('Cannot unregister from an event that has already started');
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
