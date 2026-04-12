import { prisma } from '../lib/prisma';

export const usersRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
    });
  },

  create(data: { email: string; password: string; name: string }) {
    return prisma.user.create({ data });
  },
};
