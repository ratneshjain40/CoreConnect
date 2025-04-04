'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { eventRegistrationSchema } from '../schema/event';
import { registerUserForEvent, unregisterUserForEvent } from '../server/actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const RegistrationForm = ({
  slug,
  isRegistered,
  isAuthenticated,
  status,
}: {
  slug: string;
  isRegistered: boolean;
  isAuthenticated: boolean;
  status: string;
}) => {
  const { execute: register, result: registerResult, isPending: isRegistering } = useAction(registerUserForEvent);

  const {
    execute: unregister,
    result: unregisterResult,
    isPending: isUnregistering,
  } = useAction(unregisterUserForEvent);

  const form = useForm<z.infer<typeof eventRegistrationSchema>>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      eventSlug: slug,
      phone: '',
    },
  });

  const onRegisterSubmit = (values: z.infer<typeof eventRegistrationSchema>) => {
    form.clearErrors();
    form.reset();
    register(values);
  };

  const onUnregisterSubmit = () => {
    unregister({ slug });
  };

  if (isRegistered) {
    return (
      <>
        <FormError message={unregisterResult.serverError?.toString()} />
        <FormSuccess message={unregisterResult?.data?.success} />
        <Button onClick={onUnregisterSubmit} className="w-full" disabled={isUnregistering}>
          Unregister from Event
        </Button>
      </>
    );
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="grid gap-4">
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
                    disabled={isRegistered}
                    placeholder="+91 1234567890"
                    className={fieldState.invalid ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={registerResult.serverError?.toString()} />
          <FormSuccess message={registerResult?.data?.success} />
          <Button type="submit" className="w-full" disabled={!isAuthenticated || isRegistering || status === 'PAUSED'}>
            Attend Event
          </Button>
        </form>
      </Form>
    </>
  );
};
