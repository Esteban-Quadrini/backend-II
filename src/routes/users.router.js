
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');

router.post('/', usersCtrl.validateCreate, usersCtrl.createUser);
router.post('/reset-request', usersCtrl.requestPasswordReset);
router.post('/reset/:token', usersCtrl.resetPassword);

router.get('/', auth, authorize(['admin']), usersCtrl.getAllUsers);
router.get('/current', auth, usersCtrl.currentUser);
router.post('/cart', auth, authorize(['user','premium','admin']), usersCtrl.addToCart);

module.exports = router;
