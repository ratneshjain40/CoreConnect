'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { BugIcon } from '@/components/custom';
import { SidebarGroup, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';

export const CompanyDetails = () => {
  const { state } = useSidebar();
  const router = useRouter();

  return (
    <SidebarGroup className={`flex cursor-pointer flex-row gap-2 ${state === 'collapsed' ? 'px-0' : 'px-2'} py-3`}>
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <>
          <BugIcon className={`w-fit ${state === 'collapsed' ? 'mx-auto' : ''}`} />
          {state !== 'collapsed' && <span className="text-lg font-bold">Entomon Institute</span>}
        </>
      </Link>
    </SidebarGroup>
  );
};
