import type { Role } from '@prisma/client';
import type { Request } from 'express';

export type AuthUser = {
  userId: string;
  role: Role;
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};
