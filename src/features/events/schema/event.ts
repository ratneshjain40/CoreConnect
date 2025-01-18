import { z } from 'zod';
import { EventStatus } from '@prisma/client';
import { emailSchema } from '@/constants/email';

const getEventByStatusSchema = z.object({
  status: z.nativeEnum(EventStatus),
});

const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }),
  description: z.string(),
  price: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })),
  location: z.string().min(1, 'Location is required'),
  startDate: z.date(),
  endDate: z.date(),
  status: z.nativeEnum(EventStatus),
});

const updateEventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').optional(),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }).optional(),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })).optional(),
  description: z.string().optional(),
  price: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format').optional(),
  location: z.string().min(1, 'Location is required').optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.nativeEnum(EventStatus).optional(),
});

const phoneRegex = /^(\+?[1-9]\d{0,2}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

const eventRegistrationSchema = z.object({
  eventSlug: z.string().min(1, { message: 'Event slug is required.' }),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: 'Invalid phone number.',
  }),
});

type CreateEvent = z.infer<typeof createEventSchema>;
type UpdateEvent = z.infer<typeof updateEventSchema>;

export { getEventByStatusSchema, createEventSchema, updateEventSchema, eventRegistrationSchema };
export type { CreateEvent, UpdateEvent };
