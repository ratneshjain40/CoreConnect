'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginUser } from '../server/action';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schema/auth';

import { GoogleButton } from './GoogleButton';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAction } from 'next-safe-action/hooks';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || undefined;
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const { execute, result, isPending, hasSucceeded, hasErrored } = useAction(loginUser);

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with a different provider' : '';

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    execute({ ...values, callbackUrl });
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

        {!isPending && hasErrored && <FormError message={result.serverError?.toString()} />}
        {!isPending && hasSucceeded && <FormSuccess message={result?.data?.success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          {showTwoFactor ? 'Confirm' : 'Login'}
        </Button>
      </form>

      {!showTwoFactor ? <GoogleButton message="Login with Google" /> : null}
    </Form>
  );
};
