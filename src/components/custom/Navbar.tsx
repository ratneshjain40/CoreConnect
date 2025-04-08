'use server';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { UserNav } from './UserNav';
import { User } from '@prisma/client';
import { ButtonLink } from './ButtonLink';
import { SearchInput } from './SearchInput';
import { Icon } from '@/constants/icons';
import { NAVBAR } from '@/constants/navbar'; // Import the navbar options
import { NavbarOption } from '@/types/navbar';

import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { currentUser } from '@/lib/auth';
import { DropdownNavItem } from './DropdownNavItem';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../ui/navigation-menu';
import logo from '@/assets/entomon-logo.png';

const DropdownLink = ({ url, name, description }: NavbarOption) => (
  <Link
    href={url}
    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    prefetch={false}
  >
    <div className="text-sm font-medium leading-none group-hover:underline">{name}</div>
    {description && <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</div>}
  </Link>
);

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src={logo} height={47} width={47} alt="Entomon Logo" />
          <span className="text-lg font-semibold">Entomon Institute</span>
        </Link>

        <NavigationMenu className="hidden items-center gap-6 lg:flex">
          <NavigationMenuList className="flex items-center gap-6">
            {NAVBAR.map((item) => {
              if (item.type === 'Link')
                return (
                  <NavigationMenuItem key={crypto.randomUUID()}>
                    <Link
                      prefetch={false}
                      href={item.url ?? ''}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                );
              if (item.type === 'Dropdown') return <DropdownNavItem key={crypto.randomUUID()} item={item} />;
              if (item.type === 'Button')
                return (
                  <NavigationMenuItem key={crypto.randomUUID()}>
                    <ButtonLink name={item.name} url={item.url ?? ''} />
                  </NavigationMenuItem>
                );

              return null;
            })}
          </NavigationMenuList>

          <SearchInput />
          {user ? <UserNav user={user as User} /> : <ButtonLink url="/auth/login" name="Login/Register" />}
        </NavigationMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Icon name="hamburger" className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-background">
            <SheetTitle>
              <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
            </SheetTitle>
            <SheetDescription>
              <VisuallyHidden.Root>Mobile Menu</VisuallyHidden.Root>
            </SheetDescription>

            <div className="flex h-full flex-col justify-between">
              <nav className="grid gap-4 px-4 py-6">
                {NAVBAR.map((item) =>
                  item.type === 'Link' ? (
                    <Link
                      key={item.name}
                      prefetch={false}
                      href={item.url ?? ''}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ) : item.type === 'Dropdown' ? (
                    <Collapsible key={item.name} className="grid gap-2">
                      <CollapsibleTrigger className="flex items-center justify-between text-lg font-medium [&[data-state=open]>svg]:rotate-90">
                        {item.name}
                        <Icon name="chevronDown" className="h-4 w-4 transition-all" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="-mx-4 grid gap-2 bg-muted p-4">
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
                    <ButtonLink key={item.name} name={item.name} url={item.url ?? ''} />
                  ) : null
                )}
                <SearchInput />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
