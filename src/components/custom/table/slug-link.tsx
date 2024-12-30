import Link from 'next/link';

export const SlugLink = ({ value, slug }: { value: string; slug: string }) => (
  <Link target="_blank" href={`/events/${encodeURIComponent(slug.toLowerCase())}`}>
    <div className="cursor-pointer hover:underline">{value}</div>
  </Link>
);
