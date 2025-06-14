'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Icon, ICONS } from '@/constants/icons';

type SidebarSection = {
  items: {
    title: string;
    url: string;
    icon?: string;
  }[];
};

export const SidebarItems = ({ sidebarSection }: { sidebarSection: SidebarSection }) => {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      {sidebarSection.items.map((item) => {
        const isActive = pathname === item.url || pathname.startsWith(item.url + '/');

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link
                href={item.url}
                className={`flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  state === 'collapsed' ? 'justify-center gap-0' : 'gap-3'
                } ${
                  isActive
                    ? 'hover:bg-green-700 hover:text-white bg-green-600 text-white font-semibold shadow-none '
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium'
                } [&[data-active=true]]:bg-green-600 [&[data-active=true]]:text-white [&[data-active=true]]:shadow-none [&[data-active=true]]:hover:bg-green-600 [&[data-active=true]]:hover:text-white`}
              >
                {item.icon && (
                  <Icon
                    name={item.icon as keyof typeof ICONS}
                    className={`h-4 w-4 ${isActive ? 'text-white hover:text-white' : 'text-gray-500'}`}
                  />
                )}
                {state !== 'collapsed' && <span>{item.title}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};
