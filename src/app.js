
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./utils/db');

const usersRouter = require('./routes/users.router');
const sessionsRouter = require('./routes/sessions.router');
const purchaseRouter = require('./routes/purchase.router');

const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.use((req, res, next) => {
  console.log(`[REQUEST] ${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/purchase', purchaseRouter);

app.get('/', (req, res) => res.send('API running'));

module.exports = { app, connectDB };
