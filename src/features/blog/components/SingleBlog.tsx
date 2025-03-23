import React from 'react';

import Image from 'next/image';
import { Comments } from './Comments';
import { currentUser } from '@/lib/auth';
import DOMPurify from 'isomorphic-dompurify';
import { Badge } from '@/components/ui/badge';
import { getAllBlogComments } from '../server/actions';
import { BlogDataWithContentType } from '../types/blog';
import { CalendarIcon, LockIcon, UserIcon } from 'lucide-react';
import { format } from 'date-fns';

type SingleBlogProps = {
  data: BlogDataWithContentType;
};

export const SingleBlog = async ({ data }: SingleBlogProps) => {
  const user = await currentUser();
  const comments = await getAllBlogComments({ slug: data.slug });

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Error Loading Blog Post</h1>
        <p>
          We&apos;re sorry, but we couldn&apos;t load the blog post data or probably it doesn&apos;t exist. <br />
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col items-start gap-4">
          {data.isPaid && (
            <Badge className="bg-yellow-500" variant="secondary">
              <LockIcon className="mr-1 h-3 w-3" />
              Premium Content
            </Badge>
          )}
          <h1 className="mb-4 text-4xl font-bold">{data.title}</h1>
        </div>
        <div className="mb-4 flex gap-2">
          {data.categories.map((category) => (
            <Badge key={crypto.randomUUID()} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span className="flex items-center justify-center rounded-full bg-secondary p-2">
              <UserIcon className="h-4 w-4" />
            </span>
            {data.author}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span className="flex items-center justify-center rounded-md bg-secondary p-2">
              <CalendarIcon className="h-4 w-4" />
            </span>
            {data.updatedAt
              ? `Updated ${format(data.updatedAt, 'dd MMM yyyy')}`
              : `Published ${format(data.createdAt, 'dd MMM yyyy')}`}
          </div>
        </div>
        {data.coverImage && (
          <Image
            width={1200}
            height={630}
            alt={data.title}
            src={data.coverImage}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
      </header>

      <div className="prose mb-12 max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} />
      <Comments
        blogSlug={data.slug}
        isAuthenticated={!!user}
        userId={user?.id ?? null}
        role={user?.role ?? 'USER'}
        comments={comments?.data ?? []}
      />
    </article>
  );
};
