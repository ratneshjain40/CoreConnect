import { CategoriesFilterList, PriceFilterList } from '@/features/blog/types/blog';

export const categoryFilterList = [
  { label: 'Technology', value: 'Technology', checked: true },
  { label: 'Lifestyle', value: 'Lifestyle', checked: false },
  { label: 'Education', value: 'Education', checked: false },
  { label: 'Health', value: 'Health', checked: false },
  { label: 'Business', value: 'Business', checked: false },
] as const satisfies Array<CategoriesFilterList>;

export const priceFilterList = [
  { label: 'Paid', value: 'paid', checked: true },
  { label: 'Free', value: 'free', checked: false },
] as const satisfies Array<PriceFilterList>;

export const statusFilterList = [
  { label: 'Upcoming', value: 'UPCOMING', checked: true },
  { label: 'Paused', value: 'PAUSED', checked: false },
  { label: 'Completed', value: 'COMPLETED', checked: false },
] as const satisfies Array<CategoriesFilterList>;
