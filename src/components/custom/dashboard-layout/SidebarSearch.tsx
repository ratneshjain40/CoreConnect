'use client';

import { Icon } from '@/constants/icons';
import { Label } from '@/components/ui/label';
import { SidebarGroup, SidebarGroupContent, SidebarInput, useSidebar } from '@/components/ui/sidebar';

export const SidebarSearch = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <form>
      <SidebarGroup className={`relative py-0 ${state === 'collapsed' ? 'px-0' : ''}`}>
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            autoComplete="off"
            onFocus={() => state !== 'expanded' && toggleSidebar()}
            onClick={() => state !== 'expanded' && toggleSidebar()}
            placeholder={`${state !== 'collapsed' ? 'Search anything...' : ''}`}
            className={`pl-8 ${state === 'collapsed' ? 'cursor-pointer pl-4' : ''}`}
          />
          <Icon
            name="search"
            className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
};
