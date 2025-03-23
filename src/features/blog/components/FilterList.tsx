import React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterListItem } from '@/types/filterList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type FilterListProps<TList extends FilterListItem> = {
  queryKey: string;
  allSelectionText: string;
  filterListItems: Array<TList>;
};

export const FilterList = <TList extends FilterListItem>({
  queryKey,
  allSelectionText,
  filterListItems,
}: Readonly<FilterListProps<TList>>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSelection = searchParams.get(queryKey) ?? 'all';

  const handleSelectionChange = (value: string) => {
    let query: URLSearchParams;

    if (searchParams.size === 0) query = new URLSearchParams();
    else query = new URLSearchParams(searchParams.toString());

    query.set(queryKey, value);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-md border">
      <Select defaultValue="all" value={currentSelection} onValueChange={(value) => handleSelectionChange(value)}>
        <SelectTrigger className="w-[180px] text-black">
          <SelectValue placeholder="Select a category" className="text-red-900" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">{allSelectionText}</SelectItem>
            {filterListItems.map((item, index) => (
              <SelectItem key={`filter-item_${new Date().getTime}_${index}`} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
