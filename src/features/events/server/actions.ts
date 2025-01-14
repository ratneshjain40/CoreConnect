'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eventService } from './service';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { createEventSchema, updateEventSchema } from '../schema/event';
import { ErrorResponse } from '@/types/errors';

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
    let startDate = new Date(data.parsedInput.startDate).getDate();
    let endDate = new Date(data.parsedInput.endDate).getDate();
    if (startDate > endDate) {
      throw new ErrorResponse('Start date must be before or same as end date');
    }
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
    let startDate = new Date(data.parsedInput.startDate).getDate();
    let endDate = new Date(data.parsedInput.endDate).getDate();
    if (startDate > endDate) {
      throw new ErrorResponse('Start date must be before or same as end date');
    }
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
