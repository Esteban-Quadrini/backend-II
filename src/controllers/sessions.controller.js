
const AuthService = require('../services/AuthService');
const UserDTO = require('../dtos/UserDTO');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.validateCredentials(email, password);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = AuthService.generateToken(user);
    res.json({ token, user: new UserDTO(user) });
  } catch (err) {
    next(err);
  }
};
