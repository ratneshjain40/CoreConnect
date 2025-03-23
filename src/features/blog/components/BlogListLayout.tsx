'use client';

import React, { useEffect, useMemo } from 'react';
// import { BlogsWithoutContent } from '../server/repo';
import { categoryFilterList, priceFilterList } from '@/constants/filterLists';
import { BlogDataType, CategoriesFilterList, PriceFilterList } from '../types/blog';
import { FilterList } from './FilterList';
import { BlogList } from './BlogList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RenderPagination } from '@/components/custom/RenderPagination';

type BlogListLayoutProps = {
  data: Array<BlogDataType>;
};

export const CATEGORY_QUERY_KEY = 'category';
export const PRICE_QUERY_KEY = 'price';
export const ITEMS_PER_PAGE = 12;

export const BlogListLayout: React.FC<Readonly<BlogListLayoutProps>> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get(CATEGORY_QUERY_KEY);
  const currentPrice = searchParams.get(PRICE_QUERY_KEY);
  const currentPage = searchParams.get('page');

  const filteredBlogs = useMemo(() => {
    if (currentCategory === 'all' && currentPrice === 'all') return data;
    if (currentCategory === 'all') return data.filter((d) => d.isPaid === (currentPrice === 'paid'));
    if (currentPrice === 'all') return data.filter((d) => d.categories.includes(currentCategory ?? ''));

    return data.filter((d) => d.categories.includes(currentCategory ?? '') && d.isPaid === (currentPrice === 'paid'));
  }, [data, currentCategory, currentPrice]);

  useEffect(() => {
    let query: URLSearchParams;

    if (searchParams.size === 0) query = new URLSearchParams();
    else query = new URLSearchParams(searchParams.toString());

    let queryChanged = false;

    if (!currentCategory) {
      query.set(CATEGORY_QUERY_KEY, 'all');
      queryChanged = true;
    } else {
      const categoryExists = categoryFilterList.some((category) => category.value === currentCategory);

      if (!categoryExists) {
        query.set(CATEGORY_QUERY_KEY, 'all');
        queryChanged = true;
      }
    }

    if (!currentPrice) {
      query.set(PRICE_QUERY_KEY, 'all');
      queryChanged = true;
    } else {
      const priceExists = priceFilterList.some((price) => price.value === currentPrice);

      if (!priceExists) {
        query.set(PRICE_QUERY_KEY, 'all');
        queryChanged = true;
      }
    }

    if (!currentPage) {
      query.set('page', '1');
      queryChanged = true;
    } else {
      const page = parseInt(currentPage);

      if (Number.isNaN(page) || page < 1) {
        query.set('page', '1');
        queryChanged = true;
      }
    }

    if (queryChanged) router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [pathname, router]);

  return (
    <React.Fragment>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="p-2 text-3xl font-bold tracking-tight">Blogs</h2>
        <div className="flex items-center gap-4">
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
      <BlogList blogs={filteredBlogs ?? []} />
      <div className="">
        <RenderPagination totalItems={filteredBlogs.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </React.Fragment>
  );
};
