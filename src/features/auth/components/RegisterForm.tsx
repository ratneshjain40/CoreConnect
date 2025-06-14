'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schema/auth';

import { GoogleButton } from './GoogleButton';
import { FormError, FormSuccess } from '@/components/custom';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerUser } from '../server/action';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const RegisterForm = () => {
  const router = useRouter();
  const { execute, result, isPending, hasSucceeded, hasErrored } = useAction(registerUser);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    form.clearErrors();
    form.reset();
    execute(data);
  };

  if (!isPending && hasSucceeded) {
    setTimeout(() => {
      router.push('/auth/login');
    }, 1200);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Max"
                    {...field}
                    className={fieldState.invalid ? 'border-red-500' : ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Robinson"
                    {...field}
                    className={fieldState.invalid ? 'border-red-500' : ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="******"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isPending && hasErrored && <FormError message={result.serverError?.toString()} />}
        {!isPending && hasSucceeded && <FormSuccess message={result?.data?.success} />}
        <Button type="submit" isLoading={isPending} loadingText="Creating account..." className="w-full">
          Create an account
        </Button>
      </form>

      <GoogleButton message="Signup with Google" />
    </Form>
  );
};
