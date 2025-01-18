'use server';

import { sendContactEmail } from './mail';
import { contactSchema } from '../schema/contact';
import { actionClient } from '@/lib/action-clients';

export const sendContact = actionClient.schema(contactSchema).action(async (data) => {
  await sendContactEmail(data.parsedInput);
  return { success: 'Admin will contact you shortly.' };
});
