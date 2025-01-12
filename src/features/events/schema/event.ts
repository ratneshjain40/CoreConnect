import { z } from 'zod';
import { EventStatus } from '@prisma/client';
import { emailSchema } from '@/constants/email';

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
  title: z.string().min(1, 'Title is required'),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })),
  description: z.string(),
  price: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.date(),
  endDate: z.date(),
  status: z.nativeEnum(EventStatus),
});

const phoneRegex = /^(\+?[1-9]\d{0,2}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

const eventRegistrationSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(20, { message: 'Name must not exceed 20 characters.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'Name can only contain alphabets.',
    }),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: 'Invalid phone number.',
  }),
});

type CreateEvent = z.infer<typeof createEventSchema>;
type UpdateEvent = z.infer<typeof updateEventSchema>;

export { createEventSchema, updateEventSchema, eventRegistrationSchema };
export type { CreateEvent, UpdateEvent };
