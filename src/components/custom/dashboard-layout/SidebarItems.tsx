'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon, ICONS } from '@/constants/icons';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

type SidebarSection = {
  items: {
    title: string;
    url: string;
    icon?: string;
  }[];
};

export const SidebarItems = ({ sidebarSection }: { sidebarSection: SidebarSection }) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarSection.items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link
                href={item.url}
                className={`flex items-center gap-2 ${isActive ? 'font-semibold text-blue-600' : ''}`}
              >
                {item.icon && <Icon name={item.icon as keyof typeof ICONS} />}
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};
