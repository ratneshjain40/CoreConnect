'use server';

import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { NAVBAR } from '@/constants/navbar';
import { NavbarOption } from '@/types/navbar';
import { User } from '@prisma/client';
import { UserNav } from './UserNav';

import logo from '@/assets/entomon-logo.webp';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { currentUser } from '@/lib/auth';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../ui/navigation-menu';
import { DropdownNavItem } from './DropdownNavItem';

// Prefetchable routes that are most commonly accessed
const PREFETCH_ROUTES = ['/events', '/blogs', '/about'];

const DropdownLink = ({ url, name, description }: NavbarOption) => (
  <Link
    href={url}
    className="group grid h-auto w-full items-center justify-start gap-1 rounded-lg bg-white p-4 text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-800 focus:bg-green-50 focus:text-green-800 focus:outline-none border border-gray-100 hover:border-green-200"
    prefetch={PREFETCH_ROUTES.includes(url) ? true : false}
  >
    <div className="text-sm font-semibold leading-none group-hover:text-green-800">{name}</div>
    {description && <div className="line-clamp-2 text-xs leading-snug text-gray-600 group-hover:text-green-700">{description}</div>}
  </Link>
);

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform" prefetch={true}>
            <Image src={logo} height={52} width={52} alt="Entomon Logo" className="rounded-full " />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">Entomon Institute</span>
            <span className="text-xs text-green-600 font-medium">Invertebrate Zoology</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden items-center gap-8 lg:flex">
          <NavigationMenuList className="flex items-center gap-8">
            {NAVBAR.map((item) => {
              if (item.type === 'Link')
                return (
                  <NavigationMenuItem key={crypto.randomUUID()}>
                    <Link
                      prefetch={PREFETCH_ROUTES.includes(item.url ?? '') ? true : false}
                      href={item.url ?? ''}
                      className="relative text-sm font-semibold text-gray-700 transition-all duration-200 hover:text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                );
              if (item.type === 'Dropdown') return <DropdownNavItem key={crypto.randomUUID()} item={item} />;
              if (item.type === 'Button')
                return (
                  <NavigationMenuItem key={crypto.randomUUID()}>
                    <Link
                      href={item.url ?? ''}
                      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                );

              return null;
            })}
          </NavigationMenuList>

          {user ? (
            <UserNav user={user as User} />
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              Login / Register
            </Link>
          )}
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden border-gray-300 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
            >
              <Icon name="hamburger" className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-white w-80">
            <SheetTitle>
              <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
            </SheetTitle>
            <SheetDescription>
              <VisuallyHidden.Root>Mobile Menu</VisuallyHidden.Root>
            </SheetDescription>

            <div className="flex h-full flex-col">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 border-b border-gray-200 pb-6 mb-6">
                <Image src={logo} height={40} width={40} alt="Entomon Logo" className="rounded-full" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">Entomon Institute</span>
                  <span className="text-xs text-green-600 font-medium">Invertebrate Research</span>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-3">
                {NAVBAR.map((item) =>
                  item.type === 'Link' ? (
                    <Link
                      key={item.name}
                      prefetch={PREFETCH_ROUTES.includes(item.url ?? '') ? true : false}
                      href={item.url ?? ''}
                      className="block rounded-lg p-3 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-800"
                    >
                      {item.name}
                    </Link>
                  ) : item.type === 'Dropdown' ? (
                    <Collapsible key={item.name} className="space-y-2">
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 text-base font-semibold text-gray-700 hover:bg-green-50 hover:text-green-800 [&[data-state=open]>svg]:rotate-180">
                        {item.name}
                        <Icon name="chevronDown" className="h-4 w-4 transition-transform duration-200" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-4 space-y-2 border-l-2 border-green-200 pl-4">
                          {item.options?.map((option) => (
                            <DropdownLink
                              url={option.url}
                              key={option.name}
                              name={option.name}
                              description={option.description}
                            />
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : item.type === 'Button' ? (
                    <Link
                      key={item.name}
                      href={item.url ?? ''}
                      className="block rounded-lg bg-green-600 p-3 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-green-700"
                    >
                      {item.name}
                    </Link>
                  ) : null
                )}
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-6">
                {user ? (
                  <UserNav user={user as User} />
                ) : (
                  <Link
                    href="/auth/login"
                    className="block rounded-lg bg-gray-900 p-3 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
