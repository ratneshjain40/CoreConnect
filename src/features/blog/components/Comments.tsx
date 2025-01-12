'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { commentSchema } from '../schema/blog';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

type Comment = {
  id: number;
  author: string;
  image: string;
  content: string;
  date: string;
};

const initialComments: Comment[] = [
  {
    id: 1,
    author: 'Alice Johnson',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=Alice Johnson',
    content: 'Great article! I especially liked the part about PWAs.',
    date: 'June 2, 2023',
  },
  {
    id: 2,
    author: 'Bob Smith',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob Smith',
    content: "I'm excited to see how AI will transform web development in the coming years.",
    date: 'June 3, 2023',
  },
  {
    id: 3,
    author: 'Bob Smith',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob Smith',
    content: "I'm excited to see how AI will transform web development in the coming years.",
    date: 'June 3, 2023',
  },
  {
    id: 23,
    author: 'Bob Smith',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob Smith',
    content: "I'm excited to see how AI will transform web development in the coming years.",
    date: 'June 3, 2023',
  },
  {
    id: 21,
    author: 'Bob Smith',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob Smith',
    content: "I'm excited to see how AI will transform web development in the coming years.",
    date: 'June 3, 2023',
  },
];

export const Comments = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [showMore, setShowMore] = useState(false);
  //   const { execute, result, isPending, hasSucceeded, hasErrored } = useAction();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      author: '',
      image: '',
      content: '',
      date: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    //   execute(values);
  };

  const toggleComments = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-4 text-xl font-bold">Comments</h2>

      <div className="space-y-6">
        {initialComments.slice(0, showMore ? initialComments.length : 3).map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.image} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{comment.author}</h3>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>

              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        {initialComments.length > 3 && (
          <button onClick={toggleComments} className="text-xs text-blue-500 hover:underline">
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
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
    </section>
  );
};
