'use client';

import { useCallback, useRef, useState } from 'react';

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
import { EventForm } from './EventForm';
import { useForm } from 'react-hook-form';
import { updateEvent } from '../server/actions';
import { convertFileToBase64 } from '@/lib/base64';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEventSchema, UpdateEvent } from '../schema/event';

export const EditEvent = ({ data }: { data: UpdateEvent }) => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(data.coverImage ?? '');
  const { execute, result, isPending, hasSucceeded } = useAction(updateEvent);

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: data,
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
    content: data.description,
  });

  const handleCoverImageChange = useCallback(
    async (file: File) => {
      try {
        const base64CoverImage = await convertFileToBase64(file);
        form.setValue('coverImage', base64CoverImage);
        setCoverImagePreview(base64CoverImage);
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    },
    [form]
  );

  const handleResetEvent = () => {
    form.clearErrors();

    form.reset(data);
    editor?.commands.setContent(data.description);
    setCoverImagePreview(data.coverImage || null);
  };

  const onSubmit = (values: z.infer<typeof createEventSchema>) => {
    execute({ ...values, id: data.id });
  };

  if (!isPending && hasSucceeded) {
    setTimeout(() => {
      router.push('/admin/events');
    }, 500);
  }

  const handleContainerClick = () => fileInputRef.current?.click();

  return (
    <EventForm
      form={form}
      editor={editor}
      isEditing={true}
      onSubmit={onSubmit}
      isPending={isPending}
      fileInputRef={fileInputRef}
      success={result?.data?.success}
      handleResetEvent={handleResetEvent}
      error={result.serverError?.toString()}
      coverImagePreview={coverImagePreview}
      handleContainerClick={handleContainerClick}
      handleCoverImageChange={handleCoverImageChange}
    />
  );
};
