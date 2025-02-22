import React, { Suspense } from 'react';
import { Loading } from '@/components/custom';

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
