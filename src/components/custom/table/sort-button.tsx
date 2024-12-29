import React from 'react';
import { Column } from '@tanstack/react-table';
import { Icon } from '@/constants/icons';

type SortButtonProps<TData> = {
  column: Column<TData, unknown>;
  label: string;
};

export const SortColumnButton = <TData,>({ column, label }: SortButtonProps<TData>) => {
  return (
    <span
      className="flex cursor-pointer items-center"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      <Icon name={column.getIsSorted() === 'asc' ? 'filterArrowUp' : 'filterArrowDown'} className="ml-1 h-4 w-4" />
    </span>
  );
};
