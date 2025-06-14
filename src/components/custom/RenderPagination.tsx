import React, { useCallback, memo, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type RenderPaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

type PaginationItem = {
  value: number | string;
  type: 'number' | 'ellipsis';
  showOnMobile: boolean;
};

export const RenderPagination: React.FC<Readonly<RenderPaginationProps>> = memo(({ totalItems, itemsPerPage }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number.isNaN(parseInt(searchParams.get('page') ?? '1'))
    ? 1
    : parseInt(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil((totalItems === 0 ? 1 : totalItems) / itemsPerPage);

  const handlePageClick = useCallback(
    (page: number) => {
      let query: URLSearchParams;

      if (searchParams.size === 0) query = new URLSearchParams();
      else query = new URLSearchParams(searchParams.toString());

      query.set('page', page.toString());
      router.push(`${pathname}?${query.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const getPaginationRange = useCallback(() => {
    const range: PaginationItem[] = [];
    const maxButtons = 3;
    const delta = Math.floor(maxButtons / 2);

    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (currentPage <= delta) {
      end = Math.min(totalPages, maxButtons);
      start = 1;
    }
    if (currentPage + delta > totalPages) {
      start = Math.max(1, totalPages - maxButtons + 1);
    }

    if (start > 2) {
      range.push({ value: 1, type: 'number', showOnMobile: false });
      range.push({ value: '...', type: 'ellipsis', showOnMobile: true });
    } else if (start === 2) {
      range.push({ value: 1, type: 'number', showOnMobile: true });
    }

    for (let i = start; i <= end; i++) {
      range.push({ value: i, type: 'number', showOnMobile: true });
    }

    if (end < totalPages - 1) {
      range.push({ value: '...', type: 'ellipsis', showOnMobile: true });
      range.push({ value: totalPages, type: 'number', showOnMobile: false });
    } else if (end === totalPages - 1) {
      range.push({ value: totalPages, type: 'number', showOnMobile: true });
    }

    return range;
  }, [currentPage, totalPages]);

  const paginationRange = useMemo(() => getPaginationRange(), [getPaginationRange]);

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className="mt-5 flex items-center space-x-2 py-4">
      <button
        onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-md bg-primary p-2 text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {paginationRange.map((item, index) =>
        item.type === 'number' ? (
          <button
            key={`page-${item.value}-${index}`}
            onClick={() => handlePageClick(item.value as number)}
            className={`rounded-md border border-solid px-3 py-1 text-primary transition-colors ${
              currentPage === item.value ? 'border-primary' : 'border-primary/15'
            } hover:border-primary/90 hover:bg-primary/90 hover:text-white ${!item.showOnMobile && 'hidden md:block'}`}
            aria-label={`Go to page ${item.value}`}
            aria-current={currentPage === item.value ? 'page' : undefined}
          >
            {item.value}
          </button>
        ) : (
          <div
            key={`ellipsis-${index}`}
            className={`px-2 py-1 text-gray-400 ${!item.showOnMobile && 'hidden md:block'}`}
            aria-hidden="true"
          >
            {item.value}
          </div>
        )
      )}
      <button
        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="rounded-md bg-primary p-2 text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
});

RenderPagination.displayName = 'RenderPagination';
