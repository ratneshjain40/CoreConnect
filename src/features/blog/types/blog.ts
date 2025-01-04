import { Editor } from '@tiptap/react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export type BlogFormProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  onSubmit: (values: TFormValues) => void;
  handleResetBlog: () => void;
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

export type BlogDataType = {
  slug: string;
  title: string;
  coverImage: string;
  categories: string[];
  isPaid: boolean;
  author: string;
  updatedAt: Date;
};

export type BlogDataWithContentType = {
  title: string;
  slug: string;
  coverImage: string;
  categories: string[];
  author: string;
  isPaid: boolean;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};
