'use client';

import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { Toolbar } from './Toolbar';

export const RichTextEditor = ({ editor, error }: { editor: Editor | null; error: string | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border bg-white p-4 overflow-hidden">
      <div className="overflow-x-auto">
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className="min-h-[400px] max-h-[calc(100vh-20rem)] overflow-y-auto p-2" />

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <div>{error ? <span className="text-xs text-red-500">{error}</span> : <span>&nbsp;</span>}</div>
        <div>
          Characters: {editor.storage.characterCount.characters()}; Words: {editor.storage.characterCount.words()}
        </div>
      </div>
    </div>
  );
};
