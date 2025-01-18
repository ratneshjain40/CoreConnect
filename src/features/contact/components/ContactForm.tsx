'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { contactSchema } from '../schema/contact';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { sendContact } from '../server/action';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { Textarea } from '@/components/ui/textarea';
import { FormError, FormSuccess } from '@/components/custom';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

export const ContactForm = () => {
  const { execute, result, isPending } = useAction(sendContact);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    form.clearErrors();
    form.reset();
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="Your phone number"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  {...field}
                  placeholder="Your message"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormError message={result.serverError?.toString()} />
        <FormSuccess message={result?.data?.success} />
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isPending}>
          Send Message
        </Button>
      </form>
    </Form>
  );
};
