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
import { useRouter } from 'next/navigation';
import PaymentButton from '@/features/razorpay/components/PaymentButton';
import { EventDataType } from '../types/event';

export const RegistrationForm = ({
  userId,
  isRegistered,
  isAuthenticated,
  eventData,
}: {
  userId: string;
  isRegistered: boolean;
  isAuthenticated: boolean;
  eventData: EventDataType;
}) => {
  const { slug, id, price, status } = eventData;
  const isPaid = parseInt(price) > 0;
  const router = useRouter();
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
    router.refresh();
  };

  const onUnregisterSubmit = () => {
    unregister({ slug });
    router.refresh();
  };

  if (isRegistered) {
    return (
      <>
        <FormError message={unregisterResult.serverError?.toString()} />
        {/* <FormSuccess message={unregisterResult?.data?.success} /> */}
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
      {isPaid && (
        <div className="mt-4 text-sm text-gray-500">
          <PaymentButton eventRegistration={form.getValues()} eventId={id} userId={userId} amount={parseInt(price)} />
        </div>
      )}
    </>
  );
};
