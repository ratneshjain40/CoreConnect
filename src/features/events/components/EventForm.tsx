import { useCallback, useState } from 'react';
import NextImage from 'next/image';

import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { CreateEvent } from '../schema/event';
import { Button } from '@/components/ui/button';
import { EventFormProps } from '../types/event';
import { convertFileToBase64 } from '@/lib/base64';
import { eventCategories } from '@/constants/event';
import { DatePicker } from '@/components/ui/DatePicker';
import { MultiSelect } from '@/components/ui/multi-select';
import { FormError, FormSuccess } from '@/components/custom';
import { RichTextEditor } from '@/components/custom/editor';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const EventForm = ({
  form,
  onSubmit,
  handleResetEvent,
  coverImagePreview,
  handleContainerClick,
  fileInputRef,
  isPending,
  error,
  success,
  editor,
  isEditing,
  setCoverImagePreview,
}: EventFormProps<CreateEvent>) => {
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.setValue('description', editor?.getHTML() || '');
            form.handleSubmit(onSubmit)();
          }}
          className="flex w-full flex-col gap-6 min-w-0"
        >
          {/* Basic Event Information */}
          <div className="flex w-full flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={isPending}
                          placeholder="Event Title"
                          className={fieldState.invalid ? 'border-red-500' : ''}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={isPending}
                          placeholder="Location"
                          className={fieldState.invalid ? 'border-red-500' : ''}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">Price</FormLabel>
                      <FormControl>
                        <Input
                          min="0"
                          {...field}
                          type="number"
                          placeholder="Price"
                          disabled={isPending}
                          className={fieldState.invalid ? 'border-red-500' : ''}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Cover Image Section */}
                <div className="space-y-2">
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
                <h2 className="text-lg font-semibold text-gray-700">Date & Time</h2>
                <FormField
                  name="startDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          {...field}
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="endDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">End Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          {...field}
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date)}
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
                      <FormLabel className="text-sm font-medium text-gray-600">Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          {...field}
                          maxSelect={3}
                          disabled={isPending}
                          options={eventCategories}
                          placeholder="Select categories..."
                          className={`rounded-md border-gray-300 text-gray-500 ${fieldState.invalid ? 'border-red-500' : ''}`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description Editor */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Event Description</h2>
              <div className="min-w-0 overflow-hidden">
                <RichTextEditor editor={editor} error={form.formState.errors.description?.message || null} />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="button"
                onClick={handleResetEvent}
                variant="outline"
                className="px-6"
              >
                Reset
              </Button>
              <Button type="submit" className="px-6">
                {isEditing ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {/* Image Preview Dialog */}
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="sm:max-w-[900px] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Event Cover Image Preview</DialogTitle>
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
