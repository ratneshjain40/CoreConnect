'use client';

import React from 'react';
import { Icon } from '@/constants/icons';
import { RichTextEditor } from '@mantine/tiptap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

type ImageUploadPopoverProps = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (open: boolean) => void;
  addImage: () => void;
};

export const ImageUploadPopover: React.FC<ImageUploadPopoverProps> = ({
  imageUrl,
  setImageUrl,
  imageFile,
  setImageFile,
  isPopoverOpen,
  setIsPopoverOpen,
  addImage,
}) => {
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <RichTextEditor.Control
          title="Insert Image"
          aria-label="Insert Image"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="focus:outline-none"
        >
          <Icon name="image" className="mx-auto h-4 w-4" />
        </RichTextEditor.Control>
      </PopoverTrigger>

      <PopoverContent className="w-56 space-y-3 rounded-md border border-gray-200 bg-white p-2 shadow-md">
        <div className="flex flex-col space-y-2">
          <Input
            type="url"
            value={imageUrl}
            placeholder="Image URL"
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-md border p-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <div className="flex items-center">
            <span className="mx-2 text-xs text-gray-400">OR</span>
          </div>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <Button
            onClick={addImage}
            disabled={!imageUrl && !imageFile}
            className="w-full rounded-md bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Insert Image
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
