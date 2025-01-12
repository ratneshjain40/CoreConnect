'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { eventRegistrationSchema } from '../schema/event';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const RegistrationForm = () => {
  //   const { execute, result, isPending, hasSucceeded, hasErrored } = useAction();

  const form = useForm<z.infer<typeof eventRegistrationSchema>>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
    },
  });

  const onSubmit = (values: z.infer<typeof eventRegistrationSchema>) => {
    // execute(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Robinson" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
                </FormControl>
                <FormMessage />
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
                    placeholder="m@example.com"
                    className={fieldState.invalid ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+91 1234567890"
                    className={fieldState.invalid ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormError message={result.serverError?.toString()} />
          <FormSuccess message={result?.data?.success} /> */}
          <Button type="submit" className="w-full">
            Attend Event
          </Button>
        </form>
      </Form>
    </>
  );
};
