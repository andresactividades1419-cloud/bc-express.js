import bcrypt from 'bcrypt';

// Store en memoria para simplificar el ejercicio (sin base de datos)
// En producción se usaría Prisma o Mongoose

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const users = new Map<string, StoredUser>();

export const usersStore = {
  async create(data: { email: string; password: string; name: string }): Promise<StoredUser> {
    const id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user: StoredUser = {
      id,
      email: data.email.toLowerCase(),
      passwordHash,
      name: data.name,
      role: 'user',
      createdAt: new Date(),
    };
    users.set(data.email.toLowerCase(), user);
    return user;
  },

  findByEmail(email: string): StoredUser | undefined {
    return users.get(email.toLowerCase());
  },

  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  },
};
