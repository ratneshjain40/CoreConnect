import { Editor } from '@tiptap/react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export type EventDataType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  coverImage: string;
  price: string;
  categories: string[];
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
};

export type EventFormProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  onSubmit: (values: TFormValues) => void;
  handleResetEvent: () => void;
  handleCoverImageChange: (file: File) => void;
  coverImagePreview: string | null;
  handleContainerClick: () => void;
  isPending: boolean;
  error?: string;
  success?: string;
  editor: Editor | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isEditing: boolean;
  isSubmitDisabled?: boolean;
};
