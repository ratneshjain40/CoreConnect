'use client';

import { useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { BlogForm } from './BlogForm';
import { useForm } from 'react-hook-form';
import { blogSchema } from '../schema/blog';
import { updateBlog } from '../server/actions';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogDataWithContentType } from '../types/blog';
import { extensions } from '@/components/custom/editor/extensions';

type EditBlogProps = {
  data: BlogDataWithContentType;
};

export const EditBlog = ({ data }: EditBlogProps) => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(data.coverImage ?? '');
  const { execute, result, isPending, hasSucceeded } = useAction(updateBlog);

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: data,
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: data.content,
  });

  const handleResetBlog = () => {
    form.clearErrors();
    form.reset(data);

    editor?.commands.setContent(data.content);
    setCoverImagePreview(data.coverImage || null);
  };

  const onSubmit = (values: z.infer<typeof blogSchema>) => {
    execute({ ...values, id: data.id });
  };

  if (!isPending && hasSucceeded) {
    router.push('/admin/blogs');
  }

  const handleContainerClick = () => fileInputRef.current?.click();

  return (
    <BlogForm
      form={form}
      editor={editor}
      isEditing={true}
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
