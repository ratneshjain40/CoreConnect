import Link from 'next/link';

export const SlugLink = ({ value, slug, route }: { value: string; slug: string; route: string }) => (
  <Link target="_blank" href={`/${route}/${encodeURIComponent(slug.toLowerCase())}`}>
    <div className="cursor-pointer hover:underline">{value}</div>
  </Link>
);
