'use client';

import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

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
                    <BreadcrumbPage className="cursor-pointer hover:underline">{segmentLabel}</BreadcrumbPage>
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
