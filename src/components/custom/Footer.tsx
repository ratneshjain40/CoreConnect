import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/constants/icons';
import logo from '@/assets/entomon-logo.png';

export const FOOTER_LINKS = [
  { id: 1, href: '/about', label: 'About' },
  { id: 2, href: '/events', label: 'Events' },
  { id: 3, href: '/blogs', label: 'Resources' },
  { id: 4, href: '/contact', label: 'Contact' },
];

export const SOCIAL_LINKS = [
  { id: 1, href: 'mailto:entomoninstitute@gmail.com', icon: <Icon name="gmail" className="h-5 w-5" /> },
  {
    id: 2,
    href: 'https://www.linkedin.com/company/entomon-institute',
    icon: <Icon name="linkedin" className="h-5 w-5" />,
  },
  {
    id: 3,
    href: 'https://www.instagram.com/entomon_institute',
    icon: <Icon name="instagram" className="h-5 w-5" />,
  },
];

export const Footer = () => (
  <footer className="w-full bg-muted py-6 md:py-8 lg:py-10">
    <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
      <div className="flex items-center gap-4">
        <Image src={logo} height={47} width={47} alt="Entomon Logo" />
        <nav className="flex gap-4 sm:gap-6">
          {FOOTER_LINKS.map(({ id, href, label }) => (
            <Link
              key={id}
              href={href}
              prefetch={false}
              rel="noopener noreferrer"
              className="text-sm underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ id, href, icon }) => (
          <Link
            key={id}
            href={href}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            {icon}
          </Link>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        &copy; 2025 Entomon Institute of Invertebrates Zoology. All rights reserved.
      </p>
    </div>
  </footer>
);
