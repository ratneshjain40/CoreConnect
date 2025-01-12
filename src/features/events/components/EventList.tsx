import React from 'react';
import Image from 'next/image';

import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { EventDataType } from '../types/event';
import { ButtonLink } from '@/components/custom/ButtonLink';
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

type EventListProps = {
  events: EventDataType[];
};

export const EventList = ({ events }: EventListProps) => {
  const statusColor = {
    UPCOMING: 'bg-green-500',
    COMPLETED: 'bg-gray-500',
    CANCELLED: 'bg-red-500',
  };

  return (
    <div className="flex flex-wrap gap-8">
      {events.map((event) => (
        <Card key={event.id} className="w-full max-w-sm overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image src={event.coverImage} alt={event.title} layout="fill" objectFit="cover" />
              <Badge className={`absolute right-2 top-2 ${statusColor[event.status]}`}>{event.status}</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <h2 className="mb-2 text-xl font-semibold">{event.title}</h2>
            <p className="mb-4 text-sm text-gray-600">{event.description}</p>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {event.startDate === event.endDate
                ? format(event.startDate, 'PPP')
                : `${format(event.startDate, 'PPP')} - ${format(event.endDate, 'PPP')}`}
            </div>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-2 h-4 w-4" />
              {event.location}
            </div>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <TagIcon className="mr-2 h-4 w-4" />₹{event.price}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {event.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 p-4">
            <ButtonLink name="View Event" url={`/events/${event.id}`} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
