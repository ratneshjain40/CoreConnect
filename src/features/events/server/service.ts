import 'server-only';

import { eventRepo } from './repo';
import { ErrorResponse } from '@/types/errors';
import { CreateEvent, UpdateEvent } from '../schema/event';

async function getEvents() {
  return await eventRepo.getAllEvents();
}

async function getEventById(id: string) {
  let event = await eventRepo.getEventById(id);
  if (!event) {
    throw new ErrorResponse('Event not found');
  }
  return event;
}

async function createEvent(data: CreateEvent) {
  return await eventRepo.createEvent(data);
}

async function updateEvent(id: string, data: UpdateEvent) {
  let event = await eventRepo.getEventById(id);
  if (!event) {
    throw new ErrorResponse('Event not found');
  }
  return await eventRepo.updateEvent(id, {
    title: data.title,
    coverImage: data.coverImage,
    description: data.description,
    price: data.price,
    categories: data.categories,
    location: data.location,
    startDate: data.startDate,
    endDate: data.endDate,
  });
}

async function deleteEvent(id: string) {
  let event = await eventRepo.getEventById(id);
  if (!event) {
    throw new ErrorResponse('Event not found');
  }
  return await eventRepo.deleteEvent(id);
}

export const eventService = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
