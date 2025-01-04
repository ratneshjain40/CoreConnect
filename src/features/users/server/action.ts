import { authActionClient } from '@/lib/action-clients';
import { userService } from './service';

export const getAllUserData = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .action(async () => {
    return await userService.getAllUsersData();
  });
