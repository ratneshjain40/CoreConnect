import React from 'react';

import { ResetForm } from './ResetForm';

export const Reset = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Reset Your Account</h1>
          <p className="text-balance text-muted-foreground">Enter your email address to reset your account.</p>
        </div>

        <ResetForm />
      </div>
    </div>
  );
};
