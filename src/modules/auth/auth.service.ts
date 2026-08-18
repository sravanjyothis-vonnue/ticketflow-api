import { Role, type User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../db/prisma.js';
import { ConflictError, UnauthorizedError } from '../../utils/errors.js';
import { signToken } from '../../utils/jwt.js';
import type { LoginInput, RegisterInput } from './auth.schemas.js';

function toSafeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  void passwordHash;
  return safeUser;
}

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (existingUser) {
      throw new ConflictError('EMAIL_ALREADY_EXISTS', 'Email already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        passwordHash,
        role: Role.USER
      }
    });

    return {
      user: toSafeUser(user),
      token: signToken({ userId: user.id, role: user.role })
    };
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return {
      user: toSafeUser(user),
      token: signToken({ userId: user.id, role: user.role })
    };
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId }
    });

    return toSafeUser(user);
  }
}
