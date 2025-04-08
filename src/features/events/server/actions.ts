'use server';

import { z } from 'zod';
import { eventService } from './service';
import { revalidatePath, revalidateTag } from 'next/cache';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { createEventSchema, eventRegistrationSchema, getEventByStatusSchema, updateEventSchema } from '../schema/event';

export const getEvents = actionClient.action(async () => {
  return await eventService.getEvents();
});

export const getEventsByStatus = actionClient.schema(getEventByStatusSchema).action(async (data) => {
  return await eventService.getEventsByStatus(data.parsedInput);
});

export const getEventBySlug = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventBySlug(data.parsedInput.slug);
  });

export const createEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(createEventSchema)
  .action(async (data) => {
    await eventService.createEvent(data.parsedInput);
    return { success: 'Event created successfully' };
  });

export const updateEvent = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(updateEventSchema)
  .action(async (data) => {
    await eventService.updateEvent(data.parsedInput);
    return { success: 'Event updated successfully' };
  });

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

export const registerUserForEvent = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(eventRegistrationSchema)
  .action(async (data) => {
    await eventService.registerUserForEvent(data.ctx.session.user.id, data.parsedInput);
    revalidatePath;
    return { success: 'User registered successfully' };
  });

export const unregisterUserForEvent = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    await eventService.deleteEventRegistration(data.parsedInput.slug, data.ctx.session.user.id);
    revalidatePath(`/events/${data.parsedInput.slug}`);
    return { success: 'User unregistered successfully' };
  });

// Event Participant CSV Export
export const getEventRegistrationsByEventId = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    const participants = await eventService.getEventRegistrationsByEventId(data.parsedInput.slug);
    console.log('participants', participants);
    if (!participants || participants.length === 0) return '';

    const headers = ['name', 'email', 'phone'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    participants.forEach((participant) => {
      const row = headers.map((header) => {
        if (header === 'name') {
          return JSON.stringify(participant.user?.name ?? '');
        } else if (header === 'email') {
          return JSON.stringify(participant.user?.email ?? '');
        } else if (header === 'phone') {
          return JSON.stringify(participant.phone ?? '');
        }
        return '""';
      });
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  });

export const getEventRegistrationByUserId = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      userId: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEventRegistrationByUserId(data.parsedInput.userId);
  });

export const getEntireEventRegistrationByUserId = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      userId: z.string(),
    })
  )
  .action(async (data) => {
    return await eventService.getEntireEventRegistrationByUserId(data.parsedInput.userId);
  });
