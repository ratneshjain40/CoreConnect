'use client';

import React from 'react';
import Link from 'next/link';

import { BugIcon } from './BugIcon';
import { UserNav } from './UserNav';
import { User } from '@prisma/client';
import { ButtonLink } from './ButtonLink';
import { SearchInput } from './SearchInput';
import { Icon } from '@/constants/icons';
import { NAVBAR } from '@/constants/navbar';
import { NavbarOption } from '@/types/navbar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSession } from 'next-auth/react';

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

export const Navbar = () => {
  const session = useSession().data;
  const user = session?.user as User;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BugIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Entomon Institute</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAVBAR.map((item) =>
            item.type === 'Link' ? (
              <Link
                key={item.name}
                prefetch={false}
                href={item.url ?? ''}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ) : item.type === 'Dropdown' ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                    {item.name}
                    <Icon name="chevronDown" className="h-4 w-4 transition-all" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.options?.map((option) => (
                    <DropdownMenuItem key={option.name} asChild>
                      <DropdownLink url={option.url ?? '#'} name={option.name} description={option.description} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.type === 'Button' ? (
              <ButtonLink key={item.name} name={item.name} url={item.url ?? ''} />
            ) : null
          )}

          <SearchInput />
          {user ? <UserNav user={user as User} /> : <ButtonLink url="/auth/login" name="Login/Register" />}
        </nav>

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
