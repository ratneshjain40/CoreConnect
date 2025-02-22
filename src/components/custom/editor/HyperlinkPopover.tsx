import { useState } from 'react';

import { Link } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export const HyperlinkPopover = ({ editor }: { editor: Editor | null }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const addLink = () => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setIsPopoverOpen(false);
      setLinkUrl('');
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Link className="h-4 w-4" />
              <span className="sr-only">Insert link</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Insert link</TooltipContent>
      </Tooltip>

      <PopoverContent align="start" className="w-72">
        <div className="flex flex-col gap-2">
          <Input placeholder="Enter URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={addLink}
            className="w-full rounded-md bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
