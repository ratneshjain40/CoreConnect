'use client';

import { useSearchParams } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPasswordSchema } from '../schema/auth';
import { FormError, FormSuccess } from '@/components/custom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '../server/action';
import { useAction } from 'next-safe-action/hooks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { execute, result, isPending, hasSucceeded, hasErrored } = useAction(resetPassword);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      token: '',
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (token) {
            form.setValue('token', token);
            form.handleSubmit(onSubmit)();
          } else {
            alert('No token found');
          }
        }}
        className="space-y-6"
      >
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

        {!token && <FormError message="Invalid password reset link. Please request a new password reset." />}
        {!isPending && hasErrored && <FormError message={result.serverError?.toString()} />}
        {!isPending && hasSucceeded && <FormSuccess message={result?.data?.success} />}
        <Button
          type="submit"
          isLoading={isPending}
          loadingText="Resetting password..."
          className="w-full"
          disabled={!token || isPending}
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
