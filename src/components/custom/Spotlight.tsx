'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Icon, ICONS } from '@/constants/icons';

type CommandOption = {
  name: string;
  link: string;
  label: string;
  group: string;
  shortcut?: string;
};

export const Spotlight = () => {
  const [open, setOpen] = useState<boolean>(true);

  const commands: CommandOption[] = [
    { name: 'blogs', label: 'Blogs', group: 'Suggestions', link: '/blogs' },
    { name: 'events', label: 'Events', group: 'Suggestions', link: '/events' },
    { name: 'courses', label: 'Calendar', group: 'Suggestions', link: '/courses' },
    { name: 'user', label: 'Profile', group: 'Settings', link: '/user/dashboard' },
    { name: 'settings', label: 'Settings', group: 'Settings', link: '/user/settings' },
  ];

  const groupedCommands = commands.reduce<Record<string, CommandOption[]>>((acc, command) => {
    if (!acc[command.group]) {
      acc[command.group] = [];
    }
    acc[command.group].push(command);
    return acc;
  }, {});

  return (
    <Command className="rounded-lg border">
      <CommandInput className="border-none" placeholder="Type a command or search..." />

      {open && (
        <CommandList>
          <CommandEmpty>No results found!</CommandEmpty>

          {Object.entries(groupedCommands).map(([groupName, groupCommands]) => (
            <div key={groupName}>
              <CommandGroup heading={groupName}>
                {groupCommands.map((command) => (
                  <Link href={command.link} key={command.name}>
                    <CommandItem>
                      <Icon name={command.name as keyof typeof ICONS} className="mr-2 h-4 w-4" />
                      <span>{command.label}</span>
                      {command.shortcut && <CommandShortcut>{command.shortcut}</CommandShortcut>}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
