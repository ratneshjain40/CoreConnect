'use client';

import React from 'react';
import { NavbarProps } from '@/types/navbar';
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from '../ui/navigation-menu';
import { ListItem } from './NavigationMenuListItem';

export type DropdownNavItemProps = {
  item: NavbarProps;
};

export const DropdownNavItem: React.FC<Readonly<DropdownNavItemProps>> = ({ item }) => {
  return (
    <NavigationMenuItem key={crypto.randomUUID()}>
      <NavigationMenuTrigger className="h-auto rounded-none bg-transparent p-0 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
        {item.name}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-max gap-2 p-1">
          {item.options?.map((option) => (
            <ListItem
              key={crypto.randomUUID()}
              title={option.name}
              href={option.url}
              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              {option.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
