
const { app, connectDB } = require('./app');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando DB', err);
    process.exit(1);
  });
