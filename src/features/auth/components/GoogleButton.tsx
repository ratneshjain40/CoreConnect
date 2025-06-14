'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

import { Icon } from '@/constants/icons';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';

type GoogleButtonProps = {
  message: string;
};

export const GoogleButton = ({ message }: GoogleButtonProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isLoading, setIsLoading] = useState(false);

  const onClicked = async () => {
    setIsLoading(true);
    await signIn('google', {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    // In case the redirect fails for some reason
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={onClicked}
      isLoading={isLoading}
      loadingText="Connecting..."
      disabled={isLoading}
    >
      {!isLoading && <Icon name="google" className="mr-3 h-5 w-5" />} {message}
    </Button>
  );
};
