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

export type SingleBlogData = {
  slug: string;
  id: string;
  title: string;
  coverImage: string;
  categories: string[];
  isPaid: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
