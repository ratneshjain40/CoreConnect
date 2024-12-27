'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  maxSelect?: number;
}

type Checked = DropdownMenuCheckboxItemProps['checked'];

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    { className, value = [], onChange, options, disabled = false, placeholder = 'Select options...', maxSelect },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);

    React.useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, [value, open]);

    const handleOptionChange = (optionValue: string, isChecked: boolean) => {
      if (disabled) return;

      if (isChecked) {
        if (!maxSelect || value.length < maxSelect) {
          onChange([...value, optionValue]);
        }
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    };

    const handleDropdownToggle = () => {
      if (disabled) return;
      setOpen((prev) => !prev);
    };

    return (
      <DropdownMenu open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DropdownMenuTrigger asChild>
          <div
            ref={triggerRef}
            className={cn(
              'flex h-auto w-full cursor-pointer flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            onClick={handleDropdownToggle}
          >
            {value.length > 0 ? (
              value.map((val: string) => {
                const option: Option | undefined = options.find((o: Option) => o.value === val);
                return (
                  <span key={val} className="rounded-full bg-black px-2 text-xs text-white">
                    {option?.label}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-w-full"
          style={{ width: triggerWidth || 'auto' }}
          onCloseAutoFocus={(event) => event.preventDefault()} // Prevent closing on option click
        >
          {options.map((option: Option) => {
            const isSelected: boolean = value.includes(option.value);
            const isMaxLimitReached: boolean = !!maxSelect && value.length >= maxSelect;

            return (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={isSelected}
                disabled={disabled || (!isSelected && isMaxLimitReached)}
                onCheckedChange={(isChecked: boolean) => handleOptionChange(option.value, isChecked)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
