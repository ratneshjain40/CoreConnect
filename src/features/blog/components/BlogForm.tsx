import { useCallback } from 'react';
import { FormError, FormSuccess } from '@/components/custom';
import { MultiSelect } from '@/components/ui/multi-select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import NextImage from 'next/image';
import { Controller } from 'react-hook-form';
import { BlogFormType } from '../schema/blog';
import { BlogFormProps } from '../types/blog';
import { convertFileToBase64 } from '@/lib/base64';
import { RichTextEditor } from '@/components/custom/editor';

const blogCategories = [
  { label: 'Technology', value: 'Technology', checked: false },
  { label: 'Lifestyle', value: 'Lifestyle', checked: false },
  { label: 'Education', value: 'Education', checked: false },
  { label: 'Health', value: 'Health', checked: false },
  { label: 'Business', value: 'Business', checked: false },
];

export const BlogForm = ({
  form,
  onSubmit,
  handleResetBlog,
  coverImagePreview,
  handleContainerClick,
  fileInputRef,
  isPending,
  error,
  success,
  editor,
  isEditing,
  setCoverImagePreview,
}: BlogFormProps<BlogFormType>) => {
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.setValue('content', editor?.getHTML() || '');
            form.handleSubmit(onSubmit)();
          }}
          className="flex w-full flex-col gap-3 min-w-0"
        >
          <div className="flex w-full flex-col lg:flex-row gap-8 min-w-0">
            <div className="flex w-full lg:w-1/3 min-w-0 flex-col gap-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <Input
                        {...field}
                        type="text"
                        disabled={isPending}
                        placeholder="Blog Title"
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Controller
                name="categories"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <MultiSelect
                        {...field}
                        maxSelect={3}
                        disabled={isPending}
                        options={blogCategories}
                        placeholder="Select categories..."
                        className={fieldState.invalid ? 'border-red-500' : 'rounded-md border-gray-300 text-gray-500'}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Cover Image Section */}
              <Controller
                name="coverImage"
                control={form.control}
                rules={{ required: 'Cover image is required.' }}
                render={({ field, fieldState }) => (
                  <div
                    onClick={handleContainerClick}
                    className={`relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                      fieldState.error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleCoverImageChange(file);
                          form.setValue('coverImage', file.name);
                        }
                      }}
                    />
                    {coverImagePreview ? (
                      <NextImage
                        width={160}
                        height={160}
                        alt="Cover Preview"
                        src={coverImagePreview}
                        className="absolute inset-0 h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className={`text-sm ${fieldState.error ? 'text-red-500' : 'text-gray-500'}`}>
                        {fieldState.error?.message || 'Click to upload cover image'}
                      </span>
                    )}
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="isPaid"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 space-y-0 rounded-lg px-2 py-2">
                    <FormControl>
                      <Switch id="Is Paid" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel htmlFor="Is Paid" className="text-sm font-medium text-gray-600">
                      Is Paid
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Reset and Submit Buttons */}
              <div className="mt-4 flex w-full flex-col gap-2">
                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                  type="button"
                  onClick={handleResetBlog}
                  className="w-full rounded-md bg-red-200 p-2 font-semibold text-black hover:bg-red-100"
                >
                  Reset
                </Button>
                <Button type="submit" className="w-full rounded-md p-2 font-semibold text-white">
                  {isEditing ? 'Update Blog' : 'Create Blog'}
                </Button>
              </div>
            </div>

            {/* Text Editor */}
            <div className="w-full lg:w-2/3 min-w-0 overflow-hidden">
              <div className="max-w-full overflow-hidden">
                <RichTextEditor editor={editor} error={form.formState.errors.content?.message || null} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
