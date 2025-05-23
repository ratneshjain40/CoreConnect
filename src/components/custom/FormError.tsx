import React from 'react';
import { Icon } from '@/constants/icons';

type FormErrorProps = {
  message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <Icon name="warning" className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
