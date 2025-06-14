'use server';

import { sendContactEmail } from './mail';
import { contactSchema } from '../schema/contact';
import { actionClient } from '@/lib/action-clients';
import { withEmailRateLimit } from '@/lib/arcjet';

export const sendContact = actionClient.schema(contactSchema).action(async (data) => {
  return await withEmailRateLimit(async () => {
    await sendContactEmail(data.parsedInput);
    return { success: 'Admin will contact you shortly.' };
  }, data.parsedInput.email);
});
