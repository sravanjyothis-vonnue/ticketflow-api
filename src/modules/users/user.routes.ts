import { Role } from '@prisma/client';
import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validation.middleware.js';
import { userController } from './user.controller.js';
import { userListQuerySchema } from './user.schemas.js';

export const userRoutes = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List users for assignment and administration
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list
 */
userRoutes.get(
  '/',
  requireAuth,
  requireRole([Role.ADMIN, Role.AGENT]),
  validate({ query: userListQuerySchema }),
  (req, res, next) => {
    userController.list(req, res).catch(next);
  }
);
