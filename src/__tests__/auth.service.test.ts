import bcrypt from 'bcrypt';
import * as usersRepo from '../repositories/users.repository.js';
import * as authService from '../services/auth.service.js';

jest.mock('../repositories/users.repository.js');
jest.mock('bcrypt');

const mockedRepo = usersRepo as jest.Mocked<typeof usersRepo>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('auth.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('creates a new user with a hashed password when the email is free', async () => {
      mockedRepo.findUserByEmail.mockResolvedValue(null);
      (mockedBcrypt.hash as unknown as jest.Mock).mockResolvedValue('hashed-password');
      mockedRepo.createUser.mockResolvedValue({
        _id: 'user-1',
        name: 'Andres Fernandez',
        email: 'andres@example.com',
        password: 'hashed-password',
        role: 'user',
      } as never);

      const result = await authService.register({
        name: 'Andres Fernandez',
        email: 'andres@example.com',
        password: 'Secret123',
      });

      expect(mockedBcrypt.hash).toHaveBeenCalledWith('Secret123', 12);
      expect(result).not.toHaveProperty('password');
      expect(result).toMatchObject({ email: 'andres@example.com' });
    });

    it('throws AppError 409 when the email is already registered', async () => {
      mockedRepo.findUserByEmail.mockResolvedValue({
        _id: 'user-1',
        email: 'andres@example.com',
      } as never);

      await expect(
        authService.register({
          name: 'Andres Fernandez',
          email: 'andres@example.com',
          password: 'Secret123',
        }),
      ).rejects.toMatchObject({ statusCode: 409 });
      expect(mockedRepo.createUser).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('returns an access token for valid credentials', async () => {
      mockedRepo.findUserByEmail.mockResolvedValue({
        _id: 'user-1',
        email: 'andres@example.com',
        password: 'hashed-password',
        role: 'user',
      } as never);
      (mockedBcrypt.compare as unknown as jest.Mock).mockResolvedValue(true);

      const result = await authService.login({
        email: 'andres@example.com',
        password: 'Secret123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(typeof result.accessToken).toBe('string');
    });

    it('throws AppError 401 when the user does not exist', async () => {
      mockedRepo.findUserByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'ghost@example.com', password: 'x' }),
      ).rejects.toMatchObject({ statusCode: 401 });
    });

    it('throws AppError 401 when the password does not match', async () => {
      mockedRepo.findUserByEmail.mockResolvedValue({
        _id: 'user-1',
        email: 'andres@example.com',
        password: 'hashed-password',
        role: 'user',
      } as never);
      (mockedBcrypt.compare as unknown as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login({ email: 'andres@example.com', password: 'wrong' }),
      ).rejects.toMatchObject({ statusCode: 401 });
    });
  });

  describe('getMe', () => {
    it('returns the user without the password field', async () => {
      mockedRepo.findUserById.mockResolvedValue({
        _id: 'user-1',
        name: 'Andres Fernandez',
        email: 'andres@example.com',
        password: 'hashed-password',
        role: 'user',
      } as never);

      const result = await authService.getMe('user-1');

      expect(result).not.toHaveProperty('password');
      expect(result).toMatchObject({ email: 'andres@example.com' });
    });

    it('throws AppError 404 when the user does not exist', async () => {
      mockedRepo.findUserById.mockResolvedValue(null);

      await expect(authService.getMe('missing')).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});
