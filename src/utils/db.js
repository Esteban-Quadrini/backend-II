
const mongoose = require('mongoose');
const logger = console;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI no definido en .env');
  await mongoose.connect(uri, { dbName: process.env.DB_NAME || 'ecommerce' });
  logger.info('MongoDB conectado');
};

module.exports = connectDB;
