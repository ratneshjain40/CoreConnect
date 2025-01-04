'use server';

import { authActionClient } from '@/lib/action-clients';
import { eventService } from './service';
import { z } from 'zod';
import { createEventSchema, updateEventSchema } from '../schema/event';

const getEvents = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .action(async () => {
    return await eventService.getEvents();
  });

const getEventById = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventById(data.parsedInput.id);
  });

const createEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(createEventSchema)
  .action(async (data) => {
    return await eventService.createEvent(data.parsedInput);
  });

const updateEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(updateEventSchema)
  .action(async (data) => {
    return await eventService.updateEvent(data.parsedInput.id, data.parsedInput);
  });

const deleteEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.deleteEvent(data.parsedInput.id);
  });

export const eventActions = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
