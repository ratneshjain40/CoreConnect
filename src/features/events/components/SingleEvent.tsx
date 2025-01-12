import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';
import { Badge } from '@/components/ui/badge';
import { EventDataType } from '../types/event';
import { RegistrationForm } from './RegistrationForm';
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';

type SingleEventProps = {
  data: EventDataType | null;
};

export const SingleEvent = async ({ data }: SingleEventProps) => {
  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Error Loading Event Post</h1>
        <p>
          We&apos;re sorry, but we couldn&apos;t load the event data or probably it doesn&apos;t exist. <br />
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <article className="w-full bg-muted py-6 md:py-8 lg:py-10">
      <div className="container gap-4 px-4 md:flex-row md:px-6">
        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <Badge variant="default">{data.status}</Badge>
        </div>

        <div className="flex gap-8">
          <div className="basis-4/6">
            {data.coverImage && (
              <Image
                width={1200}
                height={630}
                alt={data.title}
                src={data.coverImage}
                className="mb-8 aspect-video w-full rounded-lg object-cover"
              />
            )}

            <div
              className="prose mb-12 max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
            />
          </div>

          <div className="basis-2/6">
            <span className="text-sm text-gray-500">By Entomon Institute</span>
            <div className="mb-2 mt-4 flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.startDate === data.endDate
                ? format(data.startDate, 'PPP')
                : `${format(data.startDate, 'PPP')} - ${format(data.endDate, 'PPP')}`}
            </div>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <Link target="_blank" href="/">
                {data.location}
              </Link>
            </div>
            <div className="mb-8 flex items-center text-sm text-gray-500">
              <TagIcon className="mr-2 h-4 w-4" />
              ₹{data.price}
            </div>

            <div className="my-4 flex gap-2">
              {data.categories.map((category, index) => (
                <Badge key={index} variant="default">
                  {category}
                </Badge>
              ))}
            </div>

            <RegistrationForm />
          </div>
        </div>
      </div>
    </article>
  );
};
