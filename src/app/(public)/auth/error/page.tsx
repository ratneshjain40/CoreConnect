import React from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { Button } from '@/components/ui/button';

const AuthErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:flex-row">
      <div className="flex w-full items-center justify-center bg-background p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Icon name="error" className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">Authentication Error</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Oops! It seems there was a problem authenticating your account.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="mb-5 space-y-4 rounded-md">
              <p className="text-sm text-muted-foreground">This could be due to:</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>An expired session</li>
                <li>Invalid credentials</li>
                <li>Account lockout due to too many failed attempts</li>
              </ul>
            </div>

            <Link href="/auth/login" passHref>
              <Button className="w-full">Try Again</Button>
            </Link>

            <div className="text-center">
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Need help? Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
