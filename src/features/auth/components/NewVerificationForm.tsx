'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { BeatLoader } from 'react-spinners';
import { verifyEmail } from '../server/action';
import { useAction } from 'next-safe-action/hooks';
import { FormError, FormSuccess } from '@/components/custom';

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { execute, result, isPending, hasSucceeded, hasErrored } = useAction(verifyEmail);

  useEffect(() => {
    console.log(isPending, token);
    if (token) {
      execute({ token });
    }
  }, [token]);

  return (
    <div className="flex w-full items-center justify-center">
      {isPending && <BeatLoader />}
      {!isPending && hasErrored && <FormError message={result.serverError?.toString()} />}
      {!isPending && hasSucceeded && <FormSuccess message={result?.data?.success} />}
    </div>
  );
};
