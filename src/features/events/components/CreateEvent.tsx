'use client';

import { useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { EventForm } from './EventForm';
import { useForm } from 'react-hook-form';
import { createEvent } from '../server/actions';
import { useAction } from 'next-safe-action/hooks';
import { createEventSchema } from '../schema/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { extensions } from '@/components/custom/editor/extensions';

export const CreateEvent = () => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>('');
  const { execute, result, isPending, hasSucceeded } = useAction(createEvent);

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      coverImage: '',
      categories: [],
      description: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      price: '',
      status: 'UPCOMING',
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: '',
  });

  const handleResetEvent = () => {
    form.clearErrors();
    form.reset();
    editor?.commands.clearContent();
    setCoverImagePreview(null);
  };

  const onSubmit = (values: z.infer<typeof createEventSchema>) => {
    execute(values);
  };

  if (!isPending && hasSucceeded) {
    router.push('/admin/events');
  }

  const handleContainerClick = () => fileInputRef.current?.click();

  return (
    <EventForm
      form={form}
      editor={editor}
      isEditing={false}
      onSubmit={onSubmit}
      isPending={isPending}
      fileInputRef={fileInputRef}
      success={result?.data?.success}
      handleResetEvent={handleResetEvent}
      error={result.serverError?.toString()}
      coverImagePreview={coverImagePreview}
      handleContainerClick={handleContainerClick}
      setCoverImagePreview={setCoverImagePreview}
    />
  );
};
