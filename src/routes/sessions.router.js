
const express = require('express');
const router = express.Router();
const sessionsCtrl = require('../controllers/sessions.controller');

router.post('/login', sessionsCtrl.login);

module.exports = router;
