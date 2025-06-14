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
    <div className="w-full sm:w-auto sm:min-w-[180px]">
      <Select defaultValue="all" value={currentSelection} onValueChange={(value) => handleSelectionChange(value)}>
        <SelectTrigger className="w-full sm:w-[180px] h-12 sm:h-10 border-gray-300 bg-white text-black shadow-sm hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[var(--radix-select-trigger-width)]">
          <SelectGroup>
            <SelectItem value="all" className="cursor-pointer hover:bg-gray-50">{allSelectionText}</SelectItem>
            {filterListItems.map((item, index) => (
              <SelectItem
                key={`filter-item_${new Date().getTime}_${index}`}
                value={item.value}
                className="cursor-pointer hover:bg-gray-50"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
