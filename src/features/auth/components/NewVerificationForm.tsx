'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { BeatLoader } from 'react-spinners';
// import { newVerificationAction } from '@/actions/auth';
import { FormError, FormSuccess } from '@/components/custom';

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    }

    // newVerificationAction(token)
    //   .then((data) => {
    //     setSuccess(data?.success);
    //     setError(data?.error);
    //   })
    //   .catch(() => {
    //     setError('Something went wrong');
    //   });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex w-full items-center justify-center">
      {!success && !error && <BeatLoader />}

      <FormSuccess message={success} />

      {!success && <FormError message={error} />}
    </div>
  );
};
