const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', usersCtrl.createUser);
router.get('/', auth, usersCtrl.getAllUsers);
router.get('/:id', auth, usersCtrl.getUserById);
router.put('/:id', auth, usersCtrl.updateUser);
router.delete('/:id', auth, usersCtrl.deleteUser);

module.exports = router;