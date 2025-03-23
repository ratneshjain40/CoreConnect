import Image from 'next/image';

import { BlogDataType } from '../types/blog';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/custom/ButtonLink';
import { CalendarIcon, LockIcon, UserIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';

type BlogListProps = {
  blogs: BlogDataType[];
};

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="flex flex-wrap gap-8">
      {blogs.map((blog) => (
        <Card key={blog.slug} className="flex w-full max-w-sm flex-col overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image src={blog.coverImage} alt={blog.title} layout="fill" objectFit="cover" />
              {blog.isPaid ? (
                <Badge className="absolute right-2 top-2 bg-yellow-500" variant="secondary">
                  <LockIcon className="mr-1 h-3 w-3" />
                  Premium
                </Badge>
              ) : (
                <Badge className="absolute right-2 top-2 bg-green-500">Free</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-4 pb-0">
              {blog.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between p-4 pt-2">
            <h2 className="mb-2 line-clamp-2 text-xl font-semibold">{blog.title}</h2>
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {blog.author}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(blog.updatedAt, 'dd MMM yyyy')}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end p-4 pt-2">
            <ButtonLink name="Read more" url={`/blogs/${blog.slug}`} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
