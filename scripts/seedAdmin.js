
require('dotenv').config();
const connectDB = require('../src/utils/db');
const UserRepository = require('../src/repositories/UserRepository');
const { hashPassword } = require('../src/utils/hash');

async function seed() {
  await connectDB();
  const email = 'admin@example.com';
  const existing = await UserRepository.findByEmail(email);
  if (existing) {
    console.log('Admin ya existe');
    process.exit(0);
  }
  const password = await hashPassword('AdminPass123');
  await UserRepository.create({ first_name: 'Admin', last_name: 'Seed', email, password, role: 'admin' });
  console.log('Admin creado:', email);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
