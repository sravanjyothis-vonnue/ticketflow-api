import { z } from 'zod';

export const userListQuerySchema = z.object({
  role: z.enum(['ADMIN', 'AGENT', 'USER']).optional()
});
