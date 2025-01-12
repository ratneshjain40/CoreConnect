'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eventService } from './service';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { createEventSchema, updateEventSchema } from '../schema/event';

export const getEvents = actionClient.action(async () => {
  return await eventService.getEvents();
});

export const getEventById = actionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventById(data.parsedInput.id);
  });

export const createEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(createEventSchema)
  .action(async (data) => {
    await eventService.createEvent(data.parsedInput);
    revalidatePath('/admin/events');
    return { success: 'Event created successfully' };
  });

export const updateEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(updateEventSchema)
  .action(async (data) => {
    await eventService.updateEvent(data.parsedInput.id, data.parsedInput);
    revalidatePath('/admin/events');
    return { success: 'Event updated successfully' };
  });

export const deleteEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async (data) => {
    await eventService.deleteEvent(data.parsedInput.id);
    revalidatePath('/admin/events');
    return { success: 'Event deleted successfully' };
  });
