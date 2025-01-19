import 'server-only';

import { eventRepo } from './repo';
import { Event, EventRegistration } from '@prisma/client';
import { ErrorResponse } from '@/types/errors';
import { CreateEvent, eventRegistrationSchema, getEventByStatusSchema, UpdateEvent } from '../schema/event';
import { generateSlug } from '@/lib/slugify';
import { z } from 'zod';

async function getEvents(): Promise<Event[]> {
  return await eventRepo.getAllEvents();
}

async function getEventsByStatus(data: z.infer<typeof getEventByStatusSchema>): Promise<Event[]> {
  return await eventRepo.getEventsByStatus(data.status);
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

async function registerUserForEvent(userId: string, data: z.infer<typeof eventRegistrationSchema>): Promise<EventRegistration> {
  let event = await eventRepo.getEventBySlug(data.eventSlug);
  if (!event) throw new ErrorResponse('Event not found');
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

async function deleteEventRegistration(slug: string, userId: string): Promise<EventRegistration> {
  let event = await eventRepo.getEventBySlug(slug);
  if (!event) {
    throw new ErrorResponse('Event not found');
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
  getEventRegistrationsByEventId,
  getEventRegistrationByUserId,
  deleteEventRegistration,
};
