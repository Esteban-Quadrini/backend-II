require('dotenv').config();
const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Fallo al conectar DB', err);
    process.exit(1);
  });