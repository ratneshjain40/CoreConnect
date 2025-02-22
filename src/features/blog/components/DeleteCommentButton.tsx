'use client';

import React from 'react';
import { Icon } from '@/constants/icons';
import { Comment } from './Comments';
import { useAction } from 'next-safe-action/hooks';
import { deleteBlogComment, deleteBlogCommentAdmin } from '../server/actions';

export const DeleteCommentButton = ({ comment, role }: { comment: Comment; role: 'ADMIN' | 'USER' }) => {
  const { execute } = useAction(role === 'ADMIN' ? deleteBlogCommentAdmin : deleteBlogComment);

  const handleDelete = (id: string): void => {
    execute({ blogCommentId: id });
  };

  return (
    <>
      <button onClick={() => handleDelete(comment.id)} className="text-sm text-red-500 hover:underline">
        <Icon name="delete" className="h-5 w-5 cursor-pointer text-red-500" />
      </button>
    </>
  );
};
