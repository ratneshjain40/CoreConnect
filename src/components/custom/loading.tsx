import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const Loading = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      {/* Full-width Skeleton */}
      <Skeleton className="h-[200px] w-full animate-pulse rounded-xl" />

      <div className="w-full space-y-4">
        {/* Text Skeletons */}
        <Skeleton className="h-6 w-full animate-pulse md:w-[80%]" />
        <Skeleton className="h-6 w-4/5 animate-pulse md:w-[70%]" />
        <Skeleton className="h-6 w-full animate-pulse md:w-[90%]" />

        {/* Additional Skeletons to simulate paragraph loading */}
        <Skeleton className="h-6 w-full animate-pulse md:w-[85%]" />
        <Skeleton className="h-6 w-3/4 animate-pulse md:w-[75%]" />
      </div>
    </div>
  );
};
