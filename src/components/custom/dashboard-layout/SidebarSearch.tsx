'use client';

import { Label } from '@/components/ui/label';
import { SidebarGroup, SidebarGroupContent, SidebarInput, useSidebar } from '@/components/ui/sidebar';
import { Icon } from '@/constants/icons';

export const SidebarSearch = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <form>
      <SidebarGroup className={`relative py-0 ${state === 'collapsed' ? 'px-2' : 'px-2'}`}>
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          {state === 'collapsed' ? (
            // Collapsed state: Show only search icon as a button
            <button
              type="button"
              onClick={toggleSidebar}
              className="w-full h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400 hover:bg-white hover:border-green-300 hover:text-green-600 transition-all duration-200"
              aria-label="Expand sidebar to search"
            >
              <Icon name="search" className="size-4" />
            </button>
          ) : (
            // Expanded state: Show full search input
            <>
              <SidebarInput
                id="search"
                autoComplete="off"
                placeholder="Search anything..."
                className="pl-10 border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:bg-white focus:ring-green-500/20 hover:bg-white hover:border-green-300 transition-all duration-200"
              />
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none text-gray-400 transition-all duration-200"
              />
            </>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
};
