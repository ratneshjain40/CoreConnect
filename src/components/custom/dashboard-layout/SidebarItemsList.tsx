import { ICONS } from '@/constants/icons';

type NavItem = {
  title: string;
  url: string;
  icon?: keyof typeof ICONS;
};

type NavSection = {
  title: string;
  url: string;
  items: NavItem[];
};

type SidebarItems = NavSection[];

export const adminSidebarItemsList: SidebarItems = [
  {
    title: 'Overview',
    url: '#',
    items: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'hamburger',
      },
    ],
  },
  {
    title: 'Apps & Pages',
    url: '#',
    items: [
      {
        title: 'Blogs',
        url: '/admin/blogs',
        icon: 'blog',
      },
      {
        title: 'Courses',
        url: '/admin/courses',
        icon: 'course',
      },
      {
        title: 'Events',
        url: '/admin/events',
        icon: 'event',
      },
    ],
  },
  {
    title: 'User Settings',
    url: '#',
    items: [
      {
        title: 'Users',
        url: '/admin/users',
        icon: 'user',
      },
      {
        title: 'Settings',
        url: '/admin/settings',
        icon: 'settings',
      },
    ],
  },
  {
    title: 'Notifications',
    url: '#',
    items: [
      {
        title: 'Emails',
        url: '/admin/notifications/',
        icon: 'gmail',
      },
    ],
  },
];

export const userSidebarItemsList: SidebarItems = [
  {
    title: 'Overview',
    url: '#',
    items: [
      {
        title: 'Dashboard',
        url: '/user/dashboard',
        icon: 'hamburger',
      },
    ],
  },
  {
    title: 'Apps & Pages',
    url: '#',
    items: [
      {
        title: 'Blogs',
        url: '/user/blogs',
        icon: 'blog',
      },
      {
        title: 'Courses',
        url: '/user/courses',
        icon: 'course',
      },
      {
        title: 'Events',
        url: '/user/events',
        icon: 'event',
      },
    ],
  },
  {
    title: 'User Settings',
    url: '#',
    items: [
      {
        title: 'Settings',
        url: '/user/settings',
        icon: 'settings',
      },
    ],
  },
];
