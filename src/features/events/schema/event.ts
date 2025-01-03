import { EventStatus } from "@prisma/client";
import { z } from "zod";

const createEventSchema = z.object({
    title: z.string(),
    slug: z.string(),
    coverImage: z.string().nullable().optional(),
    description: z.string(),
    price: z.string(),
    location: z.string(),
    date: z.date(),
    status: z.nativeEnum(EventStatus),
})

const updateEventSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    slug: z.string().optional(),
    coverImage: z.string().nullable().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    location: z.string().optional(),
    date: z.date().optional(),
    status: z.nativeEnum(EventStatus).optional(),
})

type CreateEvent = z.infer<typeof createEventSchema>;
type UpdateEvent = z.infer<typeof updateEventSchema>;

export {
    createEventSchema,
    updateEventSchema,
}

export type {
    CreateEvent,
    UpdateEvent,
}