'use client';

import { useAction } from 'next-safe-action/hooks';
import { logout } from '../server/action';

type LoginButtonProps = {
  children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const { execute } = useAction(logout);

  const onClicked = () => {
    execute();
  };

  return (
    <div onClick={onClicked} className="w-full cursor-pointer">
      {children}
    </div>
  );
};
