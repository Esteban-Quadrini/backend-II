
require('dotenv').config();
const connectDB = require('../src/utils/db');
const ProductRepository = require('../src/repositories/ProductRepository');

async function seed() {
  await connectDB();
  const products = [
    { title: 'Producto A', description: 'Prueba A', price: 100, stock: 10 },
    { title: 'Producto B', description: 'Prueba B', price: 200, stock: 5 }
  ];
  for (const p of products) {
    await ProductRepository.create(p);
    console.log('Producto creado:', p.title);
  }
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
