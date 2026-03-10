
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const { comparePassword } = require('../utils/hash');

class AuthService {
  static generateToken(user) {
    const payload = { id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
  }

  static async validateCredentials(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return null;
    const ok = await comparePassword(password, user.password);
    if (!ok) return null;
    return user;
  }
}

module.exports = AuthService;
