'use client';

import { useCallback, useRef, useState, useTransition } from 'react';

import Link from '@tiptap/extension-link';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import Image from '@tiptap/extension-image';

import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

import { z } from 'zod';
import { BlogForm } from './BlogForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { convertFileToBase64 } from '@/lib/base64';
// import { editBlogAction, createBlogAction } from '@/actions/admin/blog';
import { BlogFormType, blogSchema } from '../schema/blog';

type CreateUpdateBlogProps = {
  data: BlogFormType | null;
};

export const CreateUpdateBlog = ({ data }: CreateUpdateBlogProps) => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(data?.coverImage ?? '');

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: data || {
      title: '',
      slug: '',
      coverImage: '',
      categories: [],
      isPaid: false,
      content: '',
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Link,
      Color,
      Underline,
      TextStyle,
      Highlight,
      StarterKit,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'w-[80%] max-w-full mx-auto rounded-sm',
        },
      }),
      CharacterCount,
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Placeholder.configure({ placeholder: 'Write something …' }),
    ],
    content: data ? data.content : '',
    onUpdate: ({ editor }) => {
      form.setValue('content', editor.getHTML());
    },
  });

  const handleResetBlog = useCallback(() => {
    form.clearErrors();

    if (data) {
      form.reset(data);
      editor?.commands.setContent(data.content || '');
      setCoverImagePreview(data.coverImage || null);
    } else {
      form.reset();
      editor?.commands.clearContent();
      setCoverImagePreview(null);
    }
  }, [data, form, editor]);

  const handleCoverImageChange = useCallback(
    async (file: File) => {
      try {
        const base64CoverImage = await convertFileToBase64(file);
        form.setValue('coverImage', base64CoverImage);
        setCoverImagePreview(base64CoverImage);
      } catch (error) {
        setError('Failed to process the image. Please retry.');
        console.error('Error converting file to Base64:', error);
      }
    },
    [form]
  );

  const commonAction = (info: { error?: string; success?: string }) => {
    if (!data) handleResetBlog();
    if (info?.error) setError(info.error);
    if (info?.success) setSuccess(info.success);
  };

  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      // try {
      //   const action = data ? editBlogAction(values, data.slug) : createBlogAction(values);
      //   const result = await action;
      //   commonAction(result);
      //   setTimeout(() => {
      //     router.push('/admin/blogs');
      //   }, 500);
      // } catch (error) {
      //   setError('Something went wrong!');
      // }
    });
  };

  const handleContainerClick = () => fileInputRef.current?.click();

  return (
    <BlogForm
      form={form}
      error={error}
      editor={editor}
      success={success}
      isEditing={!!data}
      onSubmit={onSubmit}
      isPending={isPending}
      fileInputRef={fileInputRef}
      handleResetBlog={handleResetBlog}
      coverImagePreview={coverImagePreview}
      handleContainerClick={handleContainerClick}
      handleCoverImageChange={handleCoverImageChange}
    />
  );
};
