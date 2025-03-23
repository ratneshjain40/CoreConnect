import React from 'react';
import Image from 'next/image';

import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/custom/ButtonLink';
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { EventWithoutDescriptionType } from '../types/event';

type EventListProps = {
  events: EventWithoutDescriptionType[];
};

const statusColor = {
  UPCOMING: 'bg-green-500',
  STARTED: 'bg-blue-500',
  PAUSED: 'bg-yellow-500',
  COMPLETED: 'bg-gray-500',
} as const;

const getPriceTagColor = (price: string) => {
  if (Number.isNaN(parseInt(price))) return 'bg-secondary/80 text-secondary-foreground';
  if (parseInt(price) === 0) return 'bg-green-500 text-primary-foreground';
  return 'bg-yellow-500 text-secondary-foreground';
};

const checkIfEventIsOneDay = (startDate: Date, endDate: Date) => {
  return format(startDate, 'dd MMM yyyy') === format(endDate, 'dd MMM yyyy');
};

export const EventList: React.FC<Readonly<EventListProps>> = ({ events }) => {
  return (
    <div className="flex flex-wrap gap-8">
      {events.map((event) => (
        <Card key={event.id} className="flex w-full max-w-sm flex-col overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image src={event.coverImage} alt={event.title} layout="fill" objectFit="cover" />
              <Badge className={`absolute right-2 top-2 ${statusColor[event.status]}`}>{event.status}</Badge>
            </div>
            <div className="flex flex-wrap gap-2 p-4 pb-0">
              {event.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between p-4 pt-2">
            <h2 className="mb-2 text-xl font-semibold">{event.title}</h2>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIfEventIsOneDay(event.startDate, event.endDate)
                ? format(event.startDate, 'dd MMM yyyy')
                : `${format(event.startDate, 'dd MMM yyyy')} - ${format(event.endDate, 'dd MMM yyyy')}`}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {event.location}
              </div>
              <div
                className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${getPriceTagColor(event.price)}`}
              >
                <TagIcon className="mr-2 h-4 w-4" />
                {parseInt(event.price) === 0 ? 'Free' : `₹${event.price}`}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-start p-4 pt-2">
            <ButtonLink name="View Event" url={`/events/${event.slug}`} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
