import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { BookOpen, CalendarIcon, LockIcon, UserIcon } from 'lucide-react';
import { BlogDataType } from '../types/blog';

type BlogListProps = {
  blogs: BlogDataType[];
};

export const BlogList = ({ blogs }: BlogListProps) => {
  // No blogs state
  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center space-y-6 max-w-md">
          {/* Icon */}
          <div className="inline-flex items-center justify-center rounded-xl bg-gray-100 p-4 shadow-lg">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">
              No Articles Found
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We haven't published any articles yet, but we're working hard to bring you valuable content about invertebrate zoology and research.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Explore Our Programs
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
      {blogs.map((blog) => (
        <Card
          key={blog.slug}
          className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-200 flex flex-col"
        >
          <CardHeader className="p-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                priority
                fill
                className="object-cover"
              />

              {/* Premium/Free Badge */}
              {blog.isPaid ? (
                <Badge className="absolute right-3 top-3 bg-yellow-500 text-yellow-900 shadow-lg border-0 font-semibold">
                  <LockIcon className="mr-1 h-3 w-3" />
                  Premium
                </Badge>
              ) : (
                <Badge className="absolute right-3 top-3 bg-green-500 text-white shadow-lg border-0 font-semibold">
                  Free
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col justify-between p-6 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {blog.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="text-xs font-medium text-green-700 bg-green-50 border-green-200"
                >
                  {category}
                </Badge>
              ))}
              {blog.categories.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs font-medium text-gray-600 bg-gray-50 border-gray-200"
                >
                  +{blog.categories.length - 2}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
              {blog.title}
            </h2>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{format(blog.updatedAt, 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Link
              href={`/blogs/${blog.slug}`}
              className="w-full inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Read Article
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
