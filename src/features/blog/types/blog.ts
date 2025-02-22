import { Editor } from '@tiptap/react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export type BlogFormProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  onSubmit: (values: TFormValues) => void;
  handleResetBlog: () => void;
  setCoverImagePreview: (base64: string | null) => void;
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
  id: string;
  userId: string;
  title: string;
  slug: string;
  coverImage: string;
  categories: string[];
  author: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogDataWithContentType = {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  categories: string[];
  author: string;
  isPaid: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentDataType = {
  username: string;
  content: string;
  createdAt: Date;
};
