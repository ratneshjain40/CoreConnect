'use client';

import React, { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
// import { loginAction } from '@/actions/auth';
import { loginUser } from '../server/action';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schema/auth';

import { GoogleButton } from './GoogleButton';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || undefined;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with a different provider' : '';

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError('');
    setSuccess('');

    await loginUser(values);

    startTransition(() => {
      // loginAction(values, callbackUrl)
      //   .then((data) => {
      //     if (data?.error) {
      //       form.reset();
      //       setError(data.error);
      //     }
      //     if (data?.success) {
      //       form.reset();
      //       setSuccess(data.success);
      //     } else if (data?.twoFactor) {
      //       setShowTwoFactor(true);
      //     }
      //   })
      //   .catch(() => setError('Something went wrong!'));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {showTwoFactor ? (
          <FormField
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Two-Factor Code</FormLabel>
                <FormControl className="border-gray-300">
                  <Input
                    {...field}
                    type="number"
                    disabled={isPending}
                    placeholder="123456"
                    className={fieldState.invalid ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
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
                      disabled={isPending}
                      placeholder="m@example.com"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link href="/auth/reset" className="m-0 ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </>
        )}

        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          {showTwoFactor ? 'Confirm' : 'Login'}
        </Button>
      </form>

      {!showTwoFactor ? <GoogleButton message="Login with Google" /> : null}
    </Form>
  );
};
