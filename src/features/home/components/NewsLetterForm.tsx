'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewsLetterForm = () => {
  return (
    <form className="mx-auto flex max-w-md gap-2">
      <Input type="email" placeholder="Enter your email" className="flex-1 text-white" />
      <Button type="submit" variant="secondary">
        Subscribe
      </Button>
    </form>
  );
};
