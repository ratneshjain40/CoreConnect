import { actionClient } from '@/lib/action-clients';
import { sendContactEmail } from './mail';
import { contactSchema } from '../schema/contact';

export const sendContact = actionClient
    .schema(contactSchema)
    .action(async (data) => {
        await sendContactEmail(data.parsedInput);
        return { success: 'Contact form submitted successfully' };
    });