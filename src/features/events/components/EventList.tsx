'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { EventWithoutDescriptionType } from '../types/event';

type EventListProps = {
  events: EventWithoutDescriptionType[];
};

const statusColor = {
  UPCOMING: 'bg-green-500 text-white',
  PAUSED: 'bg-yellow-500 text-white',
  COMPLETED: 'bg-gray-500 text-white',
} as const;

const getPriceTagColor = (price: string) => {
  if (Number.isNaN(parseInt(price))) return 'bg-gray-100 text-gray-700 border-gray-200';
  if (parseInt(price) === 0) return 'bg-green-100 text-green-700 border-green-200';
  return 'bg-yellow-100 text-yellow-700 border-yellow-200';
};

const checkIfEventIsOneDay = (startDate: Date, endDate: Date) => {
  return format(startDate, 'dd MMM yyyy') === format(endDate, 'dd MMM yyyy');
};

export const EventList: React.FC<Readonly<EventListProps>> = ({ events }) => {
  // No events state
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center space-y-6 max-w-md">
          {/* Icon */}
          <div className="inline-flex items-center justify-center rounded-xl bg-gray-100 p-4 shadow-lg">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">
              No Events Available
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We don't have any events scheduled at the moment, but exciting programs and workshops are coming soon!
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Learn More About Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card
          key={event.id}
          className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-200 flex flex-col"
        >
          <CardHeader className="p-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />

              {/* Price Badge - Top Left */}
              <div className={`absolute left-3 top-3 inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-lg ${getPriceTagColor(event.price)}`}>
                <TagIcon className="mr-1.5 h-3 w-3" />
                {parseInt(event.price) === 0 ? 'Free' : `₹${event.price}`}
              </div>

              {/* Status Badge - Top Right */}
              <Badge className={`absolute right-3 top-3 shadow-lg border-0 font-semibold ${statusColor[event.status]}`}>
                {event.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col justify-between p-6 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {event.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="text-xs font-medium text-green-700 bg-green-50 border-green-200"
                >
                  {category}
                </Badge>
              ))}
              {event.categories.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs font-medium text-gray-600 bg-gray-50 border-gray-200"
                >
                  +{event.categories.length - 2}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
              {event.title}
            </h2>

            {/* Event Details */}
            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span>
                  {checkIfEventIsOneDay(event.startDate, event.endDate)
                    ? format(event.startDate, 'dd MMM yyyy')
                    : `${format(event.startDate, 'dd MMM yyyy')} - ${format(event.endDate, 'dd MMM yyyy')}`}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Link
              href={`/events/${event.slug}`}
              className="w-full inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              View Event
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
