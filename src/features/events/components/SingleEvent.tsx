import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { currentUser } from '@/lib/auth';
import DOMPurify from 'isomorphic-dompurify';
import { Badge } from '@/components/ui/badge';
import { EventDataType } from '../types/event';
import { RegistrationForm } from './RegistrationForm';
import { CalendarIcon, MapPinIcon, TagIcon, UserIcon } from 'lucide-react';
import { getEventRegistrationByUserId } from '../server/actions';

type SingleEventProps = {
  data: EventDataType;
};

const statusColor = {
  UPCOMING: 'bg-green-500',
  COMPLETED: 'bg-gray-500',
  PAUSED: 'bg-yellow-500',
} as const;

const getPriceTagBgColor = (price: string) => {
  if (Number.isNaN(parseInt(price))) return 'bg-secondary text-gray-500';
  if (parseInt(price) === 0) return 'bg-green-500 text-primary-foreground';
  return 'bg-yellow-500 text-secondary-foreground';
};

const getPriceTextBgColor = (price: string) => {
  if (Number.isNaN(parseInt(price))) return 'bg-secondary/40';
  if (parseInt(price) === 0) return 'bg-green-500/40';
  return 'bg-yellow-500/40';
};

const getPriceTextColor = (price: string) => {
  if (Number.isNaN(parseInt(price))) return 'text-gray-700';
  if (parseInt(price) === 0) return 'text-green-700';
  return 'text-yellow-700';
};

export const SingleEvent = async ({ data }: SingleEventProps) => {
  const user = await currentUser();
  const userRegistrations = user ? await getEventRegistrationByUserId({ userId: user.id }) : null;
  const isRegistered = userRegistrations?.data?.some((registration) => registration.eventId === data.id);

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
    <article className="w-full py-6 md:py-8 lg:py-10">
      <div className="container gap-4 px-4 md:flex-row md:px-6">
        <div className="mb-8 flex flex-col items-start gap-2">
          <Badge className={`${statusColor[data.status]}`}>{data.status}</Badge>
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <div className="flex gap-2">
            {data.categories.map((category) => (
              <Badge key={crypto.randomUUID()} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-8 lg:flex lg:gap-8">
          <div className="lg:basis-4/6">
            {data.coverImage && (
              <Image
                width={1200}
                height={630}
                alt={data.title}
                src={data.coverImage}
                className="mb-8 aspect-video w-full rounded-lg object-cover"
              />
            )}
          </div>
          <div className="sm:flex sm:gap-8 lg:block lg:basis-2/6">
            <div className="sm:flex-1">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="flex items-center justify-center rounded-full bg-secondary p-2">
                  <UserIcon className="h-4 w-4" />
                </span>{' '}
                Entomon Institute
              </div>
              <div className="my-4 h-[1px] w-full bg-gray-100"></div>
              <div className="mb-4 flex items-center gap-1 text-sm text-gray-500">
                <div
                  className={`flex w-max items-center gap-1 rounded-full pr-2 text-sm text-gray-500 ${getPriceTextBgColor(data.price)}`}
                >
                  <span
                    className={`flex items-center justify-center rounded-full p-2 ${getPriceTagBgColor(data.price)}`}
                  >
                    <TagIcon className="h-4 w-4" />
                  </span>
                  <span className={`font-semibold ${getPriceTextColor(data.price)}`}>
                    {parseInt(data.price) === 0 ? 'Free Event' : `₹ ${data.price}`}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="flex items-center justify-center rounded-full bg-secondary p-2">
                    <CalendarIcon className="h-4 w-4" />
                  </span>{' '}
                  {data.startDate === data.endDate
                    ? format(data.startDate, 'dd MMM yyyy')
                    : `${format(data.startDate, 'dd MMM yyyy')} - ${format(data.endDate, 'dd MMM yyyy')}`}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="flex items-center justify-center rounded-full bg-secondary p-2">
                    <MapPinIcon className="h-4 w-4" />
                  </span>{' '}
                  <Link target="_blank" href="/">
                    {data.location}
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-0 sm:flex-1 lg:mt-8">
              <div className="flex items-center gap-1 text-sm font-medium">
                <span className="flex items-center justify-center rounded-full bg-secondary p-2">
                  <CalendarIcon className="h-4 w-4" />
                </span>{' '}
                Attend This Event
              </div>
              <div className="my-4 h-[1px] w-full bg-gray-100"></div>
              <RegistrationForm slug={data.slug} isAuthenticated={!!user} isRegistered={!!isRegistered} status={data.status} />
            </div>
          </div>
        </div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }} />
      </div>
    </article>
  );
};
