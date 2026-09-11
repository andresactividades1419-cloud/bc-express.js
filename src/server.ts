import 'dotenv/config';
import { app } from './app.js';
import { connectDB } from './lib/mongoose.js';
import bcrypt from 'bcrypt';
import { User } from './models/user.model.js';
import { Event } from './models/event.model.js';

const PORT = Number(process.env.PORT ?? 3000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/bc-express-semana-08';

async function seedUsers(): Promise<{ userId: string; adminId: string } | null> {
  const count = await User.countDocuments();
  if (count > 0) {
    const existingUser = await User.findOne({ email: 'user@productora.com' });
    const existingAdmin = await User.findOne({ email: 'admin@productora.com' });
    if (existingUser && existingAdmin) {
      return { userId: existingUser._id.toString(), adminId: existingAdmin._id.toString() };
    }
    return null;
  }

  const password1 = await bcrypt.hash('User1234!', 12);
  const password2 = await bcrypt.hash('Admin1234!', 12);

  const [regularUser, adminUser] = await User.insertMany([
    { name: 'Productor Junior', email: 'user@productora.com', password: password1, role: 'user' },
    { name: 'Coordinador Principal', email: 'admin@productora.com', password: password2, role: 'admin' },
  ]);

  console.log('Seed usuarios: user@productora.com / User1234! | admin@productora.com / Admin1234!');
  return { userId: regularUser._id.toString(), adminId: adminUser._id.toString() };
}

async function seedEvents(creatorId: string): Promise<void> {
  const count = await Event.countDocuments();
  if (count > 0) return;

  await Event.insertMany([
    {
      name: 'Festival Neon Lights 2026',
      code: 'EVT-2026-201',
      category: 'festival',
      price: 340000000,
      capacity: 18000,
      active: true,
      location: 'Centro de Eventos Valle del Pacifico, Cali',
      date: new Date('2026-10-25T20:00:00.000Z'),
      createdBy: creatorId,
    },
    {
      name: 'Gala Anual Tech Summit',
      code: 'EVT-2026-202',
      category: 'conferencia',
      price: 128000000,
      capacity: 1500,
      active: true,
      location: 'Hotel Grand Hyatt, Bogota',
      date: new Date('2026-11-12T09:00:00.000Z'),
      createdBy: creatorId,
    },
  ]);

  console.log('Seed eventos: 2 producciones de ejemplo insertadas');
}

async function main(): Promise<void> {
  await connectDB(MONGODB_URI);
  const seeded = await seedUsers();
  if (seeded) {
    await seedEvents(seeded.adminId);
  }

  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/api/v1/health`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
