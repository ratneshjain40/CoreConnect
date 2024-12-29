import React from 'react';

import { NewPasswordForm } from './NewPasswordForm';

export const NewPassword = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">New Password</h1>
          <p className="text-balance text-muted-foreground">Enter your new password below.</p>
        </div>

        <NewPasswordForm />
      </div>
    </div>
  );
};
