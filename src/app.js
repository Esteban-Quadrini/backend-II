const express = require('express');
const cors = require('cors');
const passport = require('passport');

const usersRouter = require('./routes/users.router');
const sessionsRouter = require('./routes/sessions.router');

const app = express();

app.use(cors());
app.use(express.json());

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);
require('./config/jwt')(passport); // stub para mantener estructura

// Routers
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

// Health check
app.get('/', (req, res) => res.send('API running'));

module.exports = app;