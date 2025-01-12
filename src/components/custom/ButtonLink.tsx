import { NavbarOption } from '@/types/navbar';
import Link from 'next/link';

export const ButtonLink = ({ name, url }: NavbarOption) => (
  <Link
    key={name}
    prefetch={false}
    href={url ?? ''}
    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  >
    {name}
  </Link>
);
