import React from 'react';

import { UserRole } from '@prisma/client';
import { RoleGate } from '@/lib/role-gate';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate allowedRole={UserRole.USER}>{children}</RoleGate>;
}
