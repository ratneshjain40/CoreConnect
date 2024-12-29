import React from 'react';

import { NewVerificationForm } from './NewVerificationForm';

export const NewVerification = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Please Wait</h1>
          <p className="text-balance text-muted-foreground">Confirming your verification...</p>
        </div>

        <NewVerificationForm />
      </div>
    </div>
  );
};
