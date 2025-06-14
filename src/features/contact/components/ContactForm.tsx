'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { contactSchema } from '../schema/contact';

import { FormError, FormSuccess } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAction } from 'next-safe-action/hooks';
import { sendContact } from '../server/action';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  {...field}
                  className={`h-12 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-colors ${
                    fieldState.invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className={`h-12 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-colors ${
                    fieldState.invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isPending}
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
              <FormLabel className="text-gray-900 font-semibold">Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="Your phone number"
                  className={`h-12 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-colors ${
                    fieldState.invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isPending}
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
              <FormLabel className="text-gray-900 font-semibold">Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  placeholder="Tell us about your inquiry, collaboration ideas, or questions..."
                  className={`rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-colors resize-none ${
                    fieldState.invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormError message={result.serverError?.toString()} />
          <FormSuccess message={result?.data?.success} />

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 text-white hover:bg-green-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            isLoading={isPending}
            loadingText="Sending message..."
          >
            Send Message
          </Button>
        </div>
      </form>
    </Form>
  );
};
