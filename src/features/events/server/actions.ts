'use server';

import { z } from 'zod';
import { eventService } from './service';
import { revalidatePath } from 'next/cache';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { createEventSchema, eventRegistrationSchema, getEventByStatusSchema, updateEventSchema } from '../schema/event';
import { paginationSchema } from '@/schema/pagination';

export const getEvents = actionClient
  .schema(paginationSchema)
  .action(async (data) => {
    const { page = 1, limit = 10 } = data.parsedInput;
    return await eventService.getEvents(page, limit);
  });

export const getEventsByStatus = actionClient
  .schema(getEventByStatusSchema.merge(paginationSchema))
  .action(async (data) => {
    const { status, page = 1, limit = 10 } = data.parsedInput;
    return await eventService.getEventsByStatus(status, page, limit);
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
    revalidatePath(`/events/${data.parsedInput.eventSlug}`);
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

export const getEventRegistrationsByEventId = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      slug: z.string(),
    }).merge(paginationSchema)
  )
  .action(async (data) => {
    const { slug, page = 1, limit = 10 } = data.parsedInput;
    return await eventService.getEventRegistrationsByEventId(slug, page, limit);
  });

export const getEventRegistrationByUserId = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      userId: z.string(),
    }).merge(paginationSchema)
  )
  .action(async (data) => {
    const { userId, page = 1, limit = 10 } = data.parsedInput;
    return await eventService.getEventRegistrationByUserId(userId, page, limit);
  });

export const getEntireEventRegistrationByUserId = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      userId: z.string(),
    }).merge(paginationSchema)
  )
  .action(async (data) => {
    const { userId, page = 1, limit = 10 } = data.parsedInput;
    return await eventService.getEntireEventRegistrationByUserId(userId, page, limit);
  });
