import { MultiSelect } from '@/components/ui/multi-select';
import { FormError, FormSuccess } from '@/components/custom';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import NextImage from 'next/image';
import { Controller } from 'react-hook-form';
import { BlogFormProps } from '../types/blog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogFormType } from '../schema/blog';
import { TextEditor } from '@/components/custom/editor';
import { Switch } from '@/components/ui/switch';

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
  handleCoverImageChange,
  coverImagePreview,
  handleContainerClick,
  fileInputRef,
  isPending,
  error,
  success,
  editor,
  isEditing,
}: BlogFormProps<BlogFormType>) => {
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.setValue('content', editor?.getHTML() || '');
            form.handleSubmit(onSubmit)();
          }}
          className="flex h-screen w-full flex-col items-center gap-3 overflow-hidden"
        >
          <div className="flex w-full gap-8">
            <div className="flex w-1/4 flex-col gap-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <Input {...field} type="text" disabled={isPending} placeholder="Blog Title" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <Input
                        {...field}
                        type="text"
                        disabled={isPending}
                        placeholder="Slug"
                        onChange={(e) => {
                          field.onChange(e.target.value.replace(/\s+/g, '-').toLowerCase());
                        }}
                        onBlur={(e) => {
                          form.setValue('slug', e.target.value.trim().replace(/^-+|-+$/g, ''));
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Controller
                name="categories"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <MultiSelect
                        {...field}
                        maxSelect={3}
                        disabled={isPending}
                        options={blogCategories}
                        placeholder="Select categories..."
                        className="rounded-md border-gray-300 text-gray-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Cover Image Section */}
              <div
                onClick={handleContainerClick}
                className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                <Controller
                  name="coverImage"
                  control={form.control}
                  render={() => (
                    <>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleCoverImageChange(file);
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
                        <span className="text-gray-500">Click to upload cover image</span>
                      )}
                    </>
                  )}
                />
              </div>

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
            <div className="w-3/4">
              <TextEditor editor={editor} />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
