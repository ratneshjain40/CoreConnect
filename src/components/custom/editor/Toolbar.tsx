'use client';
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';

import {
  Bold,
  Italic,
  Underline,
  X,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Minus,
  Plus,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Undo,
  Redo,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { transformGoogleDriveUrl } from '@/lib/gdrive';
import { ImageUploadPopover } from './ImageUploadPopover';
import { HyperlinkPopover } from './HyperlinkPopover';

const headings = [
  { name: 'Heading 1', icon: Heading1, level: 1 },
  { name: 'Heading 2', icon: Heading2, level: 2 },
  { name: 'Heading 3', icon: Heading3, level: 3 },
  { name: 'Heading 4', icon: Heading4, level: 4 },
  { name: 'Heading 5', icon: Heading5, level: 5 },
  { name: 'Heading 6', icon: Heading6, level: 6 },
];

const alignmentOptions = [
  { name: 'Align left', icon: AlignLeft, alignment: 'left' },
  { name: 'Align center', icon: AlignCenter, alignment: 'center' },
  { name: 'Align right', icon: AlignRight, alignment: 'right' },
  { name: 'Justify', icon: AlignJustify, alignment: 'justify' },
];

const formattingOptions: { name: string; icon: any; command: 'toggleBold' | 'toggleItalic' | 'toggleUnderline' }[] = [
  { name: 'Bold', icon: Bold, command: 'toggleBold' },
  { name: 'Italic', icon: Italic, command: 'toggleItalic' },
  { name: 'Underline', icon: Underline, command: 'toggleUnderline' },
];

const editingOptions: { name: string; icon: any; command: 'undo' | 'redo' }[] = [
  { name: 'Undo', icon: Undo, command: 'undo' },
  { name: 'Redo', icon: Redo, command: 'redo' },
];

const colorPalette = [
  '#000000',
  '#7F7F7F',
  '#880015',
  '#ED1C24',
  '#FF7F27',
  '#FFF200',
  '#22B14C',
  '#00A2E8',
  '#3F48CC',
  '#A349A4',
  '#FFFFFF',
  '#C3C3C3',
  '#B97A57',
  '#FFAEC9',
  '#FFC90E',
  '#EFE4B0',
  '#B5E61D',
  '#99D9EA',
  '#7092BE',
  '#C8BFE7',
  '#E6E6E6',
  '#A1A1A1',
  '#B45F06',
  '#E06055',
  '#F4A900',
  '#D7D7D7',
  '#A7D88F',
  '#7DB0DD',
  '#6A7FB3',
  '#A67EB7',
];

const TooltippedButton = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClick} type="button">
        <Icon className="h-4 w-4" />
        <span className="sr-only">{label}</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);

export const Toolbar = ({ editor }: { editor: Editor }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    const newSize = fontSize + 1;
    setFontSize(newSize);
    editor?.chain().focus().setFontSize(`${newSize}`).run();
  };

  const decreaseFontSize = () => {
    if (fontSize > 1) {
      const newSize = fontSize - 1;
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(`${newSize}`).run();
    }
  };

  const addImage = () => {
    if (imageUrl) {
      let src;
      try {
        const parsedUrl = new URL(imageUrl);
        if (parsedUrl.host === 'drive.google.com') {
          src = transformGoogleDriveUrl(imageUrl);
        } else {
          src = imageUrl;
        }
      } catch (e) {
        src = imageUrl;
      }

      if (src) editor?.chain().focus().setImage({ src }).run();
      setIsPopoverOpen(false);
      setImageUrl('');
    } else if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        editor
          ?.chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
        setIsPopoverOpen(false);
        setImageFile(null);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
        {/* Headings Dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                  <span>H</span>
                  <span className="sr-only">Headings</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Headings</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="start">
            {headings.map(({ name, icon: Icon, level }) => (
              <DropdownMenuItem
                key={name}
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: level as any })
                    .run()
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Font Size Adjustments */}
        <div className="flex items-center gap-1">
          <TooltippedButton icon={Minus} label="Decrease font size" onClick={decreaseFontSize} />
          <div className="w-8 text-center text-sm">{fontSize}</div>
          <TooltippedButton icon={Plus} label="Increase font size" onClick={increaseFontSize} />
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Formatting Options */}
        <div className="flex items-center gap-0.5">
          {formattingOptions.map(({ name, icon, command }) => (
            <TooltippedButton
              key={name}
              icon={icon}
              label={name}
              onClick={() => editor?.chain().focus()[command]().run()}
            />
          ))}

          {/* Text Color */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    type="button"
                    variant="ghost"
                    className="relative h-8 w-8"
                    style={{ color: '#000000' }}
                  >
                    <span className="text-lg">A</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Text color</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" className="grid grid-cols-5 gap-1 p-1">
              {colorPalette.map((color) => (
                <DropdownMenuItem
                  key={color}
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => editor?.chain().focus().setColor(color).run()}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Highlight (Fixed Yellow Color) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                type="button"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => {
                  const isHighlighted = editor?.isActive('highlight');
                  if (isHighlighted) {
                    editor?.chain().focus().unsetHighlight().run();
                  } else {
                    editor?.chain().focus().setHighlight({ color: 'yellow' }).run();
                  }
                }}
              >
                <Highlighter className="h-4 w-4" />
                <span className="sr-only">Highlight</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Highlight</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Insert Options */}
        <div className="flex items-center gap-0.5">
          <HyperlinkPopover editor={editor} />
          <TooltippedButton icon={X} label="Remove link" onClick={() => editor?.chain().focus().unsetLink().run()} />
          <ImageUploadPopover
            imageUrl={imageUrl}
            addImage={addImage}
            imageFile={imageFile}
            setImageUrl={setImageUrl}
            setImageFile={setImageFile}
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
          />
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Alignment Options */}
        <div className="flex items-center gap-0.5">
          {alignmentOptions.map(({ name, icon, alignment }) => (
            <TooltippedButton
              key={name}
              icon={icon}
              label={name}
              onClick={() => editor?.chain().focus().setTextAlign(alignment).run()}
            />
          ))}
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* List Options */}
        <div className="flex items-center gap-0.5">
          <TooltippedButton
            icon={List}
            label="Bullet list"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          />
          <TooltippedButton
            icon={ListOrdered}
            label="Numbered list"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          />
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Undo, Redo & Clear Formatting */}
        <div className="flex items-center gap-0.5">
          {editingOptions.map(({ name, icon, command }) => (
            <TooltippedButton
              key={name}
              icon={icon}
              label={name}
              onClick={() => editor?.chain().focus()[command]().run()}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
