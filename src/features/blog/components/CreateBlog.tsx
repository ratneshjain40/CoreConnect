'use client';

import { useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { BlogForm } from './BlogForm';
import { useForm } from 'react-hook-form';
import { blogSchema } from '../schema/blog';
import { createBlog } from '../server/actions';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { extensions } from '@/components/custom/editor/extensions';

export const CreateBlog = () => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>('');
  const { execute, result, isPending, hasSucceeded } = useAction(createBlog);

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      coverImage: '',
      categories: [],
      isPaid: false,
      content: '',
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: '',
  });

  const handleResetBlog = () => {
    form.clearErrors();
    form.reset();

    editor?.commands.clearContent();
    setCoverImagePreview(null);
  };

  const onSubmit = (values: z.infer<typeof blogSchema>) => {
    execute(values);
  };

  if (!isPending && hasSucceeded) {
    router.push('/admin/blogs');
  }

  const handleContainerClick = () => fileInputRef.current?.click();

  return (
    <BlogForm
      form={form}
      editor={editor}
      isEditing={false}
      onSubmit={onSubmit}
      isPending={isPending}
      fileInputRef={fileInputRef}
      success={result?.data?.success}
      handleResetBlog={handleResetBlog}
      error={result.serverError?.toString()}
      coverImagePreview={coverImagePreview}
      handleContainerClick={handleContainerClick}
      setCoverImagePreview={setCoverImagePreview}
    />
  );
};
