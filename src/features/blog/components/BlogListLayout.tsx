'use client';

import { RenderPagination } from '@/components/custom/RenderPagination';
import { categoryFilterList, priceFilterList } from '@/constants/filterLists';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { BlogDataType, CategoriesFilterList, PriceFilterList } from '../types/blog';
import { BlogList } from './BlogList';
import { FilterList } from './FilterList';

type BlogListLayoutProps = {
  data: Array<BlogDataType>;
};

export const CATEGORY_QUERY_KEY = 'category';
export const PRICE_QUERY_KEY = 'price';
export const ITEMS_PER_PAGE = 12;

export const BlogListLayout: React.FC<Readonly<BlogListLayoutProps>> = ({ data }) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get(CATEGORY_QUERY_KEY) ?? "all";
  const currentPrice = searchParams.get(PRICE_QUERY_KEY) ?? "all";

  const filteredBlogs = useMemo(() => {
    if (currentCategory === 'all' && currentPrice === 'all') return data;
    if (currentCategory === 'all') return data.filter((d) => d.isPaid === (currentPrice === 'paid'));
    if (currentPrice === 'all') return data.filter((d) => d.categories.includes(currentCategory ?? ''));

    return data.filter((d) => d.categories.includes(currentCategory ?? '') && d.isPaid === (currentPrice === 'paid'));
  }, [data, currentCategory, currentPrice]);

  return (
    <React.Fragment>
      {/* Mobile responsive header */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>

          {/* Mobile: Stack filters vertically, Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="w-full sm:w-auto">
              <FilterList<Omit<PriceFilterList, 'checked'>>
                allSelectionText="All Prices"
                queryKey={PRICE_QUERY_KEY}
                filterListItems={priceFilterList}
              />
            </div>
            <div className="w-full sm:w-auto">
              <FilterList<Omit<CategoriesFilterList, 'checked'>>
                allSelectionText="All Categories"
                queryKey={CATEGORY_QUERY_KEY}
                filterListItems={categoryFilterList}
              />
            </div>
          </div>
        </div>
      </div>

      <BlogList blogs={filteredBlogs ?? []} />
      <div className="">
        <RenderPagination totalItems={filteredBlogs.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </React.Fragment>
  );
};
