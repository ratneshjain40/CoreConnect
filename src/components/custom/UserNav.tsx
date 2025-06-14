import Link from 'next/link';

import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { User } from '@prisma/client';
import initials from 'initials';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserNav = ({ user }: { user: User }) => {
  const userNavItems = [
    { href: `/${user.role.toLowerCase()}/dashboard`, label: 'Dashboard', shortcut: '⌘P' },
    { href: `/${user.role.toLowerCase()}/settings`, label: 'Settings', shortcut: '⌘S' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-9 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-green-50 hover:text-green-600"
        >
          <Avatar className="size-9">
            {user?.image && <AvatarImage src={user?.image} alt={initials(user?.name as string)} />}
            <AvatarFallback>{initials(user?.name as string)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userNavItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href} className="w-full cursor-pointer hover:bg-green-50 hover:text-green-600">
                {item.label}
                {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-green-50 hover:text-green-600">
          <LogoutButton>Logout</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
