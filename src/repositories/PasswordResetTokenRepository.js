
const TokenDAO = require('../daos/PasswordResetTokenDAO');

class PasswordResetTokenRepository {
  static async create(data) { return TokenDAO.create(data); }
  static async findByToken(token) { return TokenDAO.findByToken(token); }
  static async markUsed(id) { return TokenDAO.markUsed(id); }
  static async deleteExpired() { return TokenDAO.deleteExpired(); }
}

module.exports = PasswordResetTokenRepository;
