import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type RenderPaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

export const RenderPagination: React.FC<Readonly<RenderPaginationProps>> = ({ totalItems, itemsPerPage }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number.isNaN(parseInt(searchParams.get('page') ?? '1'))
    ? 1
    : parseInt(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil((totalItems === 0 ? 1 : totalItems) / itemsPerPage);

  const handlePageClick = (page: number) => {
    let query: URLSearchParams;

    if (searchParams.size === 0) query = new URLSearchParams();
    else query = new URLSearchParams(searchParams.toString());

    query.set('page', page.toString());
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };

  const getPaginationRange = () => {
    const range = [];
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
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="mt-5 flex items-center space-x-2 py-4">
      <button
        onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-md bg-primary p-2 text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {paginationRange.map((item) =>
        item.type === 'number' ? (
          <button
            key={crypto.randomUUID()}
            onClick={() => handlePageClick(item.value as number)}
            className={`rounded-md border border-solid px-3 py-1 text-primary transition-colors ${
              currentPage === item.value ? 'border-primary' : 'border-primary/15'
            } hover:border-primary/90 hover:bg-primary/90 hover:text-white ${!item.showOnMobile && 'hidden md:block'}`}
          >
            {item.value}
          </button>
        ) : (
          <div
            key={crypto.randomUUID()}
            className={`px-2 py-1 text-gray-400 ${!item.showOnMobile && 'hidden md:block'}`}
          >
            {item.value}
          </div>
        )
      )}
      <button
        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="rounded-md bg-primary p-2 text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
