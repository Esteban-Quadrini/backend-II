
const { body, validationResult } = require('express-validator');
const UserService = require('../services/UserService');
const PasswordResetService = require('../services/PasswordResetService');
const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dtos/UserDTO');

exports.validateCreate = [
  body('first_name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(new UserDTO(user));
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || err });
  }
};

exports.currentUser = async (req, res) => {
  // req.user proviene del middleware auth
  res.json(new UserDTO(req.user));
};

exports.requestPasswordReset = async (req, res) => {
  try {
    await PasswordResetService.requestReset(req.body.email);
    res.json({ ok: true });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || err });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await PasswordResetService.resetPassword(req.params.token, req.body.password);
    res.json({ ok: true });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || err });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users.map(u => new UserDTO(u)));
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const updated = await UserRepository.addToCart(req.user._id, productId, quantity || 1);
    res.json({ ok: true, cart: updated.cart });
  } catch (err) {
    res.status(400).json({ error: err.message || err });
  }
};
