'use client';
import { useState } from 'react';

import { z } from 'zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import initials from 'initials';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { Textarea } from '@/components/ui/textarea';
import { createCommentSchema } from '../schema/blog';
import { createBlogComment } from '../server/actions';
import { DeleteCommentButton } from './DeleteCommentButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  userId: string;
};

export const Comments = ({
  role,
  userId,
  comments,
  blogSlug,
  isAuthenticated,
}: {
  userId: string | null;
  blogSlug: string;
  role: 'USER' | 'ADMIN';
  comments: Comment[];
  isAuthenticated: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { execute } = useAction(createBlogComment);

  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: '',
      blogSlug,
    },
  });

  const onSubmit = (values: z.infer<typeof createCommentSchema>) => {
    form.clearErrors();
    form.reset();
    execute(values);
  };

  const toggleComments = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-4 text-xl font-bold">Comments</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 mt-4">
          <FormField
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={4}
                    {...field}
                    placeholder="Add a comment..."
                    className={fieldState.invalid ? 'border-red-500' : 'w-full rounded border p-2'}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2" disabled={!isAuthenticated}>
            Post Comment
          </Button>
        </form>
      </Form>
      <div className="space-y-6">
        {comments.slice(0, showMore ? comments.length : 3).map((comment) => (
          <div key={comment.id} className="flex w-full space-x-4">
            <div className="flex flex-1 space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials(comment.author)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <h3 className="text-sm font-semibold">{comment.author}</h3>
                    <span className="text-xs text-gray-500">{format(comment.createdAt, 'dd MMM yyyy')}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
              </div>
            </div>
            <div>
              {(comment.userId === userId || role === 'ADMIN') && <DeleteCommentButton comment={comment} role={role} />}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        {comments.length > 3 && (
          <button
            onClick={toggleComments}
            className="mt-6 text-sm text-gray-500 transition-colors hover:text-primary hover:underline"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </section>
  );
};
