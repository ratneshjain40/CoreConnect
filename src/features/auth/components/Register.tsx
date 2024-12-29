import React from 'react';
import Link from 'next/link';

import { RegisterForm } from './RegisterForm';

export const Register = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">Enter your information to create an account</p>
        </div>

        <RegisterForm />

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
