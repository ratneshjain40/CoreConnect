'use client';

import React from 'react';
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

  const onClicked = () => {
    signIn('google', {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button variant="outline" className="w-full" onClick={onClicked}>
      <Icon name="google" className="mr-3 h-5 w-5" /> {message}
    </Button>
  );
};
