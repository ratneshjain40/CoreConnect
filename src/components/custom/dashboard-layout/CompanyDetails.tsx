'use client';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/entomon-logo.webp';
import { SidebarGroup, useSidebar } from '@/components/ui/sidebar';

export const CompanyDetails = () => {
  const { state } = useSidebar();

  return (
    <SidebarGroup className={`flex cursor-pointer flex-row ${state === 'collapsed' ? 'justify-center px-2' : 'px-0'} pt-0 pb-3`}>
      <Link href="/" className="flex items-center gap-1 transition-transform" prefetch={true}>
        <Image
          src={logo}
          height={state === 'collapsed' ? 36 : 48}
          width={state === 'collapsed' ? 36 : 48}
          alt="Entomon Logo"
          className="rounded-full flex-shrink-0"
        />
        {state !== 'collapsed' && (
          <div className="flex flex-col min-w-0">
            <span className="text-lg font-bold text-gray-900 truncate">Entomon Institute</span>
            <span className="text-xs text-green-600 font-medium truncate">Invertebrate Zoology</span>
          </div>
        )}
      </Link>
    </SidebarGroup>
  );
};
