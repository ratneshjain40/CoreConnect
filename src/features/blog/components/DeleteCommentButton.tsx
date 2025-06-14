'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { deleteBlogComment, deleteBlogCommentAdmin } from '../server/actions';
import { Comment } from './Comments';

interface DeleteButtonProps {
  comment: Comment;
  role: 'ADMIN' | 'USER';
  onDelete?: (id: string) => void; 
}

export const DeleteCommentButton: React.FC<DeleteButtonProps> = ({ comment, role, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const { execute } = useAction(
    role === 'ADMIN' ? deleteBlogCommentAdmin : deleteBlogComment
  );

  const handleDelete = (id: string): void => {
    onDelete?.(id);
    setDeleteDialogOpen(false);
    execute({ blogCommentId: id });
  };

  return (
    <>
      {deleteDialogOpen && (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Comment?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this comment? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-8 grid gap-3 xs:flex xs:flex-row xs:justify-end">
              <DialogClose asChild>
                <Button onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <HiOutlineDotsVertical className="text-lg" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>More Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <button
                className="flex w-full items-center justify-start gap-3"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <FaTrashCan className="text-base" />
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
