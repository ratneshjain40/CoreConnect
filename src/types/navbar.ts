export type NavbarOption = {
  name: string;
  url: string;
  description?: string;
};

export type NavbarProps = {
  name: string;
  url?: string;
  type: 'Link' | 'Dropdown' | 'Button';
  options?: NavbarOption[];
};
