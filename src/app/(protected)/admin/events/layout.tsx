import React, { Suspense } from 'react';
import { MantineProvider } from '@mantine/core';
import { Loading } from '@/components/custom';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </MantineProvider>
  );
}
