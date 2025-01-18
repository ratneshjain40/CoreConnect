'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eventService } from './service';
import { ErrorResponse } from '@/types/errors';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { createEventSchema, updateEventSchema } from '../schema/event';

// returns all events
export const getEvents = actionClient.action(async () => {
  return await eventService.getEvents();
});

// returns all upcoming events
export const getUpcomingEvents = actionClient.action(async () => {
  return await eventService.getUpcomingEvents();
});

// returns all completed events
export const getCompletedEvents = actionClient.action(async () => {
  return await eventService.getCompletedEvents();
});

// returns a single event object based on slug
export const getEventBySlug = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventBySlug(data.parsedInput.slug);
  });

// admin can create an event
export const createEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(createEventSchema)
  .action(async (data) => {
    await eventService.createEvent(data.parsedInput);
    return { success: 'Event created successfully' };
  });

// admin can update an event
export const updateEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(updateEventSchema)
  .action(async (data) => {
    await eventService.updateEvent(data.parsedInput);
    return { success: 'Event updated successfully' };
  });

// admin can delete an event
export const deleteEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    await eventService.deleteEvent(data.parsedInput.slug);
    revalidatePath('/admin/events');
    return { success: 'Event deleted successfully' };
  });

// mark event as COMPLETED
export const markEventAsCompleted = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    await eventService.markEventAsCompleted(data.parsedInput.slug);
    revalidatePath('/admin/events/[slug]');
    return { success: 'Event Marked as Completed!' };
  });
