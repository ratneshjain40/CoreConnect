'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { resetSchema } from '../schema/auth';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword, sendResetPasswordEmail } from '../server/action';
import { useAction } from 'next-safe-action/hooks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const ResetForm = () => {
  const { execute, result, isPending, hasSucceeded, hasErrored } = useAction(sendResetPasswordEmail);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        {!isPending && hasErrored && <FormError message={result.serverError?.toString()} />}
        {!isPending && hasSucceeded && <FormSuccess message={result?.data?.success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          Send reset email
        </Button>
      </form>
    </Form>
  );
};
