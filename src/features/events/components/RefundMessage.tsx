'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export const RefundMessage = () => {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Payment Information</AlertTitle>
      <AlertDescription>
        This event has already been paid. For any refund requests, please contact the event administrator.
      </AlertDescription>
    </Alert>
  );
}; 