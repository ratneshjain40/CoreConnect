import React from 'react';

import { UserRole } from '@prisma/client';
import { RoleGate } from '@/lib/role-gate';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // return <RoleGate allowedRole={UserRole.ADMIN}>{children}</RoleGate>;
  return <>{children}</>;
}
