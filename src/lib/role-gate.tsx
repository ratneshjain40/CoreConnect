import { UserRole } from '@prisma/client';
import { FormError } from '@/components/custom';
import { auth } from '@/features/auth/server/next-auth-config';

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
  fallbackComponent?: React.ReactNode;
};

export const RoleGate = async ({ children, allowedRole, fallbackComponent }: RoleGateProps) => {
  const session = await auth();
  const role = session?.user?.role;

  // If the role is Admin, they can access all routes.
  if (role === UserRole.ADMIN) {
    return <>{children}</>;
  }

  // If the role is not Admin, check if the current role matches the allowedRole
  if (role !== allowedRole) {
    return fallbackComponent ? (
      <>{fallbackComponent}</>
    ) : (
      <FormError message="You don't have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
