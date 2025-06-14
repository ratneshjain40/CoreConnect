import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { UserRole } from '@prisma/client';
import { eventService } from './service';
import { revalidatePath } from 'next/cache';
import { router, publicProcedure, privateProcedure } from '~/server/trpc/trpc';
import { createEventSchema, eventRegistrationSchema, getEventByStatusSchema, updateEventSchema } from '../schema/event';

export const eventsRouter = router({
  getEvents: publicProcedure
    .query(async () => {
      try {
        return await eventService.getEvents();
      } catch (error) {
        console.error("Error getting events:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch events.' });
      }
    }),

  getEventsByStatus: publicProcedure
    .input(getEventByStatusSchema)
    .query(async ({ input }) => {
      try {
        return await eventService.getEventsByStatus(input);
      } catch (error) {
        console.error("Error getting events by status:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch events by status.' });
      }
    }),

  getEventBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const event = await eventService.getEventBySlug(input.slug);
        if (!event) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found.' });
        }
        return event;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error getting event by slug:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch event.' });
      }
    }),

  createEvent: privateProcedure
    .meta({ roleGate: UserRole.ADMIN })
    .input(createEventSchema)
    .mutation(async ({ input }) => {
      try {
        const newEvent = await eventService.createEvent(input);
        revalidatePath('/admin/events');
        revalidatePath('/events');
        return { success: 'Event created successfully', event: newEvent };
      } catch (error) {
        console.error("Error creating event:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create event.' });
      }
    }),

  updateEvent: privateProcedure
    .meta({ roleGate: UserRole.ADMIN })
    .input(updateEventSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedEvent = await eventService.updateEvent(input);
        if (!updatedEvent) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found or failed to update.' });
        }
        revalidatePath('/admin/events');
        revalidatePath(`/events/${updatedEvent.slug}`);
        return { success: 'Event updated successfully', event: updatedEvent };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error updating event:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update event.' });
      }
    }),

  deleteEvent: privateProcedure
    .meta({ roleGate: UserRole.ADMIN })
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await eventService.deleteEvent(input.slug);
        revalidatePath('/admin/events');
        revalidatePath('/events');
        return { success: 'Event deleted successfully' };
      } catch (error) {
        console.error("Error deleting event:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete event.' });
      }
    }),

  registerUserForEvent: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(eventRegistrationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const registration = await eventService.registerUserForEvent(ctx.session.user.id, input);
        revalidatePath(`/events/${input.eventSlug}`); // Assuming eventSlug is part of eventRegistrationSchema
        // Also might need to revalidate user-specific registration lists if they exist
        return { success: 'User registered successfully', registration };
      } catch (error: any) {
        console.error("Error registering user for event:", error);
        // Handle specific errors, e.g., if event is full or already registered
        if (error.message?.includes("already registered")) {
             throw new TRPCError({ code: 'BAD_REQUEST', message: error.message });
        }
        if (error.message?.includes("event is full")) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: error.message });
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to register user for event.' });
      }
    }),

  unregisterUserForEvent: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(z.object({ slug: z.string() })) // Assuming slug refers to event slug
    .mutation(async ({ ctx, input }) => {
      try {
        await eventService.deleteEventRegistration(input.slug, ctx.session.user.id);
        revalidatePath(`/events/${input.slug}`);
        return { success: 'User unregistered successfully' };
      } catch (error) {
        console.error("Error unregistering user from event:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to unregister user.' });
      }
    }),

  getEventRegistrationsByEventId: privateProcedure // For CSV export
    .meta({ roleGate: UserRole.ADMIN })
    .input(z.object({ slug: z.string() })) // Assuming slug refers to event slug
    .query(async ({ input }) => { // Changed to query as it's fetching data for export
      try {
        const participants = await eventService.getEventRegistrationsByEventId(input.slug);
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
      } catch (error) {
        console.error("Error getting event registrations for export:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch event registrations.' });
      }
    }),

  getEventRegistrationByUserId: privateProcedure // Fetches specific registration for a user
    .meta({ roleGate: UserRole.USER })
    // Input needs event identifier (e.g. eventSlug or eventId) and userId (from context)
    .input(z.object({ eventSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        // Assuming eventService.getEventRegistrationByUserId needs event identifier and userId
        // The original action took userId as input, but it should come from context for security.
        // The service method might need adjustment or this is a misinterpretation of its use.
        // For now, assuming it finds a specific registration for this user for a given event.
        const registration = await eventService.getEventRegistrationByUserId(ctx.session.user.id, input.eventSlug);
        // if (!registration) {
        //   throw new TRPCError({ code: 'NOT_FOUND', message: 'Registration not found for this event.' });
        // }
        return registration; // Can be null if not registered
      } catch (error) {
        console.error("Error getting event registration by user ID:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch event registration.' });
      }
    }),

  // This seems to fetch ALL registrations for a user across all events.
  getEntireEventRegistrationByUserId: privateProcedure
    .meta({ roleGate: UserRole.USER })
    // No input needed if using userId from context
    .query(async ({ ctx }) => {
      try {
        // The original action took userId as input, which is redundant for a privateProcedure.
        // Using ctx.session.user.id instead.
        return await eventService.getEntireEventRegistrationByUserId(ctx.session.user.id);
      } catch (error) {
        console.error("Error getting all event registrations by user ID:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch all event registrations.' });
      }
    }),
});

export type EventsRouter = typeof eventsRouter;
