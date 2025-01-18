'use client';

import React from 'react';
import { Icon } from '@/constants/icons';
import { Comment } from './Comments';
import { useAction } from 'next-safe-action/hooks';
import { deleteBlogComment } from '../server/actions';

export const DeleteCommentButton = ({ comment }: { comment: Comment }) => {
  const { execute } = useAction(deleteBlogComment);

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
