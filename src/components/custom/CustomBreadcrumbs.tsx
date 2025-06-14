'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const unclickableSegments = ['edit', 'create'];

export const CustomBreadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const segmentLabel = segment.charAt(0).toLowerCase() + segment.slice(1);

          return (
            <React.Fragment key={url}>
              <BreadcrumbItem>
                {isLast || unclickableSegments.includes(segment.toLowerCase()) ? (
                  <BreadcrumbPage>{segmentLabel}</BreadcrumbPage>
                ) : (
                  <Link href={url} passHref>
                    <BreadcrumbPage className="cursor-pointer relative text-gray-700 transition-all duration-200 hover:text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full">
                      {segmentLabel}
                    </BreadcrumbPage>
                  </Link>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
