const UserDAO = require('../daos/UserDAO');

class UserRepository {
  static async create(user) { return UserDAO.create(user); }
  static async findByEmail(email) { return UserDAO.findByEmail(email); }
  static async findById(id) { return UserDAO.findById(id); }
  static async updateById(id, update) { return UserDAO.updateById(id, update); }
  static async addToCart(userId, productId, quantity) { return UserDAO.addToCart(userId, productId, quantity); }
  static async clearCart(userId) { return UserDAO.clearCart(userId); }
  static async findAll() { return UserDAO.findAll(); }
}

module.exports = UserRepository;


