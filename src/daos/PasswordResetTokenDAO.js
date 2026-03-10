
const Token = require('../models/PasswordResetToken');

class PasswordResetTokenDAO {
  static async create(data) { return Token.create(data); }
  static async findByToken(token) { return Token.findOne({ token }); }
  static async markUsed(id) { return Token.findByIdAndUpdate(id, { used: true }, { new: true }); }
  static async deleteExpired() { return Token.deleteMany({ expiresAt: { $lt: new Date() } }); }
}

module.exports = PasswordResetTokenDAO;
