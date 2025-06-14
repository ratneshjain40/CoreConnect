import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  confirmButtonVariant?: 'secondary' | 'destructive' | 'link' | 'default' | 'outline' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmButtonLabel = 'Confirm',
  cancelButtonLabel = 'Cancel',
  onConfirm,
  onCancel,
  trigger,
  confirmButtonVariant = 'destructive',
  isLoading = false,
  loadingText,
  disabled = false,
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel} disabled={disabled || isLoading}>
            {cancelButtonLabel}
          </Button>
          <Button
            variant={confirmButtonVariant}
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={loadingText || `${confirmButtonLabel}...`}
            disabled={disabled || isLoading}
          >
            {confirmButtonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
