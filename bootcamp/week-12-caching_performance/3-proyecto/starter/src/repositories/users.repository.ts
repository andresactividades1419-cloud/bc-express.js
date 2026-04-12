import { prisma } from '../lib/prisma';

export const usersRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(data: { email: string; password: string; name: string }) {
    return prisma.user.create({ data });
  },

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};
