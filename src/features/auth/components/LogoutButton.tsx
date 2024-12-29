'use client';

// import { logoutAction } from '@/actions/auth';

type LoginButtonProps = {
  children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LoginButtonProps) => {
  const onClicked = async () => {
    // await logoutAction();
  };

  return (
    <div onClick={onClicked} className="w-full cursor-pointer">
      {children}
    </div>
  );
};
