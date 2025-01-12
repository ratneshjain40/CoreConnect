import { NavbarProps } from '@/types/navbar';

export const NAVBAR: NavbarProps[] = [
  {
    name: 'About',
    url: '/about',
    type: 'Link',
  },
  {
    name: 'Events',
    url: '/events',
    type: 'Link',
  },
  {
    name: 'Resources',
    url: '/resources',
    type: 'Dropdown',
    options: [
      { name: 'Blogs', url: '/blogs', description: 'Read our latest articles & insights.' },
      { name: 'Research Library', url: '/research-library', description: 'Read our extensive research library.' },
      { name: 'Courses', url: '/courses', description: 'Watch our educational videos & webinars.' },
    ],
  },
  {
    name: 'Contact',
    url: '/contact',
    type: 'Link',
  },
];
