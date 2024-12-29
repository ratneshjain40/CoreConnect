'use client';

import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';
import { ImageUploadPopover } from './ImageUploadPopover';
import { transformGoogleDriveUrl } from '@/lib/gdrive';

export const TextEditor = ({ editor }: { editor: Editor | null }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

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
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.ColorPicker
              colors={[
                '#25262b',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
            />
            <RichTextEditor.UnsetColor />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <ImageUploadPopover
              {...{ imageUrl, setImageUrl, imageFile, setImageFile, isPopoverOpen, setIsPopoverOpen, addImage }}
            />
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
            <RichTextEditor.AlignJustify />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <div className="h-[calc(100vh-12rem)] overflow-y-scroll">
          <RichTextEditor.Content className="h-full" />
        </div>
      </RichTextEditor>
    </>
  );
};
