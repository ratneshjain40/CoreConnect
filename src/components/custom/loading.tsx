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

export const CardGridLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[180px] w-full animate-pulse rounded-lg" />
            <Skeleton className="h-5 w-4/5 animate-pulse" />
            <Skeleton className="h-4 w-2/3 animate-pulse" />
          </div>
        ))}
    </div>
  );
};

export const TableLoading = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-10 w-[150px] animate-pulse" />
        <Skeleton className="h-10 w-[200px] animate-pulse" />
      </div>
      <div className="space-y-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-16 w-full animate-pulse" />
          ))}
      </div>
    </div>
  );
};
