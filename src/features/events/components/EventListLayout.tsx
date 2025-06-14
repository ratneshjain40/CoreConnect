'use client';

import { RenderPagination } from '@/components/custom/RenderPagination';
import { categoryFilterList, priceFilterList, statusFilterList } from '@/constants/filterLists';
import { FilterList } from '@/features/blog/components/FilterList';
import { CategoriesFilterList, PriceFilterList } from '@/features/blog/types/blog';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { EventWithoutDescriptionType } from '../types/event';
import { EventList } from './EventList';

type EventListProps = {
  readonly events: EventWithoutDescriptionType[];
};

export const CATEGORY_QUERY_KEY = 'category';
export const PRICE_QUERY_KEY = 'price';
export const STATUS_QUERY_KEY = 'status';
export const ITEMS_PER_PAGE = 12;

export const EventListLayout = ({ events }: EventListProps) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get(CATEGORY_QUERY_KEY) ?? "all";
  const currentPrice = searchParams.get(PRICE_QUERY_KEY) ?? "all";
  const currentStatus = searchParams.get(STATUS_QUERY_KEY) ?? "UPCOMING";

  const filteredEvents = useMemo(() => {
    if (!currentCategory || !currentPrice || !currentStatus) return events;
    
    return events.filter((event) => {
      const isPaid = parseInt(event.price) > 0;
      
      // Status filter (always applied unless 'all')
      const matchesStatus = currentStatus === 'all' || event.status === currentStatus;
      
      // Category filter
      const matchesCategory = currentCategory === 'all' || event.categories.includes(currentCategory);
      
      // Price filter
      const matchesPrice = currentPrice === 'all' || isPaid === (currentPrice === 'paid');
      
      return matchesStatus && matchesCategory && matchesPrice;
    });
  }, [events, currentCategory, currentPrice, currentStatus]);

  return (
    <React.Fragment>
      {/* Header with filters */}      <div className="mb-8 space-y-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Events</h2>

          {/* Filters - responsive layout */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <FilterList<Omit<CategoriesFilterList, 'checked'>>
              allSelectionText="All Status"
              queryKey={STATUS_QUERY_KEY}
              filterListItems={statusFilterList}
            />
            <FilterList<Omit<PriceFilterList, 'checked'>>
              allSelectionText="All Prices"
              queryKey={PRICE_QUERY_KEY}
              filterListItems={priceFilterList}
            />
            <FilterList<Omit<CategoriesFilterList, 'checked'>>
              allSelectionText="All Categories"
              queryKey={CATEGORY_QUERY_KEY}
              filterListItems={categoryFilterList}
            />
          </div>
        </div>
      </div>

      <EventList events={filteredEvents ?? []} />
      <div className="mt-8">
        <RenderPagination totalItems={filteredEvents.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </React.Fragment>
  );
};
