import { useCallback, useState } from 'react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { useCurrentRole } from '@/hooks/use-current-role';

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
import { Icon } from '@/constants/icons';

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
  const router = useRouter();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const role = useCurrentRole();

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
    [form, setCoverImagePreview]
  );

  return (
    <div className="mb-20 w-full px-6">
      {/* Form Status Messages */}
      <div className="fixed right-4 top-4 z-50">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>

      <Form {...form}>
        <form
          id="eventForm"
          onSubmit={(e) => {
            e.preventDefault();
            form.setValue('description', editor?.getHTML() || '');
            form.handleSubmit(onSubmit)();
          }}
          className="flex w-full min-w-0 flex-col gap-6"
        >
          {/* Row 1: Title (left), Categories (right) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column: Title */}
            <div>
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
            </div>

            {/* Right Column: Categories */}
            <div className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-600">Categories</FormLabel>
              <Controller
                name="categories"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        maxSelect={3}
                        disabled={isPending}
                        options={eventCategories}
                        placeholder="Select categories..."
                        className={`rounded-md border-gray-300 text-gray-500 ${
                          fieldState.invalid ? 'border-red-500' : ''
                        }`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Row 2: Location (left), Dates (right) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Location */}
            <div className="space-y-4">
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
            </div>

            {/* Right Column: Dates */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
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
              </div>
              <div className="flex-1">
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
              </div>
            </div>
          </div>

          {/* Row 3: Price (left), Cover Image (right) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Price */}
            <div className="space-y-4">
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
            </div>

            {/* Cover Image */}
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
                        className={fieldState.error ? 'border-red-500 hover:border-red-600' : ''}
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
                      {fieldState.error && <span className="text-sm text-red-500">{fieldState.error.message}</span>}
                      {coverImagePreview && <span className="text-sm text-gray-600">✓ Image selected</span>}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Row 4: Description Editor */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Event Description</h2>
            <div className="min-w-0 overflow-hidden">
              <RichTextEditor editor={editor} error={form.formState.errors.description?.message || null} />
            </div>
          </div>
        </form>

        {/* Sticky Form Actions */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white py-4 shadow-lg">
          <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-4 px-6">
            <Button type="button" variant="ghost" onClick={handleResetEvent} className="flex items-center gap-2">
              <Icon name="reset" className="h-4 w-4" />
              Reset
            </Button>
            <Button type="submit" form="eventForm" className="px-6">
              {isEditing ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </div>
      </Form>

      {/* Image Preview Dialog */}
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="p-0 sm:max-w-[900px]">
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
    </div>
  );
};
