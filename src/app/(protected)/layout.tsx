import React, { Suspense } from 'react';

import { CustomBreadcrumbs, Loading, UserNav } from '@/components/custom';
import { Separator } from '@/components/ui/separator';
import { User } from '@prisma/client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import {
  adminSidebarItemsList,
  CompanyDetails,
  SidebarItems,
  userSidebarItemsList,
} from '@/components/custom/dashboard-layout';
import { currentUser } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 bg-white">
          <CompanyDetails />
        </SidebarHeader>

        <SidebarContent className="bg-white">
          {((user?.role === 'ADMIN' ? adminSidebarItemsList : userSidebarItemsList) || []).map((section) => (
            <SidebarGroup key={section.title} className="px-3 py-2">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  <SidebarItems sidebarSection={section} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-w-0 bg-gray-50/50">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white/95 backdrop-blur-sm pl-4 pr-4 md:pr-8 shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors" />
            <Separator orientation="vertical" className="mr-2 h-4 text-gray-300" />
            <div className="hidden sm:block">
              <CustomBreadcrumbs />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile breadcrumbs indicator */}
            <div className="sm:hidden">
              <div className="text-sm font-medium text-gray-600 truncate max-w-32">
                Dashboard
              </div>
            </div>
            <UserNav user={user as User} />
          </div>
        </header>

        <Suspense fallback={<Loading />}>
          <main className="w-full max-w-full flex-1 overflow-x-hidden px-3 py-4 md:px-6 md:py-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
