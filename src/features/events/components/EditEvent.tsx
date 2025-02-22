'use client';

import { useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { EventForm } from './EventForm';
import { useForm } from 'react-hook-form';
import { EventDataType } from '../types/event';
import { updateEvent } from '../server/actions';
import { useAction } from 'next-safe-action/hooks';
import { createEventSchema } from '../schema/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { extensions } from '@/components/custom/editor/extensions';

export const EditEvent = ({ data }: { data: EventDataType }) => {
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
    extensions,
    content: data.description,
  });

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
    router.push('/admin/events');
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
      setCoverImagePreview={setCoverImagePreview}
    />
  );
};
