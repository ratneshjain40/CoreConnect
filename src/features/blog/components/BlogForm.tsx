import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { ArrowLeft } from 'lucide-react';

import { FormError, FormSuccess } from '@/components/custom';
import { MultiSelect } from '@/components/ui/multi-select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomSwitch } from '@/components/custom/custom-switch';
import { Controller } from 'react-hook-form';
import { BlogFormType } from '../schema/blog';
import { BlogFormProps } from '../types/blog';
import { convertFileToBase64 } from '@/lib/base64';
import { RichTextEditor } from '@/components/custom/editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const router = useRouter();
  const [showImagePreview, setShowImagePreview] = useState(false);

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

  const handleBack = useCallback(() => {
    router.push('/admin/blogs');
  }, [router]);

  return (
    <>
      {/* Form Status Messages */}
      <div className="fixed top-4 right-4 z-50">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>

      <Form {...form}>
        <form
          id="blogForm"
          onSubmit={(e) => {
            e.preventDefault();
            form.setValue('content', editor?.getHTML() || '');
            form.handleSubmit(onSubmit)();
          }}
          className="flex w-full flex-col gap-6 min-w-0 pb-24"
        >
          {/* Basic Blog Information */}
          <div className="flex w-full flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-600">Blog Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              disabled={isPending}
                              placeholder="Enter a descriptive title..."
                              className={fieldState.invalid ? 'border-red-500' : ''}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPaid"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-2">
                            <FormLabel className="text-sm font-medium text-gray-600">Access Type</FormLabel>
                            <div className="flex items-center gap-3">
                              <FormControl>
                                <CustomSwitch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">
                                  {field.value ? 'Premium Content' : 'Free Content'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {field.value 
                                    ? 'This blog will only be accessible to paid subscribers'
                                    : 'This blog will be accessible to all users'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <FormLabel className="text-sm font-medium text-gray-600">Cover Image</FormLabel>
                  <Controller
                    name="coverImage"
                    control={form.control}
                    rules={{ required: 'Cover image is required.' }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleContainerClick}
                            className={`${fieldState.error ? 'border-red-500 hover:border-red-600' : ''}`}
                          >
                            Upload Image
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
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            disabled={!coverImagePreview}
                            onClick={() => setShowImagePreview(true)}
                          >
                            Preview
                          </Button>
                          {fieldState.error && (
                            <span className="text-sm text-red-500">{fieldState.error.message}</span>
                          )}
                          {coverImagePreview && (
                            <span className="text-sm text-gray-600">✓ Image selected</span>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
                <Controller
                  name="categories"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">Blog Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          {...field}
                          maxSelect={3}
                          disabled={isPending}
                          options={blogCategories}
                          placeholder="Select up to 3 categories..."
                          className={`rounded-md border-gray-300 text-gray-500 ${fieldState.invalid ? 'border-red-500' : ''}`}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">Choose up to 3 categories that best describe your blog content</p>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Blog Content Editor */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Blog Content</h2>
              <div className="min-w-0 overflow-hidden">
                <RichTextEditor editor={editor} error={form.formState.errors.content?.message || null} />
              </div>
            </div>
          </div>
        </form>

        {/* Form Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-4 shadow-lg">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button 
              type="submit"
              form="blogForm"
              className="px-6"
            >
              {isEditing ? 'Update Blog' : 'Create Blog'}
            </Button>
          </div>
        </div>
      </Form>

      {/* Image Preview Dialog */}
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="sm:max-w-[900px] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Blog Cover Image Preview</DialogTitle>
          </DialogHeader>
          {coverImagePreview && (
            <div className="relative aspect-video w-full">
              <NextImage
                fill
                src={coverImagePreview}
                alt="Cover Preview"
                className="object-contain"
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
