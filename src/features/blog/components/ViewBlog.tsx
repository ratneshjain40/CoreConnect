import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { BlogFormType } from '../schema/blog';

type ViewBlogProps = {
  data: BlogFormType | null;
};

export const ViewBlog = ({ data }: ViewBlogProps) => {
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

  const { title, coverImage, categories, isPaid, content, updatedAt } = data;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative h-80 w-full bg-gray-800">
        {coverImage && (
          <Image
            fill
            alt={title}
            src={coverImage}
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 opacity-70"
          />
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-center text-4xl font-bold">{title}</h1>
          {isPaid && (
            <span className="mt-4 rounded-md bg-red-500 px-4 py-1 text-sm font-medium text-white shadow">
              Paid Content
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto -mt-10 max-w-4xl rounded-lg bg-white px-6 py-10 shadow-md">
        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <span key={index} className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white">
              {category}
            </span>
          ))}
        </div>

        <article className="prose max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:underline">
          <div className="text-gray-800">
            <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
          </div>
        </article>

        <div className="mt-10 flex flex-col space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            <strong>Author:</strong> Entomon Institute
          </p>
          <p>
            <strong>Last Updated:</strong> {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </main>
    </div>
  );
};
