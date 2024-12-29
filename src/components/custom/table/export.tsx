import React from 'react';

import { Table } from '@tanstack/react-table';
import { Icon } from '@/constants/icons';
import { exportTableToCSV } from '@/lib/export';
import { Button } from '@/components/ui/button';

export const ExportToCSV = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() =>
        exportTableToCSV(table, {
          filename: 'users',
          excludeColumns: [],
        })
      }
    >
      <Icon name="download" className="mr-2 size-4" />
      Export
    </Button>
  );
};
