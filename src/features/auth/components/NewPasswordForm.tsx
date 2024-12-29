'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
// import { newPasswordAction } from '@/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPasswordSchema } from '../schema/auth';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    setError('');
    setSuccess('');

    if (!token) {
      setError('Missing token!');
      return;
    }

    startTransition(() => {
      // newPasswordAction(values, token).then((data) => {
      //   setError(data?.error);
      //   setSuccess(data?.success);
      // });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl className="border-gray-300">
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    disabled={isPending}
                    className={fieldState.invalid ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
