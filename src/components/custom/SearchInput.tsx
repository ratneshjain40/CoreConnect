'use client';

import { Input } from '@/components/ui/input';
import { Icon } from '@/constants/icons';

export const SearchInput = () => (
  <div className="relative w-full">
    <Icon name="search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input type="search" placeholder="Search..." className="w-full pl-8" />
  </div>
);
