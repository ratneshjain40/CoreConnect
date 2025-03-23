import { NavigationMenuLink } from '../ui/navigation-menu';
import React from 'react';

export const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a ref={ref} className={className} {...props}>
            <div className="text-sm font-medium leading-none group-hover:underline">{title}</div>
            {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>}
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
